CREATE TABLE chat_history (
    id INT AUTO_INCREMENT NOT NULL,
    userId int,
    userName varchar(255),
    message varchar(255)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;





CREATE TABLE chat_history (
   id INT AUTO_INCREMENT NOT NULL,
   userId varchar(255) NOT NULL,
   userName varchar(255) NOT NULL,
   messages varchar(255),
   primary key (id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



    db.query("INSERT INTO chat_history (messages) VALUES (' " + msg + " ')");


INSERT INTO chat_history (userId, userName, messages) VALUES (101, "venkat", "hello")  


INSERT INTO chat_history (userId, userName, messages) VALUES (111, "Venkatesh","Hi")
