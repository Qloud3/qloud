(function () {
    "use strict";
  
    module.exports = {
      createSale: createSale,
      fetchSales: fetchSales,
      fetchSaleById: fetchSaleById,
      updateSale: updateSale,
      deleteSale: deleteSale,
    };
  
    var SaleModel = require("./sale.module")().SaleModel;
  
    function createSale(sale) {
      return SaleModel.create(sale);
    }
  
    function fetchSales() {
      return SaleModel.find({}).exec();
    }
  
    function fetchSaleById(saleId) {
      return SaleModel.findById(saleId).exec();
    }
  
    function updateSale(saleId, sale) {
      return SaleModel.findByIdAndUpdate(saleId, sale, {
        new: true,
      }).exec();
    }
  
    function deleteSale(saleId) {
      return SaleModel.findByIdAndRemove(saleId).exec();
    }
  })();
  