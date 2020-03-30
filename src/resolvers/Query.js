import { ObjectID } from "mongodb";

const Query = { 
    getStreetID: async (parent, args, ctx, info) => {
        const { _id } = args;
        const { client } = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection ("Streets");
        
        const result = await collection.findOne({_id: ObjectID(_id)});

        if (result){
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },

    getIntersectionID: async (parent, args, ctx, info) => {
        const { _id } = args;
        const { client } = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection ("Intersections");

        const result = await collection.find({_id: ObjectID(_id)}).toArray();

        if(result){
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },
    getSegmentID: async (parent, args, ctx, info) => {
        const { _id } = args;
        const { client } = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Segments");

        const result = await collection.find({_id: ObjectID(_id)}).toArray();

        if (result){
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },
    
    getSignalID: async (parent, args, ctx, info) => {
        const { _id } = args;
        const { client } = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Signals");

        const result = await collection.find({_id: ObjectID(_id)}).toArray();

        if (result) {
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },

    getStreet: async (parent, args, ctx, info) => {
        const { client } = ctx;
        
        const db = client.db("DataBase");
        const collection = db.collection("Streets");

        const result = await collection.find({}).toArray();

        if (result) {
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },

    getIntersection: async (parent, args, ctx, info) => {
        const { client } = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Intersections");

        const result = await collection.find({}).toArray();

        if (result) {
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },

    getSegment: async (parent, args, ctx, info) => {
        const { client } = ctx;
        
        const db = client.db("DataBase");
        const collection = db.collection("Segments");

        const result = await collection.find({}).toArray();

        if (result) {
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    }, 

    getSignal: async (parent, args, ctx, info) => {
        const { client } = ctx;
        
        const db = client.db("DataBase");
        const collection = db.collection("Signals");

        const result = await collection.find({}).toArray();

        if (result) {
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },

    getCalcule: async (parent, args, ctx, info) => {
        const { street } = args;
        const { client } = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Segments");

        const array = await collection.find({street: ObjectID(street)}).toArray();
        if(array){
            console.log(array);
        
            return array;
        }
        else{
            null
        }
    }
}

export {Query as default};