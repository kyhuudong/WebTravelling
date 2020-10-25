CREATE DATABASE sbotour;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS Roles(
    role_id NCHAR(16) PRIMARY KEY NOT NULL,
    role_name NCHAR(10)
);

CREATE TABLE IF NOT EXISTS Users(
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY NOT NULL,
    username NCHAR(10) NOT NULL,
    password NCHAR(50) NOT NULL,
    email NCHAR(255) NOT NULL,
    full_name VARCHAR(50) NOT NULL,
    address VARCHAR(50),
    gender BIT,
    phone NCHAR(10),
    role_id NCHAR(16) NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)

);

CREATE TABLE IF NOT EXISTS Promotion(
    promotion_id NCHAR(16) PRIMARY KEY NOT NULL,
    name VARCHAR(50),
    description TEXT,
    discount NCHAR(10),
    banner NCHAR(100),
    date_start TIMESTAMP,
    date_finish TIMESTAMP
);

CREATE TABLE IF NOT EXISTS User_Promotion(
    id NCHAR(16) PRIMARY KEY NOT NULL,
    user_id uuid NOT NULL,
    promotion_id NCHAR(16) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (promotion_id) REFERENCES promotion(promotion_id)
);

CREATE TABLE IF NOT EXISTS Tourist_Attractions (
    tourist_attraction_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    tourist_attraction_name NCHAR(50) NULL,
    description TEXT NULL,
    image NCHAR(255) NULL,
	address NCHAR(150) NULL,
    ticket_cost decimal(18,0) NULL,
	vote int NULL,
	discount int NULL,
    PRIMARY KEY (tourist_attraction_id)
);

CREATE TABLE IF NOT EXISTS Tour (
    tour_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    tour_name NCHAR(50) NULL,
    description TEXT NULL,
	vote INT NULL,
	tour_type CHAR(10),
    PRIMARY KEY (tour_id)
);

CREATE TABLE IF NOT EXISTS Tour_Detail (
    tour_detail_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    tour_id uuid NOT NULL,
	tourist_attraction_id uuid NOT NULL,
    time_start TIMESTAMP NULL,
    time_finish TIMESTAMP NULL,
    PRIMARY KEY (tour_detail_id),
	FOREIGN KEY (tour_id) REFERENCES Tour(tour_id),
	FOREIGN KEY (tourist_attraction_id) REFERENCES Tourist_Attractions(tourist_attraction_id)
);

CREATE TABLE IF NOT EXISTS Booked_Tour (
    booked_tour_id uuid DEFAULT uuid_generate_v4 () NOT NULL,
    user_id uuid NOT NULL,
	tour_id uuid NOT NULL,
    amount INT NULL,
    status CHAR(10) NULL,
    PRIMARY KEY (booked_tour_id),
	FOREIGN KEY (tour_id) REFERENCES Tour(tour_id),
	FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

ALTER TABLE tour ADD COLUMN departure_location NCHAR(150) NULL;
ALTER TABLE tour ADD COLUMN vehicle NCHAR(20) NULL;
ALTER TABLE tour ADD COLUMN tour_cost decimal(18,0) NULL;
ALTER TABLE tour ADD COLUMN image character(255) NULL;
