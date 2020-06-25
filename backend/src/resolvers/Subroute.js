import { ObjectID } from "mongodb";

const Subroute = {
  route: async (parent, args, ctx, info) => {
    const RouteID = ObjectID(parent._id);
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Routes");

    const result = await collection.findOne({ route: RouteID });
    return result;
  },
//   values: async (parent, args, ctx, info) => {
//     const streetID = ObjectID(parent._id);
//     const { client } = ctx;

//     const db = client.db("DataBase");
//     const collection = db.collection("Values");

//     const result = await collection.find({ street: streetID }).toArray();
//     return result;
//   },
};
export { Subroute as default };
 