import { ObjectID } from "mongodb";

const Query = { 
    getStreetID: async (parent, args, ctx, info) => {
        const {_id} = args;
        const {client} = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection ("Streets");
        
        const result = await collection.find({_id: ObjectID(_id)}).toArray();

        if (result){
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },

    getSegmentID: async (parent, args, ctx, info) => {
        const {_id} = args;
        const {client} = ctx;

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
        const {_id} = args;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Signals");

        const result = await collection.find({_id: ObjectID(_id)}).toArray();

        if (result) {
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },


    // getSignalID: async (parent, args, ctx, info) => {
    //     const {client} = ctx;

    //     const db = client.db("DataBase");
    //     const collection = db.collection("Signals");

    //     const result = await collection.find({}).toArray();

    //     if (result) {
    //         return result;
    //     }else{
    //         return new Error ("Insert correct ID");
    //     }
    // },
}

export {Query as default};