import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MONGO_MONGODB_URI } from '$app/env/private';
import { BSON, MongoClient } from 'mongodb';
import { attachDatabasePool } from '@vercel/functions';
const EJSON = BSON.EJSON;
//https://www.mongodb.com/docs/drivers/node/current/data-formats/extended-json/

const client = new MongoClient(MONGO_MONGODB_URI);
attachDatabasePool(client);

export const load: LayoutServerLoad = async ({ params }) => {
	const database = client.db('sound_db');
	// planned design: a board has fixed sounds, so store them "flat"
	// each user has one board, so store id by userid (rather than generic)

	const user = 'KLUVER'; // temp until we get auth...

	const board = database.collection('boards');

	// TODO: make username unique and add an index.
	const the_board = await board.findOne({ name: user });
	return EJSON.serialize(the_board)
};
