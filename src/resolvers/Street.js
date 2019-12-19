import {ObjectID} from 'mongodb';

const Street = {
    segment: async (parent, args, ctx, info) => {
        const segmentID = ObjectID(parent._id);
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Segments");

        const result = await collection.find({street: segmentID}).toArray();

        return result;
    },
    _id: (parent, args, ctx, info) => {
        const result = ObjectID(parent._id);
        return result;
    }
}
export {Street as default};