CREATE DATABASE ecori_taskmanager;

CREATE TABLE tasks (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(2550),
    created_at VARCHAR(250),
    updated_at VARCHAR(250),
    completed_at VARCHAR(250)
);

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255)
);