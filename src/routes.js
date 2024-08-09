const router = require("express").Router();
const express = require("express");

const RUser = require("./api/routes/user.route");
const CRUDActivity = require("./api/routes/activity.route");
const CRUDDocument = require("./api/routes/document.route");
const RUStreaming = require("./api/routes/streaming.route");

const { authToken } = require("./api/middleware/authToken");

router.use("/upload/images", express.static("upload/images"));
router.use("/upload/documents", express.static("upload/documents"));

router.use("/api/user", RUser);
router.use("/api/activity", authToken, CRUDActivity);
router.use("/api/document", authToken, CRUDDocument);
router.use("/api/streaming", authToken, RUStreaming);

module.exports = router;
