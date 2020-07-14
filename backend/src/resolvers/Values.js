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

// getO1: async (parent, args, ctx, info) => {
//   const { street, values } = args;
//   const { client } = ctx;

//   const db = client.db("DataBase");
//   const collectionStreet = db.collection("Streets");
//   const collectionValues = db.collection("Values");

//   const resultStreet = await collectionStreet.findOne({
//     _id: ObjectID(street),
//   });
//   const resultValues = await collectionValues.findOne({
//     _id: ObjectID(values),
//   });

//   if (resultStreet && resultValues) {
//     const v0 = 0;
//     const a = resultValues.a;
//     const p = resultValues.p;
//     const Cd = resultValues.Cd;
//     const A = resultValues.A;
//     const v = resultStreet.speed * (5 / 18);
//     const t = (v - v0) / a;
//     const M = resultValues.M;
//     const G = resultValues.G;
//     const fr = resultValues.fr;

//     let energyConsumed =
//       (1 / 2) * p * Cd * A * Math.pow(v, 3) * t + M * G * v * t * fr;
//     console.log(energyConsumed);
//     energyConsumed = energyConsumed * 0.00027777777777778;

//     return energyConsumed;
//   } else {
//     return new Error("Insert correct ID");
//   }
// },




// addProbability: async(parent, args, ctx, info) => {
//   const { subroute, probability } = args;
//   const { client } = ctx;

//   const db  = client.db("DataBase");
//   const collectionSubroutes = db.collection("Subroutes");
//   const collectionSegments = db.collection("SegmentsSubroutes");

//   const resultSubroute = await collectionSubroutes.findOne({
//     _id: ObjectID(subroute),
//   });

//   if(resultSubroute) {
//     const resultProbaility = await collectionSegments.find({subroute: ObjectID(subroute)}).toArray();

//     const arrayProbabilities = resultProbaility.map(obj => (obj._id));
    
//     for(let i=0; i<arrayProbabilities.length; i += 1){
//       const result = await collectionSegments.findOneAndUpdate(
//         { _id: ObjectID(arrayProbabilities[i]) },
//         { $set: {probability: probability[i]} },
//       );
//     }
//     return resultSubroute
//   }else {
//     return new Error("Insert correct ID");
//   }
// },
