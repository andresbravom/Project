// import { ObjectID } from "mongodb";

// const Subroute = {
//   segments: async (parent, args, ctx, info) => {
//     const subrouteID = ObjectID(parent._id);
//     const { client } = ctx;

//     const db = client.db("DataBase");
//     const collection = db.collection("Subroutes");

//     const result = await collection.find({ subroute: subrouteID }).toArray();
//     return result;
//   },
// //   values: async (parent, args, ctx, info) => {
// //     const streetID = ObjectID(parent._id);
// //     const { client } = ctx;

// //     const db = client.db("DataBase");
// //     const collection = db.collection("Values");

// //     const result = await collection.find({ street: streetID }).toArray();
// //     return result;
// //   },
// };
// export { Subroute as default };
 