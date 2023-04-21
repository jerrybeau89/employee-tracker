const inquirer = require('inquirer');
const db = require('./config/connection');

// Initial prompt questions that guide the user.
const initialQuestions = () =>{
  inquirer.prompt([
    {
      type: "list",
      name: "options",
      message: "Please select an option:",
      choices: [
          'View All Departments',
          'View All Roles',
          'View All Employees',
          'Add a Department',
          'Add a Role',
          'Add an Employee',
          'Update Employee Information',
          'Cancel'
      ]
    }
  ]).then((response) => {
        switch (response.options) {
            case 'View All Departments':
              viewDepartments();
              break;
            case 'View All Roles':
              viewRoles();
              break;
            case 'View All Employees':
              viewEmployees();
              break;
            case 'Add a Department':
              addDepartment();
              break;
            case 'Add a Role':
              addRole();
              break;
            case 'Add an Employee':
              addEmployee();
              break;
            case 'Update Employee Information':
              updateEmployee();
              break;
            case 'Cancel':
              cancel();
              break;
        }
  });
};
// Views all departments in the DB
const viewDepartments = () =>{
  db.query(
    "SELECT * FROM department",
    (err, res) => {
      if (err) {
        return console.log(err);
      }
      return console.table(res),
      initialQuestions();
    });
};
// Views all roles in the DB
const viewRoles = () =>{
  db.query(
    "SELECT role.id, role.title, role.salary, department.name AS department FROM role JOIN department on role.department_id = department.id;",
    (err, res) => {
      if (err) {
        return console.log(err);
      }
      return console.table(res),
      initialQuestions();
    });
};
// Views all employees in the DB
const viewEmployees = () =>{
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, CONCAT(mgr.first_name, mgr.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee mgr ON employee.manager_id = mgr.id",
    (err, res) => {
      if (err) {
        return console.log(err);
      }
      return console.table(res),
      initialQuestions();
    });
};
// Adds a new department
const addDepartment = () =>{
  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department you would like to add?",
    }
  ]).then((response) => {
    const newDepartment = response.newDepartment;
    db.query('INSERT INTO department (name) VALUES (?)', newDepartment, (err, res) => {
      if (err) {
        return console.log(err);
      }
      return console.log("Department: " + newDepartment + " added!"),
      initialQuestions();
    })
  });
};
// Adds a new role
const addRole = () =>{
  db.promise().query("SELECT department.name, department.id FROM department;")
  .then(([response])=> {
    inquirer.prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the new role?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of the new role?",
      },
      {
        type: "list",
        name: "department",
        message: "Please select what department the new role belongs to: ",
        choices: response.map(({name, id}) => ({name: name, value: id}))
      }
    ]).then((response) => {
      const newRole = [response.title, response.salary, response.department];
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', newRole, (err, res) => {
        if (err) {
          return console.log(err);
        }
        return console.log("Role: " + newRole + " added!"),
        initialQuestions();
      })
    });
  });  
};
// Adds a new employee
const addEmployee = () =>{
  db.promise().query("SELECT role.title, role.id FROM role;")
  .then(([response])=> {
    inquirer.prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the new employee?",
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the new employee?",
      },
      {
        type: "list",
        name: "role",
        message: "Please select what role the new employee will have: ",
        choices: response.map(({title, id}) => ({name: title, value: id}))
      }
    ]).then((response) => {
      const newEmployee = [response.firstName, response.lastName, response.role];
      db.promise().query("SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE manager_id IS NULL;")
      .then(([response]) => {
        inquirer.prompt([
          {
            type: 'list',
            name: 'manager',
            message: "Please select who the new employee's manager will be: ",
            choices: response.map(({first_name, last_name, id}) => ({ name: `${first_name + " " + last_name}`, value: id}))
          }
        ]).then((response) => {
          const newManager = response.manager;
          newEmployee.push(newManager);
          db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', newEmployee, (err, res) => {
            if (err) {
              return console.log(err);
            }
            return console.log("Employee: " + newEmployee + " added!"),
            initialQuestions();
          });
        });
      });
    });
  });  
};
// Updates employees by providing a prompt to select an employee, then their role, and then updating it. 
const updateEmployee = () =>{
  db.promise().query(`SELECT * FROM employee`)
  .then(([response])=> {
    inquirer.prompt([
      {
        type: 'list',
        name: 'employee',
        message: `Please select an employee you would like to update: `,
        choices: response.map(({first_name, last_name, id}) => ({name: `${first_name + " " + last_name}`, value: id}))
      }
    ])
    .then((response)=> {
      const updatedEmployee = response.employee;
      db.promise().query('SELECT role.id, role.title FROM role')
      .then(([response])=> {
        inquirer.prompt([
          {
            type: 'list',
            name: 'selectRole',
            message: 'Please select which role you would like the employee to have: ',
            choices: response.map(({title, id}) => ({name: title, value: id})) 
          }
        ])
        .then((response)=> {
          const newRole = response.selectRole;
          db.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.selectRole, updatedEmployee], (err, res)=> {
            if (err) {
              return console.log(err);
            }
            return console.log("Employee: " + updatedEmployee + " updated!"),
            viewEmployees();
          });
        });
      });
    });
  });
};
// Allows for a user to cancel the app
const cancel = () =>{
  console.log("Thank you! If you canceled by mistake, please restart app by running 'npm start' in the CLI!");
  process.exit();
}
// Initializes the app by calling the initial questions
const init = () => {
  initialQuestions()
};

init();