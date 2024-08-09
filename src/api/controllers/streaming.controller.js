const streamingService = require("../services/streaming.services");
const errorResponse = require("../middleware/error.response");

class streamingController {
  static findOne = async (req, res, next) => {
    try {
      const data = await streamingService.findOne(req.params);

      if (!data) {
        throw new errorResponse("Data Not Found", 400);
      }

      res.status(200).json({
        message: "Get One Streaming Successfully!",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { title, embed, publish } = req.body;

      if (!title || !embed || publish === undefined) {
        throw new errorResponse("Missing some input!", 400);
      }

      const data = await streamingService.update(req.params, {
        title,
        embed,
        publish,
      });

      res.status(200).json({
        message: "Updated Streaming Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = streamingController;
