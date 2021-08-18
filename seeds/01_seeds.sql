INSERT INTO users (name, email, password) VALUES 
('Egg Eggerson', 'egg@egghead.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Benjamin Robinson', 'bennyson12@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Emilia Poirier', 'betmelia@doodoo.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active) VALUES
(1, 'Speed lamp', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 950, 4, 2, 3, 'Canada', '536 Namsub Highway', 'Sotboske', 'Quebec', '28142', true),
(2, 'Gurt place', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 1500, 6, 4, 8, 'Canada', '1650 Heijo Circle', 'Genwezuj', 'Nova Scotia', '29045', true),
(3, 'Port cambrage', 'description', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg?auto=compress&cs=tinysrgb&h=350', 'https://images.pexels.com/photos/2086676/pexels-photo-2086676.jpeg', 2350, 8, 6, 9, 'Canada', '834 Buwmi Road', 'Bohbatev', 'Ontario', '58224', true);

INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES
('2018-09-11', '2018-09-26', 2, 3),
('2019-01-04', '2019-02-01', 3, 2),
('2020-02-23', '2020-03-15', 1, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES
(2, 1, 2, 3, 'messages'),
(1, 3, 3, 4, 'messages'),
(3, 2, 1, 5, 'messages');

