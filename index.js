const { response } = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');

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
        switch (response.initialQuestions) {
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
const viewDepartments = () =>{
  db.query(

  );
};
const viewRoles = () =>{
  db.query(

  );
};
const viewEmployees = () =>{
  db.query(

  );
};

const addDepartment = () =>{
  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What is the name of the new department you would like to add?",
    }
  ]).then((response) => {
    const newDepartment = response.name;
    db.query('INSERT INTO department (name) VALUES (?)', newDepartment, (err, res) => {
      if (err) {
        return console.log(err);
      }
      return console.log("Department: " + newDepartment + "added!");
    })
    initialQuestions();
  });
};

const addRole = () =>{
  db.query("SELECT department.name, department.id FROM department;")
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
        type: "input",
        name: "department",
        message: "Please select what department the new role belongs to: ",
        choices: response.map(({name, id}) => ({name: name, value: id}))
      }
    ]).then((response) => {
      const newRole = [`${response.title}, ${response.salary}, ${response.department}`];
      db.query('INSERT INTO role (title, salary, department_id) VALUES (?,?,?)', newRole, (err, res) => {
        if (err) {
          return console.log(err);
        }
        return console.log("Role: " + newRole + "added!");
      })
      initialQuestions();
    });
  });  
};
const addEmployee = () =>{
  db.query("SELECT role.title, role.id FROM role;")
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
        type: "input",
        name: "role",
        message: "Please select what role the new employee will have: ",
        choices: response.map(({title, id}) => ({name: title, value: id}))
      }
    ]).then((response) => {
      const newEmployee = [{firstName: `${response.firstName}`, lastName: `${response.lastNAme}`, role: `${response.role}`},];
      db.query("SELECT employee.first_name, employee.last_name, employee.id FROM employee WHERE manager_id IS NULL;")
      .then(([response]) => {
        inquirer.prompt([
          {
            type: 'list',
            name: 'manager',
            message: "Please select who the new employee's manager will be: ",
            choices: response.map(({first_name, last_name, id}) => ({ name: `${first_name}` `${last_name}`, value: id}))
          }
        ]).then((response) => {
          const newManager = response.manager;
          newEmployee.push(newManager);
          db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)', newEmployee, (err, res) => {
            if (err) {
              return console.log(err);
            }
            return console.log("Employee: " + newEmployee + "added!");
          });
          initialQuestions();
        });
      });
    });
  });  
};
const updateEmployee = () =>{
  db.query(

  );
};

const cancel = () =>{
  console.log("Thank you! If you canceled by mistake, please restart app by running 'node index.js' in the CLI!");
  process.exit();
}
const init = () => {
  initialQuestions()
};

init();
