import { ObjectID } from "mongodb";

const Subroute = {
  route: async (parent, args, ctx, info) => {
    const subrouteID = parent.route;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Routes");

    const result = await collection.findOne({ _id: ObjectID(subrouteID)});
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
 