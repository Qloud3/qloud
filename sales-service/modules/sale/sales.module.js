(function(){
    'use strict';

    module.exports = init;

    function init(){
        return{
            SaleController: require('./sales.controller'),
            SaleMiddleware: require('./sales.middleware'),
            SaleService: require('./sales.service'),
            SaleModel: require('./sales.model'),
        }
    }
})();