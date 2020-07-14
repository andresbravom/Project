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

// getO2Acceleration: async (parent, args, ctx, info) => {
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
//     const G = resultValues.G;
//     const fr = resultValues.fr;
//     const alfa = resultValues.alfa;
//     const v = resultStreet.speed * (5 / 18);
//     const t = (v - v0) / a;
//     const M = resultValues.M;

//     const ebreak1 = (M / 2) * (Math.pow(v - a * t, 2) - Math.pow(v, 2));
//     const ebreak2 =
//       (p * Cd * A * (Math.pow(v - a * t, 4) - Math.pow(v, 4))) / (-8 * a);
//     const ebreak3 =
//       (M * G * fr * (Math.pow(v - a * t, 2) - Math.pow(v, 2))) / (-2 * a);

//     //Energy in braking
//     let energyBraking = ebreak1 + ebreak2 + ebreak3;

//     const eacc1 = (M * Math.pow(a * t, 2)) / 2;
//     const eacc2 = (p * Cd * A * Math.pow(a * t, 4)) / (8 * a);
//     const eacc3 = (M * G * fr * Math.pow(a * t, 2)) / (2 * a);

//     //Energy in accelration
//     let energyAcceleration = eacc1 + eacc2 + eacc3;

//     let energyConsumed = energyAcceleration + alfa * energyBraking;
//     energyConsumed = energyConsumed * 0.00027777777777778;

//     return energyConsumed;
//   } else {
//     return new Error("Insert correct ID");
//   }
// },
// getO2Braking: async (parent, args, ctx, info) => {
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
//     const G = resultValues.G;
//     const fr = resultValues.fr;
//     const alfa = resultValues.alfa;
//     const v = resultStreet.speed * (5 / 18);
//     const t = (v - v0) / a;
//     const M = resultValues.M;

//     const ebreak1 = (M / 2) * (Math.pow(v - a * t, 2) - Math.pow(v, 2));
//     const ebreak2 =
//       (p * Cd * A * (Math.pow(v - a * t, 4) - Math.pow(v, 4))) / (-8 * a);
//     const ebreak3 =
//       (M * G * fr * (Math.pow(v - a * t, 2) - Math.pow(v, 2))) / (-2 * a);

//     //Energy in braking
//     let energyBraking = ebreak1 + ebreak2 + ebreak3;

//     //Energy recovered in braking
//     energyBraking = energyBraking * alfa;

//     energyBraking = energyBraking * 0.00027777777777778;

//     return energyBraking;
//   } else {
//     return new Error("Insert correct ID");
//   }
// },