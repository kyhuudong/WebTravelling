
/* roles table */
INSERT INTO roles (role_id, role_name) VALUES ('1','admin');
INSERT INTO roles (role_id, role_name) VALUES ('2','user');

/* roles users */
INSERT INTO users (username, password, email, full_name, role_id)
VALUES (
    'dong', '123', 'kyhuudong@gmail.com','Ky Huu Dong','1'
);
INSERT INTO users (username, password, email, full_name, role_id)
VALUES (
    'sang', '321', 'nguyenthanhsang@gmail.com','Nguyen Thanh Sang','1'
);
INSERT INTO users (username, password, email, full_name, role_id)
VALUES (
    'toan', '456', 'vinhtoan20@gmail.com','Truong Nguyen Vinh Toan','2'
);
INSERT INTO users (username, password, email, full_name, role_id)
VALUES (
    'linh', '789', 'linhle@gmail.com','Le Thi Linh','2'
);

/*promotion table*/
INSERT INTO promotion (promotion_id) VALUES ('1');
INSERT INTO promotion (promotion_id) VALUES ('2');

/*user_promotion table*/
INSERT INTO user_promotion (id ,user_id, promotion_id) VALUES ('1','018f0dcd-db50-4d2b-9b13-d8c6d418b3a2','1');
INSERT INTO user_promotion (id ,user_id, promotion_id) VALUES ('2','21651a0e-0f38-40b0-b241-9b2f04f485df','2');
INSERT INTO user_promotion (id ,user_id, promotion_id) VALUES ('3','2b3f5f89-828f-4a70-8c64-08928e3df9aa','1');
INSERT INTO user_promotion (id ,user_id, promotion_id) VALUES ('4','6f67f5e0-29ee-4aea-b8be-74be86d8c71c','2');

/*tourist_attractions table*/
INSERT INTO tourist_attractions (tourist_attraction_name) VALUES ('1');
INSERT INTO tourist_attractions (tourist_attraction_name) VALUES ('2');


/*tour table*/
INSERT INTO tour (tour_name) VALUES (N'Bà Nà Hill');
INSERT INTO tour (tour_name) VALUES (N'Bà Nà - Mỹ Sơn');
INSERT INTO tour (tour_name) VALUES (N'Công Viên Châu Á - Hội An');
INSERT INTO tour (tour_name) VALUES (N'Bà Nà - Mỹ Sơn - Hội An');
INSERT INTO tour (tour_name) VALUES (N'Vinpearl - Mỹ Sơn');
INSERT INTO tour (tour_name) VALUES (N'Cầu Vàng - Hội An - Cù Lao Chàm');

/*tour_detail*/
INSERT INTO tour_detail (tour_id, tourist_attraction_id) VALUES ('2c796e8c-c7db-4314-a828-29224f400ade','1d5d6090-7da7-44ed-8e1d-313b59746bf3');
INSERT INTO tour_detail (tour_id, tourist_attraction_id) VALUES ('afe95cce-c616-47cc-9c7d-ba553e077947','40a29400-bd41-4e36-824a-81345693452b');

/*booked_tour*/
INSERT INTO booked_tour (user_id, tour_id) VALUES ('018f0dcd-db50-4d2b-9b13-d8c6d418b3a2','2c796e8c-c7db-4314-a828-29224f400ade');
INSERT INTO booked_tour (user_id, tour_id) VALUES ('21651a0e-0f38-40b0-b241-9b2f04f485df','afe95cce-c616-47cc-9c7d-ba553e077947');
INSERT INTO booked_tour (user_id, tour_id) VALUES ('2b3f5f89-828f-4a70-8c64-08928e3df9aa','2c796e8c-c7db-4314-a828-29224f400ade');
INSERT INTO booked_tour (user_id, tour_id) VALUES ('6f67f5e0-29ee-4aea-b8be-74be86d8c71c','afe95cce-c616-47cc-9c7d-ba553e077947');


/*Update image*/
UPDATE tourist_attractions SET image = 'bana.jpg' WHERE tourist_attraction_name = '1';
UPDATE tourist_attractions SET image = 'hoi_an.jpg' WHERE tourist_attraction_name = '2';
=======
INSERT INTO booked_tour (user_id, tour_id) VALUES ('6f67f5e0-29ee-4aea-b8be-74be86d8c71c','afe95cce-c616-47cc-9c7d-ba553e077947');
