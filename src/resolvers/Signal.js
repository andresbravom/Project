import {ObjectID} from 'mongodb';

const Signal = {
    segment: async (parent, args, ctx, info) => {
        const signalID = parent._id;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Segments");

        const result = await collection.find({signal: signalID}).toArray();

        return result;
    },
    _id: (parent, args, ctx, info) => {
        const result = ObjectID(parent._id);
        return result;
    }
}

export{Signal as default};