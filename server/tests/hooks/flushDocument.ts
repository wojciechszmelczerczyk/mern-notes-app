const { dbDisconnect } = require("../../db/connection");
module.exports = async (collection) => {
  await collection.findOneAndDelete({ sort: { _id: -1 } });
  await dbDisconnect();
};
