(function () {
    'use strict';
  
    var express = require('express');
    var router = express.Router();
  
  
    var SaleMiddleware = require('./sales.module')().SaleMiddleware;
  
    router.post('/',
        SaleMiddleware.addSale,
        function (req, res) {
            res.status(201).json(req.response);
        });
  
    router.get('/',
        SaleMiddleware.getSales,
        function (req, res) {
            res.status(200).json(req.response);
        });
  
    router.get('/:saleId',
        SaleMiddleware.getSaleById,
        function (req, res) {
            res.status(200).json(req.response);
        });
  
    router.put('/:saleId',
        SaleMiddleware.modifySale,
        function (req, res) {
            res.status(200).json(req.response);
        });
    
    router.delete('/:saleId',
        SaleMiddleware.removeSale,
        function (req, res) {
            res.status(200).json(req.response);
        });
    module.exports = router;
  
  })();