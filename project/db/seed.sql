-- seed.sql
INSERT INTO users (name, phone, role)
VALUES ('Rajesh Farmer', '+91XXXXXXXXXX', 'farmer');

INSERT INTO green_actions (user_id, type, image_url, verified)
VALUES ('<some-user-id>', 'tree', 'https://imageurl.com/tree1.jpg', true);
