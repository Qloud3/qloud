(function () {
  var mongoose = require("mongoose");

  var Schema = mongoose.Schema;

  var ProductoSchema = new Schema({
    nombre: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: false,
    },
    valor_unitario: {
      type: Number,
      required: true,
    },
    disponible: {
      type: Boolean,
      required: false,
    }
  });

  module.exports = mongoose.model("productos", ProductoSchema);
})();
