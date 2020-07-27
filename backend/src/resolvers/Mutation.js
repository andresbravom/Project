import { ObjectID } from "mongodb";

function lenghtSegments(speed) {
  const a = 3.9;
  const v0 = 0;
  const v = speed * (5 / 18);
  const t = (v - v0) / a;
  var s = (v * t - (1 / 2) * a * (t * t)) * 2;

  return Math.ceil(s);
}

// function O1(p, Cd, A, v, M, g, fr) {
//   const a = 3.9;
//   const vi = 0;
//   const v0 = speed * (5 / 18);
//   const t = (vi - v0) / -a;

//   const energyConsumed =
//     (1 / 2) * p * Cd * A * Math.pow(v, 3) * t * M * g * v * t * fr;

//   return energyConsumed;
// }

const Mutation = {
  addRoute: async (parent, args, ctx, info) => {
    const { name } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Routes");

    const result = await collection.insertOne({ name, O3: 0 });
    return result.ops[0];
  },
  addSubroute: async (parent, args, ctx, info) => {
    const { route, name, lenght, speed } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionSubroutes = db.collection("Subroutes");
    const collectionRoutes = db.collection("Routes");

    const resultRoute = await collectionRoutes.findOne({
      _id: ObjectID(route),
    });

    if (resultRoute) {
      const result = await collectionSubroutes.insertOne({
        route: ObjectID(route),
        name,
        lenght,
        speed,
      });
      return result.ops[0];
    } else {
      return new Error("Insert correct ID");
    }
  },
  addSegments: async (parent, args, ctx, info) => {
    const { subroute } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionSubroutes = db.collection("Subroutes");
    const collectionSegments = db.collection("SegmentsSubroutes");

    const resultStreet = await collectionSubroutes.findOne({
      _id: ObjectID(subroute),
    });

    if (resultStreet) {
      const speedSubroute = resultStreet.speed;
      const lenghtSegment = lenghtSegments(speedSubroute);
      let index = 0;
      let array = [];

      //Subroute size less than segment size
      if (resultStreet.lenght < lenghtSegment) {
        const resultSegment = await collectionSegments.insertOne({
          subroute: ObjectID(subroute),
          lenghtSegment: resultStreet.lenght,
          index: index + 1,
          probability: 0,
          O: "O",
          OValues: 0.0,
        });
        return resultSegment.ops[0];
      } else {
        for (let i = 0; i < resultStreet.lenght; i += lenghtSegment) {
          index = index + 1;
          if (i + lenghtSegment > resultStreet.lenght) {
            const newLenght = resultStreet.lenght - i;
            let lenghtSegment = newLenght;
            array = [
              ...array,
              new Promise((resolve, reject) => {
                const obj = collectionSegments.insertOne({
                  subroute: ObjectID(subroute),
                  lenghtSegment,
                  index,
                  probability: 0,
                  O: "O",
                  OValues: 0.0,
                });
                resolve(obj);
              }),
            ];
          } else {
            array = [
              ...array,
              new Promise((resolve, reject) => {
                const obj = collectionSegments.insertOne({
                  subroute: ObjectID(subroute),
                  lenghtSegment: lenghtSegment,
                  index: index,
                  probability: 0,
                  O: "O",
                  OValues: 0.0,
                });
                resolve(obj);
              }),
            ];
          }
        }
        (async function () {
          await Promise.all(array);
        })();
        return resultStreet;
      }
    } else {
      return new Error("Insert correct ID");
    }
  },
  addProbability: async (parent, args, ctx, info) => {
    const { subroute, probability } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionSubroutes = db.collection("Subroutes");
    const collectionSegments = db.collection("SegmentsSubroutes");

    const resultSubroute = await collectionSubroutes.findOne({
      _id: ObjectID(subroute),
    });
    const resultProbability = await collectionSegments
      .find({ subroute: ObjectID(subroute) })
      .toArray();

    if (resultSubroute) {
      const arrayProbabilities = resultProbability.map((obj) => obj._id);

      for (let i = 0; i < arrayProbabilities.length; i += 1) {
        const result = await collectionSegments.findOneAndUpdate(
          { _id: ObjectID(arrayProbabilities[i]) },
          { $set: { probability: probability[i] } }
        );
      }
      return resultSubroute;
    } else {
      return new Error("Insert correct ID");
    }
  },
  addVehicleValues: async (parent, args, ctx, info) => {
    const { p, Cd, A, M, G, fr, a, alpha } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("VehicleValues");

    const result = await collection.insertOne({
      p,
      Cd,
      A,
      M,
      G,
      fr,
      a,
      alpha,
    });
    return result.ops[0];
  },
  addOValues: async (parent, args, ctx, info) => {
    const { route, vehicleValues } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionRoute = db.collection("Routes");
    const collectionSubroutes = db.collection("Subroutes");
    const collectionSegments = db.collection("SegmentsSubroutes");
    const collectionVehiclesValues = db.collection("VehicleValues");

    const resultRoute = await collectionRoute.findOne({
      _id: ObjectID(route),
    });
    const resultVehicleValues = await collectionVehiclesValues.findOne({
      _id: ObjectID(vehicleValues),
    });

    const v0 = 0;
    const a = resultVehicleValues.a;
    const p = resultVehicleValues.p;
    const Cd = resultVehicleValues.Cd;
    const A = resultVehicleValues.A;
    const M = resultVehicleValues.M;
    const G = resultVehicleValues.G;
    const fr = resultVehicleValues.fr;
    const alpha = resultVehicleValues.alpha;

    if (resultRoute && resultVehicleValues) {
      const resultSubroutes = await collectionSubroutes
        .find({ route: ObjectID(route) })
        .toArray();

      const arraySubroutes = resultSubroutes.map((obj) => obj._id);
      const arrayVelocities = resultSubroutes.map((obj) => obj.speed);

      for (let i = 0; i < arraySubroutes.length; i += 1) {
        const resultSegments = await collectionSegments
          .find({ subroute: ObjectID(arraySubroutes[i]) })
          .toArray();
        const arraySegments = resultSegments.map((obj) => obj.probability);
        const arraySegmentsID = resultSegments.map((obj) => obj._id);

        const v = arrayVelocities[i] * (5 / 18);
        const t = (v - v0) / a;

        //O1
        let O1 = (1 / 2) * p * Cd * A * Math.pow(v, 3) * t + M * G * v * t * fr;
        O1 = O1 * 0.00027777777777778;
        //O2
        //ENERGY BRAKING
        const ebreak1 = (M / 2) * (Math.pow(v - a * t, 2) - Math.pow(v, 2));
        const ebreak2 =
          (p * Cd * A * (Math.pow(v - a * t, 4) - Math.pow(v, 4))) / (-8 * a);
        const ebreak3 =
          (M * G * fr * (Math.pow(v - a * t, 2) - Math.pow(v, 2))) / (-2 * a);

        let O2BrakingAux = ebreak1 + ebreak2 + ebreak3;
        let O2Braking = O2BrakingAux * alpha;
        O2Braking = O2Braking * 0.00027777777777778;

        //ENERGY ACCELERATION
        const eacc1 = (M * Math.pow(a * t, 2)) / 2;
        const eacc2 = (p * Cd * A * Math.pow(a * t, 4)) / (8 * a);
        const eacc3 = (M * G * fr * Math.pow(a * t, 2)) / (2 * a);

        let O2Acceleration = eacc1 + eacc2 + eacc3;

        O2Acceleration = O2Acceleration + alpha  * O2BrakingAux;
        O2Acceleration = O2Acceleration * 0.00027777777777778;

        const O2 = O2Braking + O2Acceleration

        // console.log("Braking: " + O2Braking);
        // console.log("Acceleration: " + O2Acceleration)
        // console.log("O2: " + O2);

        const auxO1 = "O1";
        const auxO2 = "O2";

        for (let j = 0; j < arraySegmentsID.length; j += 1) {
          if (arraySegments[j] !== 0) {
            const result = collectionSegments.findOneAndUpdate(
              { _id: ObjectID(arraySegmentsID[j]) },
              { $set: { O: "O2", OValues: O2} }, 
            );
          } else {
            const result = collectionSegments.findOneAndUpdate(
              { _id: ObjectID(arraySegmentsID[j]) },
              {  $set: { O: "O1", OValues: O1 } },
            );
          }
        }
      }
      return resultRoute;
    } else {
      return new Error("Insert correct ID");
    }
  },
  addO3Values: async (parent, args, ctx, info) => {
    const { route, vehicleValues } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionRoute = db.collection("Routes");
    const collectionSubroutes = db.collection("Subroutes");
    const collectionSegments = db.collection("SegmentsSubroutes");
    const collectionVehiclesValues = db.collection("VehicleValues");
  
    const resultRoute = await collectionRoute.findOne({
      _id: ObjectID(route),
    });
    const resultVehicleValues = await collectionVehiclesValues.findOne({
      _id: ObjectID(vehicleValues),
    });
  
    const v0 = 0;
    const a = resultVehicleValues.a;
    const p = resultVehicleValues.p;
    const Cd = resultVehicleValues.Cd;
    const A = resultVehicleValues.A;
    const M = resultVehicleValues.M;
    const G = resultVehicleValues.G;
    const fr = resultVehicleValues.fr;
    const alpha = resultVehicleValues.alpha;

    if (resultRoute && resultVehicleValues) {
      const resultSubroutes = await collectionSubroutes
      .find({ route: ObjectID(route) })
      .toArray();

      const arraySubroutes = resultSubroutes.map((obj) => obj._id);
      const arrayVelocities = resultSubroutes.map((obj) => obj.speed);

      let arrayAux = [];

      for (let i=0; i<arrayVelocities.length; i += 1){

        let indexAux = i + 1;

        const nextVelocity = arrayVelocities[indexAux]
        
        const v = arrayVelocities[i] * (5 / 18);

        const auxNextVelocity = nextVelocity *  (5 / 18);

        //O3 ACCELERATION
        const tacc = (auxNextVelocity - v) / a; 

        const ETACC1 = (M/2) * (Math.pow(v + a * tacc, 2) - Math.pow(v, 2));

        if(arrayVelocities [i] < arrayVelocities [i+1]){
          arrayAux.push("less")
        }else if (arrayVelocities [i] > arrayVelocities [i+1]){
          arrayAux.push("higher")
        }
      };

      let totalO3 = 0;
      for (let i = 0; i < arrayAux.length; i += 1) {
        if(arrayAux[i] === "less"){
          totalO3 = totalO3 + 1;
        }else if(arrayAux[i] === "higher"){
          totalO3 = totalO3 + 5;
        }
      }

      for (let i = 0; i < arrayAux.length; i += 1) {
        if (arraySubroutes[i] !== 0) {
          const result = collectionSubroutes.findOneAndUpdate(
            { _id: ObjectID(arraySubroutes[i]) },
            { $set: { O3: 13333} }, 
          );
        } else {
          const result = collectionSegments.findOneAndUpdate(
            { _id: ObjectID(arraySubroutes[i]) },
            {  $set: { O3: 1111 } },
          );
        }
      }
    }
return resultRoute;
  },



























  // addStreet: async (parent, args, ctx, info) => {
  //   const { name, lenght, speed } = args;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Streets");

  //   const result = await collection.insertOne({
  //     name,
  //     lenght,
  //     speed,
  //   });
  //   return result.ops[0];
  // },
  // addSegment: async (parent, args, ctx, info) => {
  //   const { street, signal } = args;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collectionStreet = db.collection("Streets");
  //   const collectionSegment = db.collection("Segments");
  //   const collectionSignal = db.collection("Signals");

  //   const resultStreet = await collectionStreet.findOne({
  //     _id: ObjectID(street),
  //   });

  //   let signalArray = null;
  //   let resultSignal = null;
  //   let auxArray = null;
  //   let lenghtAuxArray = null;

  //   if (signal !== undefined) {
  //     console.log(1);
  //     signalArray = signal.map((obj) => ObjectID(obj));
  //     resultSignal = await collectionSignal.findOne({
  //       _id: { $in: signalArray },
  //     });
  //     auxArray = signal.map((obj) => obj.location);
  //     lenghtAuxArray = auxArray.length;
  //   }

  //   if (resultStreet) {
  //     console.log(2);
  //     let array = [];
  //     let index = 0;
  //     const speed = resultStreet.speed;
  //     let lenghtSegment = lenghtSegments(speed);

  //     if (resultStreet.lenght < lenghtSegment) {
  //       console.log(3);
  //       const result = await collectionSegment.insertOne({
  //         index: index + 1,
  //         lenghtSegment,
  //         street: ObjectID(street),
  //         signal: signal.map((obj) => ObjectID(obj)),
  //       });
  //       return result.ops[0];
  //     } else if (signal === undefined) {
  //       console.log("4");
  //       for (let i = 0; i < resultStreet.lenght; i += lenghtSegment) {
  //         index = index + 1;
  //         if (i + lenghtSegment > resultStreet.lenght) {
  //           const newLenght = resultStreet.lenght - i;
  //           let lenghtSegment = newLenght;
  //           array = [
  //             ...array,
  //             new Promise((resolve, reject) => {
  //               const obj = collectionSegment.insertOne({
  //                 index,
  //                 lenghtSegment,
  //                 street: ObjectID(street),
  //                 signal: [0],
  //               });
  //               resolve(obj);
  //             }),
  //           ];
  //         } else {
  //           console.log(20);
  //           array = [
  //             ...array,
  //             new Promise((resolve, reject) => {
  //               const obj = collectionSegment.insertOne({
  //                 index,
  //                 lenghtSegment,
  //                 street: ObjectID(street),
  //                 signal: [0],
  //               });
  //               resolve(obj);
  //             }),
  //           ];
  //         }
  //       }
  //       (async function () {
  //         await Promise.all(array);
  //       })();
  //       return resultStreet;
  //     } else {
  //       let lenghtSegment1 = lenghtSegments(speed);
  //       let counter = 0;
  //       for (let i = 0; i <= resultStreet.lenght; i += lenghtSegment) {
  //         console.log("5 " + i + index);
  //         index = index + 1;
  //         let lenghtSegment = lenghtSegment1;
  //         if (i + lenghtSegment > resultStreet.lenght) {
  //           console.log("6 " + i);
  //           if (
  //             i + lenghtSegment >= resultSignal.location &&
  //             resultSignal.location >= i
  //           ) {
  //             console.log(7);
  //             const newLenght = lenghtAuxArray * 16;
  //             let lenghtSegment = newLenght;
  //             array = [
  //               ...array,
  //               new Promise((resolve, reject) => {
  //                 const obj = collectionSegment.insertOne({
  //                   index,
  //                   lenghtSegment,
  //                   street: ObjectID(street),
  //                   signal: signal.map((obj) => ObjectID(obj)),
  //                 });
  //                 resolve(obj);
  //               }),
  //             ];
  //           } else {
  //             console.log("8 " + i);
  //             const newLenght = resultStreet.lenght - i;
  //             let lenghtSegment = newLenght;

  //             array = [
  //               ...array,
  //               new Promise((resolve, reject) => {
  //                 const obj = collectionSegment.insertOne({
  //                   index,
  //                   lenghtSegment,
  //                   street: ObjectID(street),
  //                   signal: [0],
  //                 });
  //                 resolve(obj);
  //               }),
  //             ];
  //           }
  //         } else {
  //           console.log(9);
  //           if (
  //             i + lenghtSegment > resultSignal.location &&
  //             resultSignal.location >= i &&
  //             counter === 0
  //           ) {
  //             console.log(10);
  //             if (i === 0) {
  //               console.log(11);
  //               const a = i + lenghtSegment;
  //               const b = lenghtAuxArray * 16;
  //               const c = a + b;
  //               const d = c - lenghtSegment;
  //               i = d - lenghtSegment;
  //               lenghtSegment = d;
  //               counter = 1;
  //             } else {
  //               console.log(12);
  //               const a = i + lenghtSegment;
  //               const b = lenghtAuxArray * 16;
  //               const c = a + b;
  //               const d = c - lenghtSegment;
  //               i = d - lenghtSegment;
  //               lenghtSegment = b;
  //               counter = 1;
  //             }
  //             array = [
  //               ...array,
  //               new Promise((resolve, reject) => {
  //                 const obj = collectionSegment.insertOne({
  //                   index,
  //                   lenghtSegment,
  //                   street: ObjectID(street),
  //                   signal: signal.map((obj) => ObjectID(obj)),
  //                 });
  //                 resolve(obj);
  //               }),
  //             ];
  //           } else {
  //             console.log(13);
  //             array = [
  //               ...array,
  //               new Promise((resolve, reject) => {
  //                 const obj = collectionSegment.insertOne({
  //                   index,
  //                   lenghtSegment,
  //                   street: ObjectID(street),
  //                   signal: [0],
  //                 });
  //                 resolve(obj);
  //               }),
  //             ];
  //           }
  //         }
  //       }
  //       (async function () {
  //         await Promise.all(array);
  //       })();
  //       return resultStreet;
  //     }
  //   }
  // },

  // addSignal: async (parent, args, ctx, info) => {
  //   const { name, location, type, probability, description } = args;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Signals");

  //   const result = await collection.insertOne({
  //     name,
  //     location,
  //     type,
  //     probability,
  //     description,
  //   });
  //   return result.ops[0];
  // },

  // addValues: async (parent, args, ctx, info) => {
  //   const { street, p, Cd, A, M, G, fr, a, alfa } = args;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Values");

  //   const idStreet = await collection.findOne({ street: ObjectID(street) });

  //   if (!idStreet) {
  //     const result = await collection.insertOne({
  //       street: ObjectID(street),
  //       p,
  //       Cd,
  //       A,
  //       M,
  //       G,
  //       fr,
  //       a,
  //       alfa,
  //     });
  //     return result.ops[0];
  //   } else {
  //     return new Error("This street already has assigned values");
  //   }
  // },
  // updateValues: async (parent, args, ctx, info) => {
  //   const resultID = args._id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Values");

  //   let jsonUpdate;
  //   if (args.p) {
  //     jsonUpdate = {
  //       p: args.p,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.Cd) {
  //     jsonUpdate = {
  //       Cd: args.Cd,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.A) {
  //     jsonUpdate = {
  //       A: args.A,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.M) {
  //     jsonUpdate = {
  //       M: args.M,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.G) {
  //     jsonUpdate = {
  //       G: args.G,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.fr) {
  //     jsonUpdate = {
  //       fr: args.fr,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.a) {
  //     jsonUpdate = {
  //       a: args.a,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.alfa) {
  //     jsonUpdate = {
  //       alfa: args.alfa,
  //       ...jsonUpdate,
  //     };
  //   }
  //   const result = await collection.findOneAndUpdate(
  //     { _id: ObjectID(resultID) },
  //     { $set: jsonUpdate },
  //     { returnOriginal: false }
  //   );
  //   return result.value;
  // },
  // updateStreet: async (parent, args, ctx, info) => {
  //   const resultID = args._id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Streets");

  //   let jsonUpdate;
  //   if (args.name) {
  //     jsonUpdate = {
  //       name: args.name,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.lenght) {
  //     jsonUpdate = {
  //       lenght: args.lenght,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.speed) {
  //     jsonUpdate = {
  //       speed: args.speed,
  //       ...jsonUpdate,
  //     };
  //   }
  //   const result = await collection.findOneAndUpdate(
  //     { _id: ObjectID(resultID) },
  //     { $set: jsonUpdate },
  //     { returnOriginal: false }
  //   );
  //   return result.value;
  // },

  // updateSegment: async (parent, args, ctx, info) => {
  //   const resultID = args.id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Segments");

  //   let jsonUpdate;

  //   if (args.lenght) {
  //     jsonUpdate = {
  //       lenght: args.lenght,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.speed) {
  //     jsonUpdate = {
  //       speed: args.speed,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.startCoordinate) {
  //     jsonUpdate = {
  //       startCoordinate: args.startCoordinate,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.middleCoordinate) {
  //     jsonUpdate = {
  //       middleCoordinate: args.middleCoordinate,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.endCoordinate) {
  //     jsonUpdate = {
  //       endCoordinate: args.endCoordinate,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.intersection) {
  //     jsonUpdate = {
  //       intersection: args.intersection,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.street) {
  //     jsonUpdate = {
  //       street: ObjectID(args.street),
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.signal) {
  //     jsonUpdate = {
  //       signal: ObjectID(args.signal),
  //       ...jsonUpdate,
  //     };
  //   }
  //   const result = await collection.findOneAndUpdate(
  //     { _id: ObjectID(resultID) },
  //     { $set: jsonUpdate },
  //     { returnOriginal: false }
  //   );
  //   return result.value;
  // },

  // updateSignal: async (parent, args, ctx, info) => {
  //   const resultID = args._id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Signals");

  //   let jsonUpdate;
  //   if (args.name) {
  //     jsonUpdate = {
  //       name: args.name,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.location) {
  //     jsonUpdate = {
  //       location: args.location,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.type) {
  //     jsonUpdate = {
  //       type: args.type,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.probability) {
  //     jsonUpdate = {
  //       probability: args.probability,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.description) {
  //     jsonUpdate = {
  //       description: args.description,
  //       ...jsonUpdate,
  //     };
  //   }
  //   const result = await collection.findOneAndUpdate(
  //     { _id: ObjectID(resultID) },
  //     { $set: jsonUpdate },
  //     { returnOriginal: false }
  //   );
  //   return result.value;
  // },

  // removeStreet: async (parent, args, ctx, info) => {
  //   const streetID = args._id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collectionStreet = db.collection("Streets");
  //   const collectionSegment = db.collection("Segments");
  //   const collectionValues = db.collection("Values");

  //   let result;
  //   const findStreet = await collectionStreet.findOne({
  //     _id: ObjectID(streetID),
  //   });
  //   if (findStreet) {
  //     const deleteSegment = () => {
  //       return new Promise((resolve, reject) => {
  //         const result = collectionSegment.deleteMany({
  //           street: ObjectID(streetID),
  //         });
  //         resolve(result);
  //       });
  //     };
  //     const deleteValues = () => {
  //       return new Promise((resolve, reject) => {
  //         const result = collectionValues.findOneAndDelete(
  //           { street: ObjectID(streetID) },
  //           { returnOriginal: true }
  //         );
  //         resolve(result.value);
  //       });
  //     };
  //     const deleteStreet = () => {
  //       return new Promise((resolve, reject) => {
  //         result = collectionStreet.findOneAndDelete(
  //           { _id: ObjectID(streetID) },
  //           { returnOriginal: true }
  //         );
  //         resolve(result);
  //       });
  //     };
  //     (async function () {
  //       const asyncFuntions = [deleteStreet(), deleteSegment(), deleteValues()];
  //       await Promise.all(asyncFuntions).value;
  //     })();
  //     return findStreet;
  //   } else {
  //     return new Error("Insert correct ID");
  //   }
  // },
  // removeSegments: async (parent, args, ctx, info) => {
  //   const streetID = args.street;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collectionStreet = db.collection("Streets");
  //   const collectionSegment = db.collection("Segments");

  //   let result;
  //   const findStreet = await collectionStreet.findOne({
  //     _id: ObjectID(streetID),
  //   });
  //   if (findStreet) {
  //     const deleteSegment = () => {
  //       return new Promise((resolve, reject) => {
  //         result = collectionSegment.deleteMany({ street: ObjectID(streetID) });
  //         resolve(result);
  //       });
  //     };
  //     (async function () {
  //       const asyncFuntions = [deleteSegment()];
  //       await Promise.all(asyncFuntions).value;
  //     })();
  //     return result;
  //   } else {
  //     return new Error("Insert correct ID");
  //   }
  // },
  // removeValues: async (parent, args, ctx, info) => {
  //   const valuesID = args._id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Values");

  //   const findValues = await collection.findOne({
  //     _id: ObjectID(valuesID),
  //   });
  //   if (findValues) {
  //     const deleteValues = () => {
  //       return new Promise((resolve, reject) => {
  //         const result = collection.findOneAndDelete(
  //           { _id: ObjectID(valuesID) },
  //           { returnOriginal: true }
  //         );
  //         resolve(result.value);
  //       });
  //     };
  //     (async function () {
  //       const asyncFuntions = [deleteValues()];
  //       await Promise.all(asyncFuntions).value;
  //     })();
  //     return findValues;
  //   } else {
  //     return new Error("Insert correct ID");
  //   }
  // },
  // removeSignal: async (parent, args, ctx, info) => {
  //   const signalID = args._id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Signals");

  //   const findSignal = await collection.findOne({
  //     _id: ObjectID(signalID),
  //   });
  //   if (findSignal) {
  //     const deleteSignals = () => {
  //       return new Promise((resolve, reject) => {
  //         const result = collection.findOneAndDelete(
  //           { _id: ObjectID(signalID) },
  //           { returnOriginal: true }
  //         );
  //         resolve(result.value);
  //       });
  //     };
  //     (async function () {
  //       const asyncFuntions = [deleteSignals()];
  //       await Promise.all(asyncFuntions).value;
  //     })();
  //     return findSignal;
  //   } else {
  //     return new Error("Insert correct ID");
  //   }
  // },
};
export { Mutation as default };
