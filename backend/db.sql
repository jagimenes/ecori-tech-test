CREATE TABLE tasks(
	id uuid not null primary key,
	title varchar(100) not null,
	description varchar(255) not null,
	completed_at timestamp null,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp null
);

CREATE TABLE users(
	id uuid not null primary key,
	username varchar(100) not null unique,
	email varchar(255) not null unique,
	password varchar(255) not null,
	created_at timestamp default CURRENT_TIMESTAMP,
	updated_at timestamp null
);
