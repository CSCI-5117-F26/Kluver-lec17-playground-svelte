import { betterAuth } from "better-auth";
import { db, mongo_client } from "./mongo";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client:mongo_client,
  }),
  
  advanced: {
    database: {
      joins: true,
    },
  },

  plugins: [sveltekitCookies(getRequestEvent)],

  emailAndPassword: { 
    enabled: true, 
  }
});