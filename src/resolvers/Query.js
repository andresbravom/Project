import  {GraphQLServer, PubSub} from 'graphql-yoga'
import { MongoClient, ObjectID} from "mongodb";
import "babel-polyfill";

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
    }
}
export {Query as default};