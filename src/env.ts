import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MONGO_MONGODB_URI: {}
});