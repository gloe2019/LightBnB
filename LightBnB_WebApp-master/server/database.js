const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "vagrant",
  password: "123",
  host: "localhost",
  database: "lightbnb",
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  const queryString = `SELECT * FROM users WHERE email=$1`;
  const values = [email];
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log("query error", err.stack);
    });
};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  const queryString = `SELECT * FROM users WHERE id=$1`;
  const values = [id];
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log("query error", err.stack);
    });
  // return Promise.resolve(users[id]);
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  const queryString = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING  *`;
  const values = [user.name, user.email, user.password];
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("query error", err.stack);
    });
};
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  const queryString = `SELECT reservations.*, properties.* FROM reservations 
  JOIN properties ON property_id=properties.id WHERE guest_id=$1 LIMIT $2`;
  const values = [guest_id, limit];
  return pool.query(queryString, values).then((result) => {
    //console.log(result.rows);
    return result.rows;
  });
  // return getAllProperties(null, 2);
};
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  if (options["owner_id"]) {
    queryParams.push(`${options["owner_id"]}`);
    queryString += `WHERE owner_id = $${queryParams.length}`;
  }
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE INITCAP($${queryParams.length}) `;
  }

  if (options["minimum_price_per_night"]) {
    queryParams.push(`${options["minimum_price_per_night"]}`);
    if (options["maximum_price_per_night"]) {
      queryParams.push(`${options["maximum_price_per_night"]}`);
      //Write query that returns results in range of min and max
      queryString += `AND cost_per_night BETWEEN ($${
        queryParams.length - 1
      } * 100) AND ($${queryParams.length}*100)`;
    } else {
      //write query returning results >= min...
      queryString += `AND cost_per_night >= $${queryParams.length}*100`;
    }
  } else if (options["maximum_price_per_night"]) {
    queryParams.push(`${options["maximum_price_per_night"]}`);
    //write query that returns results <= max
    queryString += `AND cost_per_night <= $${queryParams.length} * 100`;
  }

  if (options["minimum_rating"]) {
    queryParams.push(`${options["minimum_rating"]}`);
    queryString += `
    GROUP BY properties.id
    HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
    queryParams.push(limit);
    queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};`;
  } else {
    // 4
    queryParams.push(limit);
    queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};
    `;
  }

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams).then((res) => res.rows);
};

exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  const queryString = `INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night,street, city, province, post_code, country, parking_spaces, number_of_bathrooms, number_of_bedrooms) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING  *`;
  const values = [
    property["owner_id"],
    property["title"],
    property["description"],
    property["thumbnail_photo_url"],
    property["cover_photo_url"],
    property["cost_per_night"],
    property["street"],
    property["city"],
    property["province"],
    property["post_code"],
    property["country"],
    property["parking_spaces"],
    property["number_of_bathrooms"],
    property["number_of_bedrooms"],
  ];
  return pool
    .query(queryString, values)
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log("query error", err.stack);
    });

  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
};
exports.addProperty = addProperty;
