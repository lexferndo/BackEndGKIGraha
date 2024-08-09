const prisma = require("../../lib/prisma");

class activityService {
  static findAll = async (params) => {
    try {
      const filterOptions = {
        where: {},
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      };

      const { komisi_id } = params;

      if (komisi_id) {
        filterOptions.where.komisi_id = parseInt(komisi_id);
      }

      const data = await prisma.activity.findMany(filterOptions);
      return data;
    } catch (error) {
      throw error;
    }
  };

  static findOne = async (params) => {
    try {
      const { id } = params;

      const data = await prisma.activity.findUnique({
        where: {
          id: +id,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  static create = async (params) => {
    try {
      const {
        title,
        description,
        start_at,
        end_at,
        place,
        url_image,
        url_form,
        user_id,
      } = params;

      const convertStartAt = new Date(start_at).getTime();
      const convertEndAt = new Date(end_at).getTime();

      const data = await prisma.activity.create({
        data: {
          title,
          description,
          start_at: convertStartAt,
          end_at: convertEndAt,
          place,
          url_image,
          url_form,
          user_id: +user_id,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  static update = async (pathParams, params, imageFileName) => {
    try {
      const { id } = pathParams;
      const { title, description, start_at, end_at, place, url_form, user_id } =
        params;

      const convertStartAt = new Date(start_at).getTime();
      const convertEndAt = new Date(end_at).getTime();

      const data = await prisma.activity.update({
        where: {
          id: +id,
        },
        data: {
          title,
          description,
          start_at: convertStartAt,
          end_at: convertEndAt,
          place,
          url_image: imageFileName,
          url_form,
          user_id: +user_id,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  static delete = async (params) => {
    try {
      const { id } = params;
      const data = await prisma.activity.delete({
        where: {
          id: +id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };
}

module.exports = activityService;
