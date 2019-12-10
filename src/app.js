import  {GraphQLServer} from 'graphql-yoga'
import { MongoClient, ObjectID} from "mongodb";
import "babel-polyfill";
import * as uuid from 'uuid'


//mongodb+srv://AndresBravo:<password>@cluster0-q6wtw.gcp.mongodb.net/test?retryWrites=true&w=majority
const usr = "AndresBravo";
const pwd = "qwerty123";
const url = "cluster0-q6wtw.gcp.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */

const connectToDb = async function(usr, pwd, url) {
    const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  
    await client.connect();
    return client;
  };

/**
 * Starts GraphQL server, with MongoDB Client in context Object
 * @param {client: MongoClinet} context The context for GraphQL Server -> MongoDB Client
 */

const runGraphQLServer = function (context) {
const typeDefs = `
    type Street {
        _id: ID!
        name: String!
        lenght: Float!
        startCoordinate: Float!
        endCoordinate: Float!
    }

    type Query {
        getStreet(name: String!, id: ID!): [Street]
    }

    type Mutation {
        addStreet(name: String!, lenght: Float!, startCoordinate: Float!, endCoordinate: Float!): Street
    }
`
const resolvers = {
    Query: { 
        getStreet: async (parent, args, ctx, info) => {
            //const  {name, lenght, startCoordinate, endCoordinate} = args;
            const {client} = ctx;

            const db = client.db ("DataBase");
            const collection = db.collection ("Streets");
            
            const result = await collection.find({}).toArray();

            return result;
        }
    },

    Mutation: {
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

        }
    }
}

const server = new GraphQLServer({typeDefs, resolvers, context});
server.start(() => console.log("Server started"));
};

const runApp = async function (){
    const client = await connectToDb (usr, pwd, url);
    console.log("Connect to Mongo DB");

    runGraphQLServer({client});
};

runApp();
