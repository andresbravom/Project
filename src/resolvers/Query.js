const Query = { 
    getStreet: async (parent, args, ctx, info) => {
        const {client} = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection ("Streets");
        
        const result = await collection.find({}).toArray();

        if (result){
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },

    getSegment: async (parent, args, ctx, info) => {
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Segments");

        const result = await collection.find({}).toArray();

        if (result){
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    },
    
    getSignal: async (parent, args, ctx, info) => {
        const {client} = ctx;

        const db = client.db("DataBase");
        const collection = db.collection("Signals");

        const result = await collection.find({}).toArray();

        if (result) {
            return result;
        }else{
            return new Error ("Insert correct ID");
        }
    }
}
export {Query as default};