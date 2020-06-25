import { ObjectID } from "mongodb";

const Route = {
  subroutes: async (parent, args, ctx, info) => {
    const routeID = ObjectID(parent._id);
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Subroutes");

    const result = await collection.find({ route: routeID }).toArray();
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
export { Route as default };
