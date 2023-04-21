USE employee_db;

INSERT INTO department (name)
VALUES ("Development"),
       ("Sales"),
       ("HR"),
       ("Accounting");
     
    
INSERT INTO role (title, salary, department_id)
VALUES ('Senior Developer', 130000, 1),
       ('Lead Developer', 105000, 1),
       ('Junior Developer', 75000, 1),
       ('Project Manager', 90000, 1),
       ('Account Manager', 105000, 2),
       ('Sales Rep', 60000, 2),
       ('HR Manager', 105000, 3),
       ('HR Rep', 65000, 3),
       ('Senior Accountant', 75000, 4),
       ('Accountant', 45000, 4);
  
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Denzel", "Washington", 1, NULL),
       ("Johnny", "Depp", 2, 1),
       ("Ron", "Swanson", 3, 1),
       ("Ryan", "Reynolds", 4, NULL),
       ("Jennifer", "Lawrence", 5, NULL),
       ("Margot", "Robbie", 6, 5),
       ("Dwayne", "Johnson", 7, NULL),
       ("Rachel", "McAdams", 8, 7),
       ("Natalie", "Portman", 9, NULL),
       ("Gal", "Gadot", 10, 9);


