const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    date: Date,
    users: [
      {
        rank: Number,
        website_rank: Number,
        username: String,
        team: [
          {
            name: String,
            item: String,
            ability: String,
            level: Number,
            tera_type: String,
            move_1: String,
            move_2: String,
            move_3: String,
            move_4: String,
          }
        ],
        team_sheet: Boolean,
        replay_url: String,
        rating: Number,
        upload_date: String
      }
    ],
    format: String,
    usage: [
      {
        mon: String,
        freq: Number,
        percent: Number
      }
    ]
  },
  {
    collection: "teams_test"
  }
);

module.exports = Team = mongoose.model("team", TeamSchema);
