// @deno-types="npm:@types/express@4"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "npm:mongoose@7.6.3";
import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
import { typeDefs } from "./schema.ts";
import { Query } from "./resolvers/Query.ts";
import { Character } from "./resolvers/Character.ts";
import { Episode } from "./resolvers/Episode.ts";
import { Location } from "./resolvers/Location.ts";


const env = await load();

const MONGO_URL=env.MONGO_URL||Deno.env.get("MONGO_URL");// si hay .emv lo leo si no lo lee de las variables de entorno de deno

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);

const server = new ApolloServer({
    typeDefs,
    resolvers:{
        Query,
        Character,
        Episode,
        Location
    },
});

const url= await startStandaloneServer(server, {
    listen:{
        port:8000,
    },
});
console.info("todo bien", url)
