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
  inquirer.prompt([
    {
      type: "",
      name: "",
      message: "",
    }
  ]).then((response) => {

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
