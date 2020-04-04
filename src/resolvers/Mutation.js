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
    const { name, lenght, startCoordinate, endCoordinate, speed} = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Streets");

    const result = await collection.insertOne({
      name,
      lenght,
      startCoordinate,
      endCoordinate,
      speed, 
    });

    return result.ops[0];
  },

  addIntersection: async (parent, args, ctx, info) => {
    const { lenght, rightState, leftState, frontState, street} = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Intersections");

    const result = await collection.insertOne({
      lenght,
      rightState,
      leftState,
      frontState,
      street: ObjectID(street)
    });
    return result.ops[0];
  },

  addSegment: async (parent, args, ctx, info) => {
    const { street, signal } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionStreet = db.collection("Streets");
    const collectionSegment = db.collection("Segments");
    const collectionSignal = db.collection("Signals");

    const resultStreet = await collectionStreet.findOne({
      _id: ObjectID(street)
    });

    const signalArray = signal.map(obj => ObjectID(obj));
    const resultSignal = await collectionSignal.findOne({
      _id: { $in: signalArray }
    });

    const auxArray = signal.map(obj => obj.location);

    const lenghtAuxArray = auxArray.length;

    if (resultStreet) {
      let array = [];
      let index = 0;
      const speed = resultStreet.speed;
      let lenghtSegment = lenghtSegments(speed);

      if (resultStreet.lenght < lenghtSegment) {
        const result = await collectionSegment.insertOne({
          index: index + 1,
          lenghtSegment,
          street: ObjectID(street),
          signal: signal.map(obj => ObjectID(obj))
        });
        return result.ops[0];
      
      } else {
        let lenghtSegment1 = lenghtSegments(speed);
        for (let i = 0; i < resultStreet.lenght; i += lenghtSegment) {
          let lenghtSegment = lenghtSegment1;
          if(counter === 1){
            i = lenghtSegment;
          }
          let counter = 0
          if (i + lenghtSegment > resultStreet.lenght) {
            if (
              i + lenghtSegment >= resultSignal.location &&
              resultSignal.location >= i 
            ) {
              const newLenght = lenghtAuxArray * 16;
              let lenghtSegment = newLenght;
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: signal.map(obj => ObjectID(obj))
                  });
                  resolve(obj);
                })
              ];
            } else {
              const newLenght = resultStreet.lenght - i;
              let lenghtSegment = newLenght;
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: [0]
                  });
                  resolve(obj);
                })
              ];
            }
          } else {
            if (
              i + lenghtSegment > resultSignal.location &&
              resultSignal.location >= i
            ) {
              if(i === 0){
                const a = i + lenghtSegment;
                const b = lenghtAuxArray * 16;
                const c = a + b;
                const d = c - lenghtSegment;
                i = d - lenghtSegment;
                lenghtSegment = d;                
              }else{
                const a = i + lenghtSegment;
                const b = lenghtAuxArray * 16;
                const c = a + b;
                const d = c - lenghtSegment;
                i = d;
                lenghtSegment = b;
              }
              counter = 1;
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: signal.map(obj => ObjectID(obj))
                  });
                  resolve(obj);
                })
              ];
            } else {
              array = [
                ...array,
                new Promise((resolve, reject) => {
                  const obj = collectionSegment.insertOne({
                    index,
                    lenghtSegment,
                    street: ObjectID(street),
                    signal: [0]
                  });
                  resolve(obj);
                })
              ];
            }
          }
        }
        (async function() {
          await Promise.all(array);
        })();
        return resultStreet;
      }
    }
  },

  addSignal: async (parent, args, ctx, info) => {
    const { name, location, type, coordinate, probability, description } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Signals");

    const result = await collection.insertOne({
      name,
      location,
      type,
      coordinate,
      probability,
      description
    });

    return result.ops[0];
  },

  updateStreet: async (parent, args, ctx, info) => {
    const resultID = args.id;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Streets");

    let jsonUpdate;

    if (args.name) {
      jsonUpdate = {
        name: args.name,
        ...jsonUpdate
      };
    }
    if (args.lenght) {
      jsonUpdate = {
        lenght: args.lenght,
        ...jsonUpdate
      };
    }
    if (args.startCoordinate) {
      jsonUpdate = {
        startCoordinate: args.startCoordinate,
        ...jsonUpdate
      };
    }
    if (args.endCoordinate) {
      jsonUpdate = {
        endCoordinate: args.endCoordinate,
        ...jsonUpdate
      };
    }
    const result = await collection.findOneAndUpdate(
      { _id: ObjectID(resultID) },
      { $set: jsonUpdate },
      { returnOriginal: false }
    );

    return result.value;
  },

  updateSegment: async (parent, args, ctx, info) => {
    const resultID = args.id;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Segments");

    let jsonUpdate;

    if (args.lenght) {
      jsonUpdate = {
        lenght: args.lenght,
        ...jsonUpdate
      };
    }
    if (args.speed) {
      jsonUpdate = {
        speed: args.speed,
        ...jsonUpdate
      };
    }
    if (args.startCoordinate) {
      jsonUpdate = {
        startCoordinate: args.startCoordinate,
        ...jsonUpdate
      };
    }
    if (args.middleCoordinate) {
      jsonUpdate = {
        middleCoordinate: args.middleCoordinate,
        ...jsonUpdate
      };
    }
    if (args.endCoordinate) {
      jsonUpdate = {
        endCoordinate: args.endCoordinate,
        ...jsonUpdate
      };
    }
    if (args.intersection) {
      jsonUpdate = {
        intersection: args.intersection,
        ...jsonUpdate
      };
    }
    if (args.street) {
      jsonUpdate = {
        street: ObjectID(args.street),
        ...jsonUpdate
      };
    }
    if (args.signal) {
      jsonUpdate = {
        signal: ObjectID(args.signal),
        ...jsonUpdate
      };
    }
    const result = await collection.findOneAndUpdate(
      { _id: ObjectID(resultID) },
      { $set: jsonUpdate },
      { returnOriginal: false }
    );
    return result.value;
  },

  updateSignal: async (parent, args, ctx, info) => {
    const resultID = args.id;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Signals");

    let jsonUpdate;

    if (args.name) {
      jsonUpdate = {
        name: args.name,
        ...jsonUpdate
      };
    }
    if (args.type) {
      jsonUpdate = {
        type: args.type,
        ...jsonUpdate
      };
    }
    if (args.coordinate) {
      jsonUpdate = {
        coordinate: args.coordinate,
        ...jsonUpdate
      };
    }
    if (args.probability) {
      jsonUpdate = {
        probability: args.probability,
        ...jsonUpdate
      };
    }
    const result = await collection.findOneAndUpdate(
      { _id: ObjectID(resultID) },
      { $set: jsonUpdate },
      { returnOriginal: false }
    );
    return result.value;
  },

  removeStreet: async (parent, args, ctx, info) => {
    const streetID = args.id;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collectionStreet = db.collection("Streets");
    const collectionSegment = db.collection("Segments");
    let resultado;
    const findStreet = await collectionStreet.findOne({
      _d: ObjectID(streetID)
    });

    const deleteStreet = () => {
      return new Promise((resolve, reject) => {
        resultado = collectionStreet.findOneAndDelete(
          { _id: ObjectID(streetID) },
          { returnOriginal: true }
        );
        resolve(result.value);
      });
    };
    const deleteSegment = () => {
      return new Promise((resolve, reject) => {
        const result = collectionSegment.findOneAndDelete(
          { street: ObjectID(streetID) },
          { returnOriginal: true }
        );
        resolve(result.value);
      });
    };
    (async function() {
      const asyncFuntions = [deleteStreet(), deleteSegment()];
      await Promise.all(asyncFuntions).value;
    })();

    return resultado.value;
  },

};
export { Mutation as default };