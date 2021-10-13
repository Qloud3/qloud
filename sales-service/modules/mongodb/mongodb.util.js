(function () {
    'use strict';
    
    module.exports = {
        init: init
    };

    var mongoose = require('mongoose');

    var mongodbConfig = require('../../config/mongodb/mongodb-config').mongodb;

    function init() {
        var options = {
            promiseLibrary: require('bluebird'),
            useNewUrlParser: true
        };

        var connectionString = prepareConnectionString(mongodbConfig);

        mongoose.connect(connectionString, options)
            .then(function (result) {
                console.log("La conexión con MongoDB fue exitosa. DB: " + connectionString);
            })
            .catch(function (error) {
                console.log(error.message);
                console.log("Ocurrió un error mientras se conectaba con la DB: : " + connectionString);
            });
    }

    function prepareConnectionString(config) {
        var connectionString = 'mongodb+srv://';

        if (config.user) {
            connectionString += config.user + ':' + config.password + '@';
        }

        connectionString += config.server + '/' + config.database+"?retryWrites=true&w=majority";

        return connectionString;
    }

})();