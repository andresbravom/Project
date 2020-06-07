import { ObjectID } from "mongodb";

const Street = {
  segment: async (parent, args, ctx, info) => {
    const streetID = ObjectID(parent._id);
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Segments");

    const result = await collection.find({ street: streetID }).toArray();
    return result;
  },
  values: async (parent, args, ctx, info) => {
    const streetID = ObjectID(parent._id);
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Values");

    const result = await collection.find({ street: streetID }).toArray();
    return result;
  },
};
export { Street as default };
