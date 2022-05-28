const User = require("../../models/User");
const { dbDisconnect } = require("../../db/connection");
module.exports = async () => {
  await User.findOneAndDelete({ sort: { _id: -1 } });
  await dbDisconnect();
};
