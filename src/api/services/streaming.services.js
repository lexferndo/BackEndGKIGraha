const prisma = require("../../lib/prisma");

class streamingService {
  static findOne = async (params) => {
    try {
      const { id } = params;

      const data = await prisma.streaming.findUnique({
        where: {
          id: +id,
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  };

  static update = async (pathParams, params) => {
    try {
      const { id } = pathParams;

      const { title, embed, publish } = params;

      const data = await prisma.streaming.update({
        where: {
          id: +id,
        },
        data: {
          title,
          embed,
          publish: Boolean(publish),
        },
      });

      return data;
    } catch (error) {
      return error;
    }
  };
}

module.exports = streamingService;
