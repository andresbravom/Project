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
    },

    updateStreet: async (parent, args, ctx, info) => {
        const resultID = args.id;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Streets");

        let jsonUpdate;

        if (args.name) {
            jsonUpdate = {
                name: args.name,
                ...jsonUpdate
            }
        }
        if (args.lenght) {
            jsonUpdate = {
                lenght: args.lenght,
                ...jsonUpdate
            }
        }
        if (args.startCoordinate) {
            jsonUpdate = {
                startCoordinate: args.startCoordinate,
                ...jsonUpdate
            }
        }
        if (args.endCoordinate) {
            jsonUpdate = {
                endCoordinate: args.endCoordinate,
                ...jsonUpdate
            }
        }
        const result = await collection.findOneAndUpdate({_id: ObjectID(resultID)}, {$set: jsonUpdate}, {returnOriginal: false});

        return result.value;
    },

    updateSegment: async (parent, args, ctx, info) => {
        const resultID = args.id;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Segments");

        let jsonUpdate;

        if (args.lenght) {
            jsonUpdate = {
                lenght: args.lenght,
                ...jsonUpdate
            }
        }
        if (args.speed) {
            jsonUpdate = {
                speed: args.speed,
                ...jsonUpdate
            }
        }
        if (args.startCoordinate) {
            jsonUpdate = {
                startCoordinate: args.startCoordinate,
                ...jsonUpdate
            }
        }
        if (args.middleCoordinate) {
            jsonUpdate = {
                middleCoordinate: args.middleCoordinate,
                ...jsonUpdate
            }
        }
        if (args.endCoordinate) {
            jsonUpdate = {
                endCoordinate: args.endCoordinate,
                ...jsonUpdate
            }
        }
        if (args.intersection) {
            jsonUpdate = {
                intersection: args.intersection,
                ...jsonUpdate
            }
        }
        if (args.street) {
            jsonUpdate = {
                street: ObjectID(args.street),
                ...jsonUpdate
            }
        }
        if (args.signal) {
            jsonUpdate = {
                signal: ObjectID(args.signal),
                ...jsonUpdate
            }
        }
        const result = await collection.findOneAndUpdate({_id: ObjectID(resultID)}, {$set: jsonUpdate}, {returnOriginal: false});
        return result.value;
    },

    updateSignal: async (parent, args, ctx, info) => {
        const resultID = args.id;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Signals");

        let jsonUpdate;

        if (args.name){
            jsonUpdate = {
                name: args.name,
                ...jsonUpdate
            }
        }
        if (args.type) {
            jsonUpdate = {
                type: args.type,
                ...jsonUpdate
            }
        }
        if (args.coordinate) {
            jsonUpdate = {
                coordinate: args.coordinate,
                ...jsonUpdate
            }
        }
        if (args.probability) {
            jsonUpdate = {
                probability: args.probability,
                ...jsonUpdate
            }
        }
        const result = await collection.findOneAndUpdate({_id: ObjectID(resultID)}, {$set: jsonUpdate}, {returnOriginal: false});
        return result.value;
    },

    removeStreet: async (parent, args, ctx, info) => {
        const streetID = args.id;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collectionStreet = db.collection("Streets");
        const collectionSegment = db.collection("Segments");
        let resultado;
        const findStreet = await collectionStreet.findOne({_d: ObjectID(streetID)});

        const deleteStreet = () => {
            return new Promise((resolve, reject) => {
                resultado = collectionStreet.findOneAndDelete({_id: ObjectID(streetID)},{returnOriginal: true});
                resolve(resultado.value);
            }
        )};
        const deleteSegment = () => {
            return new Promise((resolve, reject) => {
                const result = collectionSegment.findOneAndDelete({street: ObjectID(streetID)}, {returnOriginal: true});
                resolve(result.value);
            }
        )};
        (async function(){
            const asyncFuntions = [deleteStreet(), deleteSegment()];
        await Promise.all(asyncFuntions).value;  
        })();
    
        return resultado.value;

    }
}
export {Mutation as default};