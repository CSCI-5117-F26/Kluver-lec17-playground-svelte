import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	MONGO_MONGODB_URI: {},
	BETTER_AUTH_SECRET: {},
	BETTER_AUTH_URL: {public: true}
});