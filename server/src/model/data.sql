-- created by default by postgres
CREATE DATABASE postgres;

-- tables
CREATE TABLE tasks(
	id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	description TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
	updated_at TIMESTAMP NULL,
	completed_at TIMESTAMP NULL,
	completed BOOLEAN NOT NULL DEFAULT false
);

-- functions
CREATE OR REPLACE FUNCTION update_tasks_trigger()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.completed IS DISTINCT FROM NEW.completed THEN
        NEW.completed_at = now();
    END IF;

    IF (OLD.title, OLD.description) IS DISTINCT FROM (NEW.title, NEW.description) THEN
        NEW.updated_at = now();
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- triggers
CREATE TRIGGER tasks_update_trigger
    BEFORE UPDATE
    ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION update_tasks_trigger();