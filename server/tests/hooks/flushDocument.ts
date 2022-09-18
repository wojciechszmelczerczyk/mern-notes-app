import { dbDisconnect } from "../../db/connection";

export default async (collection) => {
  await collection.findOneAndDelete({ sort: { _id: -1 } });
  await dbDisconnect();
};
