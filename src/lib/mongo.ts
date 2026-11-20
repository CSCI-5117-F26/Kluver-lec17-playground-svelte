import { MONGO_MONGODB_URI } from '$app/env/private';
import { BSON, MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
//https://www.mongodb.com/docs/drivers/node/current/data-formats/extended-json/

export const EJSON = BSON.EJSON;
export const mongo_client = new MongoClient(MONGO_MONGODB_URI);
attachDatabasePool(mongo_client);
export const db = mongo_client.db('sound_db')
