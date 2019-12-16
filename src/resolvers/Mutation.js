import {ObjectID} from 'mongodb';

const Mutation = {
    addStreet: async (parent, args, ctx, info) => {
        const  {name, lenght, startCoordinate, endCoordinate} = args;
        const {client} = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection("Streets");
        
        const result = await collection.insertOne({name, lenght, startCoordinate, endCoordinate});

        return{
            name,
            lenght,
            startCoordinate,
            endCoordinate,
            id: result.ops[0]._id,
        }
    },
    
    addSegment: async (parent, args, ctx, info) => {
        const {lenght, speed, startCoordinate, middleCoordinate, endCoordinate, intersection, street, signal} = args;
        const {client} = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection ("Segments");

        const result = await collection.insertOne({lenght, speed, startCoordinate, middleCoordinate, endCoordinate, intersection, street: ObjectID(street), signal: signal.map(obj => ObjectID(obj))});

        return{
            lenght,
            speed,
            startCoordinate,
            middleCoordinate,
            endCoordinate,
            intersection,
            street,
            signal,
            id: result.ops[0]._id
        }
    },

    addSignal: async (parent, args, ctx, info) => {
        const {name, type, coordinate, probability} = args;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection ("Signals");

        const result = await collection.insertOne({name, type, coordinate, probability});

        return{
            name,
            type,
            coordinate,
            probability,
            id: result.ops[0]._id
        }
    }
}
export {Mutation as default};