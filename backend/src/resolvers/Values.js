import { ObjectID } from "mongodb";

const Values = {
  street: async (parent, args, ctx, info) => {
    const streetID = parent.street;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Streets");

    const result = await collection.findOne({ _id: ObjectID(streetID) });

    return result;
  },
};

export { Values as default };