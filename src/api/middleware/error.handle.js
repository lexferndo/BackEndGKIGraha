const errorResponse = require("./error.response");

const errorHandle = (err, req, res, next) => {
  if (err instanceof errorResponse) {
    res.status(err.statusCode).json({ message: err.message });
  } else if (err.name === "TokenExpiredError") {
    res.status(401).json({ message: "Unauthorized" });
  } else if (err.name === "PrismaClientValidationError") {
    res.status(400).json({
      message:
        "Validation error in Prisma. Please review the input data provided.",
    });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = errorHandle;
