import { ObjectID } from "mongodb";

const Street = {
  segment: async (parent, args, ctx, info) => {
    const streetID = ObjectID(parent._id);
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Segments");

    const result = await collection.find({ street: streetID }).toArray();
    console;
    return result;
  },
};
export { Street as default };
