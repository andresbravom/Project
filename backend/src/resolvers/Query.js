import { ObjectID } from "mongodb";

function O1 (p , Cd, A, M, G, fr, v, t) {
    let energyConsumed =
      (1 / 2) * p * Cd * A * Math.pow(v, 3) * t + M * G * v * t * fr;
    
    energyConsumed = energyConsumed * 0.00027777777777778;

    // energyConsumed = energyConsumed.toFixed(2);
    return energyConsumed;
}
function O2Acceleration (p , Cd, A, M, G, fr, v, t, a, alfa) {
  const ebreak1 = (M / 2) * (Math.pow(v - a * t, 2) - Math.pow(v, 2));
      const ebreak2 =
        (p * Cd * A * (Math.pow(v - a * t, 4) - Math.pow(v, 4))) / (-8 * a);
      const ebreak3 = (M * G * fr) * (Math.pow(v - a * t, 2) - Math.pow(v, 2)) / (-2 * a);

      //Energy in braking
      let energyBraking = ebreak1 + ebreak2 + ebreak3;

      //Energy recovered in braking
      let energyRecoveredInBraking = alfa * energyBraking;
      energyRecoveredInBraking = energyRecoveredInBraking.toFixed(2);

      const eacc1 = (M * (Math.pow(a * t, 2))) / 2;
      const eacc2 = (p * Cd * A * (Math.pow(a * t, 4))) / (8 * a);
      const eacc3 = (M * G * fr * (Math.pow(a * t, 2))) / (2 * a);

      //Energy in accelration
      let energyAcceleration = eacc1 + eacc2 + eacc3;

      let energyConsumed = energyAcceleration + alfa * energyBraking;
      energyConsumed = energyConsumed * 0.00027777777777778;

      return energyConsumed;
}
function O2Braking (p , Cd, A, M, G, fr, v, t, a, alfa) {
  const ebreak1 = (M / 2) * (Math.pow(v - a * t, 2) - Math.pow(v, 2));
      const ebreak2 =
        (p * Cd * A * (Math.pow(v - a * t, 4) - Math.pow(v, 4))) / (-8 * a);
      const ebreak3 = (M * G * fr) * (Math.pow(v - a * t, 2) - Math.pow(v, 2)) / (-2 * a);

      //Energy in braking
      let energyBraking = ebreak1 + ebreak2 + ebreak3;

      //Energy recovered in braking
      let energyRecoveredInBraking = alfa * energyBraking;
      energyRecoveredInBraking = energyRecoveredInBraking * 0.00027777777777778;

      return energyRecoveredInBraking;
}
const Query = {
  getStreetID: async (parent, args, ctx, info) => {
    const { _id } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Streets");

    const result = await collection.findOne({ _id: ObjectID(_id) });

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getIntersectionID: async (parent, args, ctx, info) => {
    const { _id } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Intersections");

    const result = await collection.find({ _id: ObjectID(_id) }).toArray();

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getSegmentID: async (parent, args, ctx, info) => {
    const { _id } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Segments");

    const result = await collection.find({ _id: ObjectID(_id) }).toArray();

    if (result) {
      return result;
    } else {
      return new Error("There are no segments");
    }
  },
  getSignalID: async (parent, args, ctx, info) => {
    const { _id } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Signals");

    const result = await collection.find({ _id: ObjectID(_id) }).toArray();

    if (result) {
      return result;
    } else {
      return new Error("There are no Signals");
    }
  },
  getStreet: async (parent, args, ctx, info) => {
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Streets");

    const result = await collection.find({}).toArray();

    if (result) {
      return result;
    } else {
      return new Error("There are no Streets");
    }
  },
  getIntersection: async (parent, args, ctx, info) => {
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Intersections");

    const result = await collection.find({}).toArray();

    if (result) {
      return result;
    } else {
      return new Error("There are no Values");
    }
  },
  getSegment: async (parent, args, ctx, info) => {
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Segments");

    const result = await collection.find({}).toArray();

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getSignal: async (parent, args, ctx, info) => {
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Signals");

    const result = await collection.find({}).toArray();

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getValues: async (parent, args, ctx, info) => {
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Values");

    const result = await collection.find({}).toArray();

    if (result) {
      return result;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getO1: async (parent, args, ctx, info) => {

    const { street, values } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionStreet = db.collection("Streets");
    const collectionValues = db.collection("Values");

    const resultStreet = await collectionStreet.findOne({
      _id: ObjectID(street),
    });
    const resultValues = await collectionValues.findOne({
      _id: ObjectID(values),
    });

    if (resultStreet && resultValues) {
      const a = resultValues.a;
      const p = resultValues.p;
      const Cd = resultValues.Cd;
      const A = resultValues.A;
      let v = resultStreet.speed * (5 / 18);
      v = v.toFixed(2);
      let t = (0 - v) / -a;
      t = t.toFixed(1);
      const M = resultValues.M;
      const G = resultValues.G;
      const fr = resultValues.fr;

      let energyConsumed =
        (1 / 2) * p * Cd * A * Math.pow(v, 3) * t + M * G * v * t * fr;
      console.log(energyConsumed);
      energyConsumed = energyConsumed * 0.00027777777777778;

      return energyConsumed;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getO2Acceleration: async (parent, args, ctx, info) => {
    const { street, values } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionStreet = db.collection("Streets");
    const collectionValues = db.collection("Values");

    const resultStreet = await collectionStreet.findOne({
      _id: ObjectID(street),
    });
    const resultValues = await collectionValues.findOne({
      _id: ObjectID(values),
    });

    if (resultStreet && resultValues) {
      const a = resultValues.a;
      const p = resultValues.p;
      const Cd = resultValues.Cd;
      const A = resultValues.A;
      const G = resultValues.G;
      const fr = resultValues.fr;
      const alfa = resultValues.alfa;
      let v = resultStreet.speed * (5 / 18);
      v = v.toFixed(2);
      let t = (0 - v) / -a;
      t = t.toFixed(1);
      const M = resultValues.M;

      const ebreak1 = (M / 2) * (Math.pow(v - a * t, 2) - Math.pow(v, 2));
      const ebreak2 =
        (p * Cd * A * (Math.pow(v - a * t, 4) - Math.pow(v, 4))) / (-8 * a);
      const ebreak3 = (M * G * fr) * (Math.pow(v - a * t, 2) - Math.pow(v, 2)) / (-2 * a);

      //Energy in braking
      let energyBraking = ebreak1 + ebreak2 + ebreak3;

      const eacc1 = (M * (Math.pow(a * t, 2))) / 2;
      const eacc2 = (p * Cd * A * (Math.pow(a * t, 4))) / (8 * a);
      const eacc3 = (M * G * fr * (Math.pow(a * t, 2))) / (2 * a);

      //Energy in accelration
      let energyAcceleration = eacc1 + eacc2 + eacc3;

      let energyConsumed = energyAcceleration + alfa * energyBraking;
      energyConsumed = energyConsumed * 0.00027777777777778;

      return energyConsumed;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getO2Braking: async (parent, args, ctx, info) => {
    const { street, values } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionStreet = db.collection("Streets");
    const collectionValues = db.collection("Values");

    const resultStreet = await collectionStreet.findOne({
      _id: ObjectID(street),
    });
    const resultValues = await collectionValues.findOne({
      _id: ObjectID(values),
    });

    if (resultStreet && resultValues) {
      const a = resultValues.a;
      const p = resultValues.p;
      const Cd = resultValues.Cd;
      const A = resultValues.A;
      const G = resultValues.G;
      const fr = resultValues.fr;
      const alfa = resultValues.alfa;
      let v = resultStreet.speed * (5 / 18);
      v = v.toFixed(2);
      let t = (0 - v) / -a;
      t = t.toFixed(1);
      const M = resultValues.M;

      const ebreak1 = (M / 2) * (Math.pow(v - a * t, 2) - Math.pow(v, 2));
      const ebreak2 =
        (p * Cd * A * (Math.pow(v - a * t, 4) - Math.pow(v, 4))) / (-8 * a);
      const ebreak3 = (M * G * fr) * (Math.pow(v - a * t, 2) - Math.pow(v, 2)) / (-2 * a);

      //Energy in braking
      let energyBraking = ebreak1 + ebreak2 + ebreak3;

      //Energy recovered in braking
      energyBraking = energyBraking * alfa;

      energyBraking = energyBraking * 0.00027777777777778;

      return energyBraking;
    } else {
      return new Error("Insert correct ID");
    }
  },
  getCalcules: async (parent, args, ctx, info) => {
    const { street, values } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionStreet = db.collection("Streets");
    const collectionValues = db.collection("Values");
    const collectionSegments = db.collection("Segments");
    const collectionSignals = db.collection("Signals");

    const resultStreet = await collectionStreet.findOne({
      _id: ObjectID(street),
    });
    const resultValues = await collectionValues.findOne({
      _id: ObjectID(values),
    });

    let energyO1 = 0;
    let energyO2Acceleration = 0;
    let energyO2Braking = 0;
    let totalEnergy = 0;
  
    if(resultStreet && resultValues) {
      const result = await collectionSegments
        .find({ street: ObjectID(street) })
        .toArray();

      let filterSignal = await result.find((obj) => obj.signal != 0);

      const lengthArraySignal = filterSignal.signal.length;
      
      //QUEDA PENDIENTE VER MAS DE UNA SEÑAL Y PONER LAS DOS CON PROBABILIDAD 1 Y VER SI SUMA LA ENERGIA EN LA CALLE
      console.log(lengthArraySignal);
      for(let i= 1; i<lengthArraySignal; i += 1){
        const resultSignal = await collectionSignals
        .findOne({ _id: ObjectID(filterSignal.signal[i]) });

        console.log(resultSignal.location);
      }
      
      // console.log(filterSignal);
      // console.log(filterSignal.signal.length); 

      const resultSignal = await collectionSignals
        .findOne({ _id: ObjectID(filterSignal.signal[0]) });

        console.log(resultSignal.location);

      const a = resultValues.a;
      const p = resultValues.p;
      const Cd = resultValues.Cd;        
      const A = resultValues.A;
      const alfa = resultValues.alfa;
      let v = resultStreet.speed * (5 / 18);
      v = v.toFixed(2);
      let t = (0 - v) / - a;
      t = t.toFixed(1);
      const M = resultValues.M;
      const G = resultValues.G;
      const fr = resultValues.fr;

      energyO1 = O1 (p , Cd, A, M, G, fr, v, t);
      energyO2Acceleration = O2Acceleration (p , Cd, A, M, G, fr, v, t, a, alfa);
      energyO2Braking = O2Braking (p , Cd, A, M, G, fr, v, t, a, alfa);

      for (let i = 0; i < result.length; i += 1) {
        if (i === 0 )  {
          totalEnergy = totalEnergy + energyO2Acceleration;
          console.log(totalEnergy);
        }else if(i === result.length - 1){
          totalEnergy = totalEnergy + energyO2Braking;
          console.log(totalEnergy);
        }else{
          totalEnergy = totalEnergy + energyO1;
          console.log(totalEnergy);
        }
      }
      return totalEnergy;
    }else {
      return new Error("Insert correct ID");
    }
  }

  // getCalcule: async (parent, args, ctx, info) => {
  //   const { street } = args;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Segments");

  //   const result = await collection
  //     .find({ street: ObjectID(street) })
  //     .toArray();

  //   let energy = 0;
  //   let total = 0;
  //   if (result) {
  //     let calculeGeneral = 0;
  //     let calculeSpecific = 0;
  //     const signals = result.map((obj) => obj);
  //     const filterSignal = result.filter((obj) => obj.signal != 0);

  //     console.log("Jo: " + result.length);

  //     for (let i = 0; i < result.length; i += 1) {
  //       if (i === 0 || i === result.length - 1) {
  //         energy = 33.72;
  //         total = total + energy;
  //         console.log("total: " + total + i);
  //       } else {
  //         energy = 4.11;
  //         total = total + energy;
  //         console.log("total: " + total + i);
  //       }
  //     }
  //     console.log("total Final: " + total);

      // const lengthGeneral = signals.length;
      // const lengthSpecific = filterSignal.length;

      // calculeGeneral = (lengthGeneral - lengthSpecific) * 2;
      // calculeSpecific = lengthSpecific * 1;

      // const numberSegmentsConstantValue = result.length - lengthSpecific;

      // console.log("Por: " + numberSegmentsConstantValue);

      // const r = calculeGeneral + calculeSpecific;

      // console.log(lengthGeneral);
      // console.log(r);

  //     return total;
  //   } else {
  //     null;
  //   }
  // },
};
export { Query as default };