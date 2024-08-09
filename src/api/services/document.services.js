const prisma = require("../../lib/prisma");

class documentService {
  static findAll = async (params) => {
    try {
      const { name, type, page, limit } = params;
      const skip = (parseInt(page) - 1) * parseInt(limit);

      const filterOptions = {
        take: parseInt(limit),
        skip: skip,
        where: {},
        orderBy: {
          id: "desc",
        },
      };

      if (name) {
        filterOptions.where.name = {
          contains: name.toLowerCase(),
          mode: "insensitive",
        };
      }

      if (type) {
        filterOptions.where.type = {
          contains: type.toLowerCase(),
          mode: "insensitive",
        };
      }

      const totalData = await prisma.document.count({
        where: filterOptions.where,
      });

      const totalPage = Math.ceil(totalData / limit);

      const data = await prisma.document.findMany(filterOptions);

      return { data, totalData, totalPage };
    } catch (error) {
      throw error;
    }
  };

  static findOne = async (params) => {
    try {
      const { id } = params;

      const data = await prisma.document.findUnique({
        where: {
          id: +id,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  static create = async (params, documentFileName) => {
    try {
      const { name, type } = params;

      const data = await prisma.document.create({
        data: {
          name,
          type,
          url_file: documentFileName.path,
        },
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  static update = async (pathParams, params, documentFileName) => {
    try {
      const { id } = pathParams;
      const { name, type } = params;

      const data = await prisma.document.update({
        where: {
          id: +id,
        },
        data: {
          name,
          type,
          url_file: documentFileName.path,
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
      const data = await prisma.document.delete({
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

module.exports = documentService;
