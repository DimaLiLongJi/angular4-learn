"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var dbConfig    = require('config').db;
var sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
var db        = {};

function getFiles (dir, files_){
    files_ = files_ || [];

    fs
      .readdirSync(dir)
      .filter(function(file) {
        return file !== "index.js" && file !== ".DS_Store";
      })
      .forEach(function(file) {
        var name = path.join(dir, file);

        if (fs.statSync(name).isDirectory()) {
          getFiles(name, db);
        } else {
          var model;
          try {
            model = sequelize.import(name);
            db[model.name] = model;
          } catch (e) {
            console.error('sequelize import model failed. ', 'name is ', name, 'error is ', e);
          }
        }
      });
}

getFiles(__dirname, db);



Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
