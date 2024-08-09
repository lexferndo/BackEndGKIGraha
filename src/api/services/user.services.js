const prisma = require("../../lib/prisma");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

class userService {
  static findAll = async (params) => {
    try {
      const filterOptions = {
        where: {},
      };

      const { username, role, phone, email, name } = params;

      if (username) {
        filterOptions.where.username = username.toLowerCase();
      }

      if (role) {
        filterOptions.where.role = role.toLowerCase();
      }

      if (phone) {
        filterOptions.where.phone = phone.toLowerCase();
      }

      if (email) {
        filterOptions.where.email = email.toLowerCase();
      }

      if (name) {
        filterOptions.where.name = name.toLowerCase();
      }

      const data = await prisma.user.findMany(filterOptions);

      return data;
    } catch (error) {
      throw error;
    }
  };

  static findOne = async (params) => {
    try {
      const { id } = params;

      const data = await prisma.user.findUnique({
        where: {
          id: +id,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  static create = async (params) => {
    try {
      const { name, email, username, password, phone, role } = params;
      const hashPassword = bcrypt.hashSync(password, salt);

      let payload = {
        name,
        email,
        username,
        password: hashPassword,
        phone,
        role,
      };

      const data = await prisma.user.create({
        data: payload,
      });

      return data;
    } catch (error) {
      throw error;
    }
  };

  static update = async (pathParams, params) => {
    try {
      const { id } = pathParams;
      const existingData = prisma.user.findUnique({
        where: {
          id: +id,
        },
      });

      const { name, email, password, phone, role } = params;
      const hashPassword = bcrypt.hashSync(password, salt);

      const data = await prisma.user.update({
        where: {
          id: +id,
        },
        data: {
          name: name || existingData.name,
          email: email || existingData.email,
          username: existingData.username,
          password: hashPassword || existingData.password,
          phone: phone || existingData.phone,
          role: role || existingData.role,
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
      const data = await prisma.user.delete({
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

module.exports = userService;
