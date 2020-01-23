import {ObjectID} from 'mongodb';

const Segment = {
    street: async (parent, args, ctx, info) => {
        const streetID = parent.street;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Streets");

        const result = await collection.findOne({_id: ObjectID(streetID)});
        
        return result;
    },

    signal: async (parent, args, ctx, info) => {
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Signals");
        const signalArray = parent.signal.map(obj => ObjectID(obj));

        const result = await collection.find({_id: {$in: signalArray}}).toArray();
        return result;
    },
    // _id: (parent, args, ctx, info) => {
    //     const result = ObjectID(parent._id);
    //     return result;
    // }
}
export {Segment as default};