const { response } = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const db = require('./config/connection');

const initialQuestions = () =>{
  inquirer.prompt([

  ]).then((response) => {

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

  ]).then((response) => {

  });
};
const addRole = () =>{
  inquirer.prompt([

  ]).then((response) => {

  });
};
const addEmployee = () =>{
  inquirer.prompt([

  ]).then((response) => {

  });
};
const updateEmployee = () =>{
  db.query(

  );
};

const init = () => {
  initialQuestions()
};

init();
