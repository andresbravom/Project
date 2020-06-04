import { ObjectID } from "mongodb";

function lenghtSegments(speed) {
  const a = 3.9;
  const vi = 0;
  const v0 = speed * (5 / 18);
  const t = (vi - v0) / -a;
  var s = (v0 * t - (1 / 2) * a * (t * t)) * 2;

  return Math.ceil(s);
}

const Mutation = {
  addStreet: async (parent, args, ctx, info) => {
    const { name, lenght, speed } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Streets");

    const result = await collection.insertOne({
      name,
      lenght,
      speed,
    });

    return result.ops[0];
  },

  // addIntersection: async (parent, args, ctx, info) => {
  //   const { lenght, rightState, leftState, frontState, street } = args;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collection = db.collection("Intersections");

  //   const result = await collection.insertOne({
  //     lenght,
  //     rightState,
  //     leftState,
  //     frontState,
  //     street: ObjectID(street),
  //   });
  //   return result.ops[0];
  // },

  addSegment: async (parent, args, ctx, info) => {
    const { street, signal } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionStreet = db.collection("Streets");
    const collectionSegment = db.collection("Segments");
    const collectionSignal = db.collection("Signals");

    const resultStreet = await collectionStreet.findOne({
      _id: ObjectID(street),
    });

    let signalArray = null;
    let resultSignal = null;
    let auxArray = null;
    let lenghtAuxArray = null;

    if (signal !== undefined) {
      console.log(1);
      signalArray = signal.map((obj) => ObjectID(obj));
      resultSignal = await collectionSignal.findOne({
        _id: { $in: signalArray },
      });
      auxArray = signal.map((obj) => obj.location);
      lenghtAuxArray = auxArray.length;
    }

    if (resultStreet) {
      console.log(2);
      let array = [];
      let index = 0;
      const speed = resultStreet.speed;
      let lenghtSegment = lenghtSegments(speed);

      if (resultStreet.lenght < lenghtSegment) {
        console.log(3);
        const result = await collectionSegment.insertOne({
          index: index + 1,
          lenghtSegment,
          street: ObjectID(street),
          signal: signal.map((obj) => ObjectID(obj)),
        });
        return result.ops[0];
      } else if (signal === undefined) {
        console.log(4);
        for (let i = 0; i <= resultStreet.lenght; i += lenghtSegment) {
          index = index + 1;
          if (i + lenghtSegment > resultStreet.lenght) {
            const newLenght = resultStreet.lenght - i;
            let lenghtSegment = newLenght;
            array = [
              ...array,
              new Promise((resolve, reject) => {
                const obj = collectionSegment.insertOne({
                  index,
                  lenghtSegment,
                  street: ObjectID(street),
                  signal: [0],
                });
                resolve(obj);
              }),
            ];
          }else {
            console.log(20);
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: [0],
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
      } else {
        
        let lenghtSegment1 = lenghtSegments(speed);
        let counter = 0;
        for (let i = 0; i <= resultStreet.lenght; i += lenghtSegment) {
          console.log("5 " + i + index);
          index = index + 1;
          let lenghtSegment = lenghtSegment1;
          if (i + lenghtSegment > resultStreet.lenght) {
            console.log("6 " + i);
            if (
              i + lenghtSegment >= resultSignal.location &&
              resultSignal.location >= i
            ) {
              console.log(7);
              const newLenght = lenghtAuxArray * 16;
              let lenghtSegment = newLenght;
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: signal.map((obj) => ObjectID(obj)),
                  });
                  resolve(obj);
                }),
              ];
            } else {
              console.log("8 " + i);
              const newLenght = resultStreet.lenght - i;
              let lenghtSegment = newLenght;

              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: [0],
                  });
                  resolve(obj);
                }),
              ];
            }
          } else {
            console.log(9);
            if (
              i + lenghtSegment > resultSignal.location &&
              resultSignal.location >= i &&
              counter === 0
            ) {
              console.log(10);
              if (i === 0) {
                console.log(11);
                const a = i + lenghtSegment;
                const b = lenghtAuxArray * 16;
                const c = a + b;
                const d = c - lenghtSegment;
                i = d - lenghtSegment;
                lenghtSegment = d;
                counter = 1;
              } else {
                console.log(12);
                const a = i + lenghtSegment;
                const b = lenghtAuxArray * 16;
                const c = a + b;
                const d = c - lenghtSegment;
                i = d - lenghtSegment;
                lenghtSegment = b;
                counter = 1;
              }
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: signal.map((obj) => ObjectID(obj)),
                  });
                  resolve(obj);
                }),
              ];
            } else {
              console.log(13);
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: [0],
                  });
                  resolve(obj);
                }),
              ];
            }
          }
        }
        (async function () {
          await Promise.all(array);
        })();
        return resultStreet;
      }
    }
  },

  addSignal: async (parent, args, ctx, info) => {
    const { name, location, type, probability, description } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Signals");

    const result = await collection.insertOne({
      name,
      location,
      type,
      probability,
      description,
    });

    return result.ops[0];
  },

  // updateStreet: async (parent, args, ctx, info) => {
  //   const resultID = args.id;
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
  //   if (args.startCoordinate) {
  //     jsonUpdate = {
  //       startCoordinate: args.startCoordinate,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.endCoordinate) {
  //     jsonUpdate = {
  //       endCoordinate: args.endCoordinate,
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
  //   const resultID = args.id;
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
  //   if (args.type) {
  //     jsonUpdate = {
  //       type: args.type,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.coordinate) {
  //     jsonUpdate = {
  //       coordinate: args.coordinate,
  //       ...jsonUpdate,
  //     };
  //   }
  //   if (args.probability) {
  //     jsonUpdate = {
  //       probability: args.probability,
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
  //   const streetID = args.id;
  //   const { client } = ctx;

  //   const db = client.db("DataBase");
  //   const collectionStreet = db.collection("Streets");
  //   const collectionSegment = db.collection("Segments");
  //   let resultado;
  //   const findStreet = await collectionStreet.findOne({
  //     _d: ObjectID(streetID),
  //   });

  //   const deleteStreet = () => {
  //     return new Promise((resolve, reject) => {
  //       resultado = collectionStreet.findOneAndDelete(
  //         { _id: ObjectID(streetID) },
  //         { returnOriginal: true }
  //       );
  //       resolve(result.value);
  //     });
  //   };
  //   const deleteSegment = () => {
  //     return new Promise((resolve, reject) => {
  //       const result = collectionSegment.findOneAndDelete(
  //         { street: ObjectID(streetID) },
  //         { returnOriginal: true }
  //       );
  //       resolve(result.value);
  //     });
  //   };
  //   (async function () {
  //     const asyncFuntions = [deleteStreet(), deleteSegment()];
  //     await Promise.all(asyncFuntions).value;
  //   })();

  //   return resultado.value;
  // },
};
export { Mutation as default };
