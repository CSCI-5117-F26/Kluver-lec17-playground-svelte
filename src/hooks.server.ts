import { auth } from "#lib/auth.server.js";
import { svelteKitHandler } from "better-auth/svelte-kit";
import { building } from "$app/env";

// called everytime the server receives a request
export async function handle({ event, resolve }) {

    const session = await auth.api.getSession({
    headers: event.request.headers,
  });

  // Make session and user available on server
  if (session) {
    event.locals.session = session.session;
    event.locals.user = session.user;
  }

  return svelteKitHandler({ event, resolve, auth, building });
}