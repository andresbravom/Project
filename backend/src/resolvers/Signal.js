import { ObjectID } from "mongodb";

const Signal = {
  segment: async (parent, args, ctx, info) => {
    const segmentID = ObjectID(parent._id);
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Segments");

    const result = await collection.find({ signal: segmentID }).toArray();

    return result;
  },
};

export { Signal as default };
