import { GraphQLServer, PubSub } from "graphql-yoga";
import { MongoClient, ObjectID } from "mongodb";
import "babel-polyfill";

import Street from "./resolvers/Street";
import Intersection from "./resolvers/Intersection";
import Segment from "./resolvers/Segment";
import Signal from "./resolvers/Signal";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";

const usr = "AndresBravo";
const pwd = "qwerty123";
const url = "cluster0-q6wtw.gcp.mongodb.net/test?retryWrites=true&w=majority";

/**
 * Connects to MongoDB Server and returns connected client
 * @param {string} usr MongoDB Server user
 * @param {string} pwd MongoDB Server pwd
 * @param {string} url MongoDB Server url
 */

const connectToDb = async function (usr, pwd, url) {
  const uri = `mongodb+srv://${usr}:${pwd}@${url}`;
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await client.connect();
  return client;
};

/**
 * Starts GraphQL server, with MongoDB Client in context Object
 * @param {client: MongoClinet} context The context for GraphQL Server -> MongoDB Client
 */

const runGraphQLServer = function (context) {
  const resolvers = {
    Street,
    Intersection,
    Segment,
    Signal,
    Query,
    Mutation,
  };

  const server = new GraphQLServer({
    typeDefs: "./src/schema.graphql",
    resolvers,
    context,
  });
  server.start(() => console.log("Server started"));
};

const runApp = async function () {
  const client = await connectToDb(usr, pwd, url);
  console.log("Connect to Mongo DB");
  const pubsub = new PubSub();

  runGraphQLServer({ client, pubsub });
};

runApp();