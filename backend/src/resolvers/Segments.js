import { ObjectID } from "mongodb";

const Segments = {
  subroute: async (parent, args, ctx, info) => {
    const subrouteID = parent.subroute;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Subroutes");

    const result = await collection.findOne({ _id: ObjectID(subrouteID) });

    return result;
  },
};
export { Segments as default };