(function () {
  var mongoose = require("mongoose");

  var Schema = mongoose.Schema;

  var UsuarioSchema = new Schema({
    nombre: {
      type: String,
      required: true,
    },
    cedula: {
      type: Number,
      required: true,
    },
    telefono: {
      type: Number,
      required: false,
    },
    estado: {
      type: String,
      required: false,
    },
    rol: {
      type: String,
      required: true,
    }
  });

  module.exports = mongoose.model("usuarios", UsuarioSchema);
})();
