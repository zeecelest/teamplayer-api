CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    message TEXT NOT NULL,
    recipient TEXT NOT NULL,
    date_published TIMESTAMP DEFAULT now() NOT NULL
);