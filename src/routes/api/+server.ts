import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MONGO_MONGODB_URI } from '$app/env/private';
import { BSON, MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
const EJSON = BSON.EJSON;
//https://www.mongodb.com/docs/drivers/node/current/data-formats/extended-json/

export const GET: RequestHandler = async({ url }) => {

	console.log(MONGO_MONGODB_URI);


	const client = new MongoClient(MONGO_MONGODB_URI);
	attachDatabasePool(client);


	try {
		const database = client.db('sample_mflix');
		const movies = database.collection('movies');

		// Queries for a movie that has a title value of 'Back to the Future'
		const query = { title: 'Back to the Future' };
		const movie = await movies.findOne(query);
		console.log(movie);
		if (movie) {
			return Response.json(EJSON.serialize(movie))
		}
	} finally {
		await client.close();
	}

	const min = Number(url.searchParams.get('min') ?? '0');
	const max = Number(url.searchParams.get('max') ?? '1');

	const d = max - min;

	if (isNaN(d) || d < 0) {
		error(400, 'min and max must be numbers, and min must be less than max');
	}

	const random = min + Math.random() * d;

	return new Response(String(random));
};