import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { MONGO_MONGODB_URI } from '$app/env/private';
import { BSON, MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";
const EJSON = BSON.EJSON;

export const load: PageServerLoad = async ({ params }) => {
	const client = new MongoClient(MONGO_MONGODB_URI);
	attachDatabasePool(client);


	try {
		const database = client.db('sample_mflix');
		const movies = database.collection('movies');

		// Queries for a movie that has a title value of 'Back to the Future'
		const query = { title: 'Back to the Future' };
		const movie = await movies.findOne(query);
		if (movie) {
			return EJSON.serialize(movie)
		}
	} finally {
		await client.close();
	}

	if (post) {
		return post;
	}

	error(404, 'Not found');
};