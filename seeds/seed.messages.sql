BEGIN;

TRUNCATE messages RESTART IDENTITY CASCADE;

INSERT INTO messages(message, recipient, date_published)
    VALUES('message sent', 'john', '11/24/19');

COMMIT;
    