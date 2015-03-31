/**
 * This module initializes mongoose data models and
 * provides access to them.
 */
var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var async = require('async');
var config = require('./config');

/**
 * Connect to the database.
 */
mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

/**
 * DB connection error handler.
 */
db.on('error', function (err) {
    console.error( err );
});

/**
 * DB connection open handler.
 */
db.once('open', function callback() {
    console.log( 'Connection with DB was established' );
});

/**
 * Loaded data models hash.
 */
var models = {};

/**
 * Initialize all data models from models directory.
 * This function imports all *.js files from models directory
 * and stores loaded mongoose models in the models hash.
 * @param modelsDirectory - directory with mongoose models
 * @param callback - 'models loading finished' callback
 */
var init = function (modelsDirectory, callback) {
    var schemaList = fs.readdirSync(modelsDirectory);
    async.each(schemaList, function (item, cb) {
        var modelName = path.basename(item, '.js');
        models[modelName] = require(path.join(modelsDirectory, modelName))(mongoose).Model;
        cb();
    }, callback);
};

/**
 * Get data model from the models hash by name.
 * @param modelName - model name
 * @returns {*}
 */
var model = function (modelName) {
    var name = modelName.toLowerCase();
    if (typeof models[name] == "undefined") {
        // Если модель на найдена, то создаем ошибку
        throw "Model '" + name + "' is not exist";
    }
    return models[name];
};

/**
 * Export functions.
 * @type {{init: Function, model: Function}}
 */
module.exports = {
   init: init,
   model: model
};
