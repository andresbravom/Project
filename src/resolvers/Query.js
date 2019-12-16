const Query = { 
    getStreet: async (parent, args, ctx, info) => {
        //const  {name, lenght, startCoordinate, endCoordinate} = args;
        const {client} = ctx;

        const db = client.db ("DataBase");
        const collection = db.collection ("Streets");
        
        const result = await collection.find({}).toArray();

        return result;
    }
}
export {Query as default};