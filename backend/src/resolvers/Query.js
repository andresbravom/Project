import { ObjectID } from "mongodb";

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

  getCalcule: async (parent, args, ctx, info) => {
    const { street } = args;
    const { client } = ctx;

    const db = client.db("DataBase");
    const collection = db.collection("Segments");

    const result = await collection
      .find({ street: ObjectID(street) })
      .toArray();

    let energy = 0; 
    let total = 0;
    if (result) {
      let calculeGeneral = 0;
      let calculeSpecific = 0;
      const signals = result.map((obj) => obj);
      const filterSignal = result.filter((obj) => obj.signal != 0);

      console.log("Jo: " + result.length);


      for (let i = 0; i<result.length; i+= 1) {
          
          if(i === 0 || i === result.length - 1){
            energy = 33.72;
            total = total + energy;
            console.log("total: " + total+ i);
          }else{
            energy = 4.11;
            total = total + energy;
            console.log("total: " + total + i);
          }
      }
      console.log("total Final: " + total);
      
      // const lengthGeneral = signals.length;
      // const lengthSpecific = filterSignal.length;

      // calculeGeneral = (lengthGeneral - lengthSpecific) * 2;
      // calculeSpecific = lengthSpecific * 1;

      // const numberSegmentsConstantValue = result.length - lengthSpecific;

      // console.log("Por: " + numberSegmentsConstantValue);

      // const r = calculeGeneral + calculeSpecific;

      // console.log(lengthGeneral);
      // console.log(r);

      return result;
    } else {
      null;
    }
  },
};

export { Query as default };
