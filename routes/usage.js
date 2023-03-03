const express = require("express");
const router = express.Router();

const Usage = require("../models/Usage");

function isEmptyObject(obj) {
  var name;
  for (name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

// @route   GET /usage
// @desc    Retrieve usage stats of selected Pokemon
// @access  Public
router.get("/", async (req, res) => {
  try {
    mon = req.query.pokemon;
    format = req.query.format

    if (!isEmptyObject(mon)) {
      const pokemonUsage = await Usage.find({
        pokemon: mon.toLowerCase(),
        format: format
      }).sort({ date: 1 });
      res.json(pokemonUsage);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
