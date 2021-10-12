(function () {
  var mongoose = require("mongoose");

  var Schema = mongoose.Schema;

  var SaleSchema = new Schema({
    documento_cliente: {
      type: Number,
      required: true,
    },
    cliente: {
      type: String,
      required: true,
    },
    vendedor: {
      type: String,
      required: true,
    },
    estado: {
      type: String,
      required: true,
    },
    fecha_venta: {
      type: Date,
      required: true,
    },
    valor_total: {
      type: Number,
      required: true,
    },
  });

  module.exports = mongoose.model("ventas", SaleSchema);
})();
