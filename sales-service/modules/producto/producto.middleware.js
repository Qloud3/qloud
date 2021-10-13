(function () {
  "use strict";

  module.exports = {
    addProducto: addProducto,
    getProductos: getProductos,
    getProductoById: getProductoById,
    modifyProducto: modifyProducto,
    removeProducto: removeProducto,
  };

  var ProductoService = require("./producto.module")().ProductoService;
  const { BadRequest } = require("../util/errors");

  function addProducto(req, res, next) {
    const {
      nombre,
      descripcion,
      valor_unitario,
      disponible
    } = req.body;
    try {
      if (!nombre || !valor_unitario) {
        throw new BadRequest(
          "Campos requeridos no encontrados: Nombre, Valor Unitario"
        );
      }
      ProductoService.createProducto(req.body).then(success).catch(failure);

      function success(data) {
        req.response = data;
        next();
      }

      function failure(error) {
        next(error);
      }
    } catch (err) {
      next(err);
    }
  }

  function getProductos(req, res, next) {
    ProductoService.fetchProductos().then(success).catch(failure);

    function success(data) {
      req.response = data;
      next();
    }

    function failure(err) {
      next(err);
    }
  }

  function getProductoById(req, res, next) {
    ProductoService.fetchProductoById(req.params.ProductoId).then(success).catch(failure);

    function success(data) {
      req.response = data;
      next();
    }

    function failure(err) {
      next(err);
    }
  }

  function modifyProducto(req, res, next) {
    ProductoService.updateProducto(req.params.productoId, req.body)
      .then(success)
      .catch(error);

    function success(data) {
      req.response = data;
      next();
    }

    function error(err) {
      next(err);
    }
  }

  function removeProducto(req, res, next) {
    ProductoService.deleteProducto(req.params.productoId).then(success).catch(error);

    function success(data) {
      req.response = data;
      next();
    }

    function error(err) {
      next(err);
    }
  }
})();
