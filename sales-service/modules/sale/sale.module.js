(function(){
    'use strict';

    module.exports = init;

    function init(){
        return{
            SaleController: require('./sale.controller'),
            SaleMiddleware: require('./sale.middleware'),
            SaleService: require('./sale.service'),
            SaleModel: require('./sale.model'),
        }
    }
})();