# EM events manager

[![Build Status](https://travis-ci.org/Liadi/events-manager.svg?branch=develop)](https://travis-ci.org/Liadi/events-manager)

EM events manager is a web applicatiom to book centers for events.

The app allows user to manage the Center/Event life cycle based on privileges (Admin user and Regular user)
The app has other enhancing features such as (advanced)search, pagination amongst others

---
### How to install
 - Ensure apps installed: git, npm, node, postgresql(>v9.x)
 - git clone https://github.com/Liadi/events-manager.git
 - set up (postgresql) database as seen in server/config/config.json or change config file to suit your custom database configuration
 - npm install

---
### Main scripts
 - npm run dev (development)
 - npm start (production)
 - npm test (testing)

---
### App live (on [heroku](https://heroku.com))
###### [EM events Manager](https://emcenters.herokuapp.com)

---
### Technolgies/Frameworks
* Database([postgresql](https://postgresql.org/))
* ORM ([sequelize](https://github.com/sequelize/sequelize))
* Styling ([bootstrap v4.0](https://getbootstrap.com/))
* Custom styling ([sass](https://sass-lang.com/))
* Backend ([Node.js](https://nodejs.org) ['express'](https://express.com))
* Frontend ([React](https://reactjs.org/) + [Redux](https://redux.js.org))
* Test
> Backend([mocha](https://mochajs.org))
> Frontend (...work in progress)
* check package.json for modules
* Authentication ([JSON Web Token](https://jsonwebtoken.io/))

---
### Continuous Integration
* [Travis CI](https://travis-ci.org) (build badge seen above)

---
### API documentation (Documentation using [swagger](https://swagger.io) in progress).

---
### Issues
* No code guide, linter not used
* No code coverage
* No frontend test
* API documentation (Documentation using [swagger](https://swagger.io) in progress).
* Image issue(s)
> Images are stored in app directory. On build for production all images from previous build are lost since distribution is deleted and re-built. Image referencing on deployed app (heroku) is buggy but works fine on local server. to run start script on local server check note below
* Style sucks! :(
* Security vulnerabilities: key(s), salt(s) are all exposed -this project is experimental

---
### Note
###### *To build and run on localhost (i.e npm start), replace configuration of "production" with configuration of "development" or any other appropriate db configuration -all that is essential is a replacement of ("use_env_variable": "DATABASE_URL") with proper database configuration on local machine. Pls note this is not needed as running  "npm run dev" is sufficient for running on localhost*


###### *In future versions, regular users will have the option to upgrade to different plans to enable them host their own centers and manage them.*
