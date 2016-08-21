DROP TABLE NodeExpress.dbo.books;

CREATE TABLE NodeExpress.dbo.books (
    id INT PRIMARY KEY,
    title VARCHAR(60),
    genre VARCHAR(60),
    author VARCHAR(60),
    haveRead BIT
);

INSERT INTO NodeExpress.dbo.books (id, title, genre, author, haveRead) 
VALUES 
    (1, 'War and Peace','Historical Fiction','Lev Nikolayevich Tolstoy', 0),
    (2, 'Stranger in a Strange Land', 'Science Fiction', 'Robert A Heinlein',1),
    (3, 'The Gene: An Intimate History', 'Medical History', 'Siddhartha Mukherjee', 1),
    (4, 'Les Misérables','Historical Fiction','Victor Hugo', 0),
    (5, 'The Time Machine', 'Science Fiction', 'H. G. Wells', 0),   
    (6, 'A Journey into the Center of the Earth', 'Science Fiction', 'Jules Verne', 0),    
    (7, 'The Dark World', 'Fantasy', 'Henry Kuttner', 0),    
    (8, 'The Wind in the Willows', 'Fantasy', 'Kenneth Grahame', 0),    
    (9, 'Life On The Mississippi', 'History', 'Mark Twain', 0),    
    (10, 'Childhood', 'Biography', 'Lev Nikolayevich Tolstoy', 0),    
    (11, 'Mr. Mecedes', 'Thriller', 'Stephen King', 1 );
