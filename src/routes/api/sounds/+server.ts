import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MONGO_MONGODB_URI } from '$app/env/private';
import { BSON, MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
const EJSON = BSON.EJSON;
//https://www.mongodb.com/docs/drivers/node/current/data-formats/extended-json/

export const PUT: RequestHandler = async({request}) => {
	let data = await request.json();
    data = EJSON.deserialize(data)

    const client = new MongoClient(MONGO_MONGODB_URI);
    attachDatabasePool(client);


    try {
        const database = client.db('sound_db');
        // planned design: a board has fixed sounds, so store them "flat"
        // each user has one board, so store id by userid (rather than generic)

        const user = "KLUVER" // temp until we get auth...

        const boards = database.collection("boards")



    // Create a filter for movies with the title "Random Harvest"
    const filter = {"_id":data._id};

    /* Set the upsert option to insert a document if no documents match
    the filter */
    const options = { upsert: true };

  

    // Update the first document that matches the filter
    const result = await boards.replaceOne(filter, data, options);
    
    return Response.json(result)



    } finally {
        await client.close();
    }
}
