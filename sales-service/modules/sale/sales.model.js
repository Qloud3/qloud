(function () {
    var mongoose = require("mongoose");
  
    var Schema = mongoose.Schema;
  
    var SaleSchema = new Schema({
      valorTotal: {
        type: Number,
        required: true,
      },
      fechaVenta: {
        type: Date,
        required: true,
      },
      documentoCliente: {
        type: Number,
        required: true,
      },
      nombreCliente: {
        type: String,
        required: true,
      },
      nombreVendedor: {
        type: String,
        required: true
      },
      estado: {
        type: String,
        required: true,
      }
    });
  
    module.exports = mongoose.model("sale", SaleSchema);
  })();
  