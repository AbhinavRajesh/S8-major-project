const express = require("express");
const { ping } = require("../../controllers/api");

const router = express.Router();

router.get("/_ping", ping);

module.exports = router;
