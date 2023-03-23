const e = require("express");

const ping = (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "pong",
  });
};

module.exports = { ping };
