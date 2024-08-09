const activityService = require("../services/activity.services");
const errorResponse = require("../middleware/error.response");
const {
  handleObjectData,
  handleArrayData,
} = require("../../lib/handle.bigInt");

class activityController {
  static findAll = async (req, res, next) => {
    try {
      const data = await activityService.findAll(req.query);

      res.status(200).json({
        message: "Get All Activity Successfully!",
        data: handleArrayData(data),
      });
    } catch (error) {
      next(error);
    }
  };

  static findOne = async (req, res, next) => {
    try {
      const data = await activityService.findOne(req.params);

      if (!data) {
        throw new errorResponse("Data Not Found", 400);
      }

      res.status(200).json({
        message: "Get One Activity Successfully!",
        data: handleObjectData(data),
      });
    } catch (error) {
      next(error);
    }
  };

  static create = async (req, res, next) => {
    try {
      const { title, description, start_at, end_at, place, url_form, user_id } =
        req.body;

      if (
        !title ||
        !description ||
        !start_at ||
        !end_at ||
        !place ||
        !user_id
      ) {
        throw new errorResponse("Missing some arguments", 400);
      }

      const url_image = req.file ? req.file.path : null;

      const data = await activityService.create({
        title,
        description,
        start_at,
        end_at,
        place,
        url_image,
        url_form,
        user_id,
      });

      res.status(201).json({
        message: "Create New Activity Successfully!",
        data: handleObjectData(data),
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const existingData = await activityService.findOne(req.params);

      if (!existingData) {
        throw new errorResponse("Data Not Found", 400);
      }

      const { title, description, start_at, end_at, place, url_form, user_id } =
        req.body;

      if (
        !title ||
        !description ||
        !start_at ||
        !end_at ||
        !place ||
        !user_id
      ) {
        throw new errorResponse("Missing some arguments", 400);
      }

      const url_image = req.file ? req.file.path : existingData.url_image;

      const data = await activityService.update(
        req.params,
        req.body,
        url_image,
      );

      res.status(200).json({
        message: "Updated Activity Successfully!",
        data: handleObjectData(data),
      });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const existingData = await activityService.findOne(req.params);

      if (!existingData) {
        throw new errorResponse("Data Not Found", 400);
      }

      const data = await activityService.delete(req.params);

      res.status(200).json({
        message: "Delete Activity Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = activityController;
