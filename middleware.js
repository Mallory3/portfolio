//middleware: if the method is POST create and modify a file called log.txt and log the name:email of users when they fill out the form

const express = require('express');
const fs = require('fs')

const middleware = function (request, response, next) {
  if (request.method === "POST") {
    fs.appendFile('log.txt', request.body.name + ":" + request.body.email+"\n\n", function() {
    console.log("logged")
    })
  }
  next()
}

module.exports = middleware;