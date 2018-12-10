# StackOverFlow-Lite
[![Build Status](https://travis-ci.org/augustineezinwa/StackOverFlow-Lite.svg?branch=develop)](https://travis-ci.org/augustineezinwa/StackOverFlow-Lite) [![Coverage Status](https://coveralls.io/repos/github/augustineezinwa/StackOverFlow-Lite/badge.svg?branch=develop)](https://coveralls.io/github/augustineezinwa/StackOverFlow-Lite?branch=develop) 
[![Test Coverage](https://api.codeclimate.com/v1/badges/cd1c46d508833af27275/test_coverage)](https://codeclimate.com/github/augustineezinwa/StackOverFlow-Lite/test_coverage) 
[![Maintainability](https://api.codeclimate.com/v1/badges/cd1c46d508833af27275/maintainability)](https://codeclimate.com/github/augustineezinwa/StackOverFlow-Lite/maintainability)

StackOverFlow-Lite Application is a platform where users can ask questions and get answers to their questions
#
* *Pivotal Tracker Project Management Board Link* : https://www.pivotaltracker.com/n/projects/2189325 
* *StackOverFlow-Lite Application github page UI link* :  https://augustineezinwa.github.io/StackOverFlow-Lite/UI/index.html
* *Application API Documentation Link* : https://stack-o-lite.herokuapp.com/api-docs

## Table of content
* [Problem Statement](#problem)
* [Features](#features)
* [Background](#background)
* [Installation](#installation)
* [Tests](#tests)
* [Endpoints](#endpoints)


## Problem Statement
* Life is a complex scene. Most at times, people are faced with problems and need urgent solutions or answers to their problem. This application sees to it that the technological gap in the lifes of people are filled up by building a community or a platform where people can answer questions or get answers to their question in a vital field of life which is technology.
## Features
StackOverFlow-Lite Application consists of the following features:

* Users can create an account and login
* Users can post questions on StackOverFlow-Lite application
* Users can delete the questions they post
* Users can view the answers to questions on the application
* Users can accept an answer as the most preferred to all answers to his question
* Users can upvote or downvote an answer
* Users can comment on an answer
* Users can fetch all questions he or she has ever asked on the platform
* Users can search for questions on the platform
* Users can view questions with the most answers

## Background

* Stack-OverFlow-Lite Application makes use of the below mentioned technologies.

* ECMAScript 6: Also known as ES2015, this is a version of Javascript with
    next-generation features like arrow functions, generators, enhanced object literals,
    spread operators and more. The ES2015 is used in many areas of this project. See [this link](https://en.wikipedia.org/wiki/ECMAScript) for details.
* NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment for executing JavaScript code on the server-side.
    See [this link](https://en.wikipedia.org/wiki/Node.js) for details.
* ExressJS: ExpressJS, is a web application framework for Node.js, It is designed for building web applications and APIs.
    see [this link](https://en.wikipedia.org/wiki/Express.js).
* Postgresql : Postgresql is an advanced open source Object-Relational Model (ORM) database. see [this link](https://www.postgresql.org/) for details.
* Jsonwebtoken: This application makes use of jwt for authentication. see [link](https://jwt.io/)

## Installation 

* To begin, Install NodeJs on your computer. See this [this link](https://nodejs.org/en) for more information.
* Clone the git repository: `git clone https://github.com/augustineezinwa/StackOverFlow-Lite`.
* Navigate into cloned repository and enter `npm  install` on your command-line.
* Create a `.env` file at the root folder, following the `.env.example` file guide. Enter your database details. Get an online Postgres database or install one locally. See [link](http://elephantsql.com) 
* Start the application by entering `npm start`.
* Get postman and verify all shortlisted endpoints.

## Tests

* To run tests, Consider typing `npm test` on your command-line.

## Endpoints

<table>
<tr><th>*http verbs*</th><th>*Short-listed endpoints*</th><th> *Functionality* </th></tr>
<tr><td>POST</td><td>/auth/login </td><td> Logins a user</td></tr>
<tr><td>POST</td><td>/auth/signup </td><td> Registers a new user</td></tr>
<tr><td>POST</td><td>/questions </td><td> Adds a question</td></tr>
<tr><td>GET</td><td>/questions </td><td> Gets all questions</td></tr>
<tr><td>GET</td><td>/questions/mostanswers </td><td> Gets questions with most answers</td></tr>
<tr><td>GET</td><td>/questions/?search=<searchString> </td><td> Search questions by keywords</td></tr>
<tr><td>GET</td><td>/questions/:questionId</td><td>Gets a question by id</td></tr>
<tr><td>GET</td><td>/users/questions </td><td> Gets all questions belonging to a user</td></tr>
<tr><td>DELETE</td><td>/questions/:questionId</td><td>Delete a particular question</td></tr>
<tr><td>POST</td><td> /questions/:questionId/answers </td><td> Adds an answer to a particular question</td></tr>
<tr><td>PUT</td><td> /questions/:questionId/answers/:answerId </td><td> Updates or prefers an answer</td></tr>
<tr><td>GET</td><td> /questions/:questionId/answers/:answerId </td><td> Gets an answer with all its comments</td></tr>
<tr><td>PUT</td><td> /questions/:questionId/answers/:answerId/upvote </td><td> Upvotes an answer</td></tr>
<tr><td>PUT</td><td> /questions/:questionId/answers/:answerId/downvote </td><td> Downvotes an answer</td></tr>
<tr><td>POST</td><td> /questions/:questionId/answer/:answerId/comments </td><td> Adds a comment to an answer</td></tr>
</table>

## To Contribute

* To contribute, clone the repository. Create a branch, add in your contributions, raise a pull request and send in the link to the pull request.

## Special Thanks / Credits

* [Fred]() - Week 2 Learning Facilitator Assistant. Thanks for your feedback and great inputs towards the success and durability of this project
* [Nenerae]() - Week 1 Learning Facilitator Assistant. Thanks for your feedback on the UI and guidance towards a quality codebase

## Author

* [Augustine Ezinwa]()

*Application client-side is currently under construction ....*

