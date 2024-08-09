const userService = require("../services/user.services");
const errorResponse = require("../middleware/error.response");
const { generateToken } = require("../../lib/jwt");
const bcrypt = require("bcrypt");

class userController {
  static loginUser = async (req, res, next) => {
    try {
      const existingData = await userService.findAll(req.body);

      if (!existingData[0]) {
        throw new errorResponse("Invalid Username", 400);
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        existingData[0].password,
      );

      if (!isPasswordValid) {
        throw new errorResponse("Invalid Password", 400);
      }

      const isValid = generateToken(existingData[0]);
      res.status(200).json({
        message: "Login Successfully",
        token: isValid,
      });
    } catch (error) {
      next(error);
    }
  };

  static registerUser = async (req, res, next) => {
    try {
      if (
        !req.body.name ||
        !req.body.username ||
        !req.body.password ||
        !req.body.role
      ) {
        throw new errorResponse("Missing some arguments", 400);
      }

      const existingData = await userService.findAll(req.body);

      if (existingData[0]) {
        throw new errorResponse("Username has been Already", 400);
      }

      const data = await userService.create(req.body);
      res.status(201).json({
        message: "Register User Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static getAllUsers = async (req, res, next) => {
    try {
      const data = await userService.findAll(req.query);
      res.status(200).json({
        message: "Get All Users Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static getOneUser = async (req, res, next) => {
    try {
      const data = await userService.findOne(req.params);
      res.status(200).json({
        message: "Get One User Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static updateUser = async (req, res, next) => {
    try {
      if (
        !req.body.name ||
        !req.body.username ||
        !req.body.password ||
        !req.body.role
      ) {
        throw new errorResponse("Missing some arguments", 400);
      }

      const { id } = req.params;
      const existingData = await userService.findOne({ id });

      if (!existingData) {
        throw new errorResponse("Data Not Found", 400);
      }

      const data = await userService.update(req.params, req.body);
      res.status(200).json({
        message: "Updated User Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const data = await userService.delete(req.params);

      res.status(200).json({
        message: "Delete User Successfully",
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = userController;
