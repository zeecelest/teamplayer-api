TRUNCATE messages RESTART IDENTITY CASCADE;

INSERT INTO messages
    (id, message, recipient, date_published)
    VALUES
    (1, 'message sent', 'john', '11/24/19');
    