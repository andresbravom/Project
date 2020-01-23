import {ObjectID} from 'mongodb';

const Mutation = {
    addStreet: async (parent, args, ctx, info) => {
        const  {name, lenght, startCoordinate, endCoordinate, speed} = args;
        const {client} = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection("Streets");
        
        const result = await collection.insertOne({name, lenght, startCoordinate, endCoordinate, speed});

        return result.ops[0]  
    },
    
    addSegment: async (parent, args, ctx, info) => { 
        const {street, signal} = args;
        const {client} = ctx;

        const db = client.db ("DataBase");
        const collectionStreet = db.collection ("Streets");
        const collectionSegment = db.collection ("Segments");
        const collectionSignal = db.collection ("Signals");

        const resultStreet = await collectionStreet.findOne({_id: ObjectID(street)});
        // const resultSignal = await collectionSignal.findOne({_id: ObjectID(signal)});

        if(resultStreet ){
            if(resultStreet.speed === 50){
                let array = [];
                let index = 0;
                let lenght = 50;
                const name = resultStreet.name;    

                if(resultStreet.lenght < 50){

                    const result = await collectionSegment.insertOne({lenght, index: index+1, name, street: ObjectID(street), signal: signal.map(obj => ObjectID(obj))});

                    return result.ops[0];
                }
                else if((resultStreet.lenght % 50) === 0){
                    for(let i=0; i<resultStreet.lenght; i += 50){
                        index = index + 1;
                        array = [...array, new Promise ((resolve, reject) => {
                            const obj = collectionSegment.insertOne({lenght, index, name, street: ObjectID(street)});
                            resolve (obj);
                            }
                        )];
                    }

                    (async function(){
                        await Promise.all(array);
                    })();
                    return resultStreet;
                }else{
                    
                    for (let i=0; i < resultStreet.lenght; i += 50){
                        index = index+1;
                        
                        if((i + 50) > resultStreet.lenght){
                            const newLenght = (resultStreet.lenght) - (i );
                            array = [...array, new Promise((resolve, reject) => {
                                const obj = collectionSegment.insertOne({newLenght, index, name, street: ObjectID(street)});
                                resolve(obj);
                            }
                            )];
                            
                        }else{
                            array = [...array, new Promise((resolve, reject) => {
                                const obj = collectionSegment.insertOne({lenght, index, name, street: ObjectID(street)});
                                resolve(obj);
                            }
                            )];
                        }
                    }
                (async function(){
                    await Promise.all(array);
                })();
                return resultStreet;    
                }
            }
        }
    },

    addSignal: async (parent, args, ctx, info) => {
        const {name, location, type, coordinate, probability, description} = args;
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection ("Signals");

        const result = await collection.insertOne({name, location, type, coordinate, probability, description});

        return result.ops[0];
        
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
                resolve(result.value);
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