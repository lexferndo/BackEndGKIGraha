const documentService = require("../services/document.services");
const errorResponse = require("../middleware/error.response");

class documentController {
  static findAll = async (req, res, next) => {
    try {
      const data = await documentService.findAll(req.query);

      res.status(200).json({
        message: "Get All Documents Successfully!",
        totalData: data.totalData,
        totalPage: data.totalPage,
        data: data.data,
      });
    } catch (error) {
      next(error);
    }
  };

  static findOne = async (req, res, next) => {
    try {
      const data = await documentService.findOne(req.params);

      if (!data) {
        throw new errorResponse("Data Not Found", 400);
      }

      res.status(200).json({
        message: "Get One Document Successfully!",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.type || !req.file) {
        throw new errorResponse("Missing some arguments", 400);
      }

      const data = await documentService.create(req.body, req.file);

      res.status(201).json({
        message: "Create New Document Successfully!",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      if (!req.body.name || !req.body.type || !req.file) {
        throw new errorResponse("Missing some arguments", 400);
      }

      const data = await documentService.update(req.params, req.body, req.file);

      res.status(200).json({
        message: "Updated Document Successfully!",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const existingData = await documentService.findOne(req.params);

      if (!existingData) {
        throw new errorResponse("Data Not Found", 400);
      }

      const data = await documentService.delete(req.params);

      res.status(200).json({
        message: "Delete Document Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = documentController;
