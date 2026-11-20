<script lang="ts">
  import { authClient } from "#lib/auth.client.ts";
	import { goto } from "$app/navigation";
  import { resolve } from '$app/paths';

  const session = authClient.useSession();
  if ($session.data) {
    // not for logged in people!
    goto(resolve("/account"))
  }


  let name = $state("")
  let email = $state("")
  let pass = $state("")
  let remember_me = $state(false)
</script>
    <div>
      {#if $session.data}
        <div>
          <p>
            {$session.data.user.name}
          </p>
          <button
            onclick={async () => {
              await authClient.signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      {:else}
      <h1>sign up</h1>
		<input bind:value={name} placeholder="name">
		<input bind:value={email} placeholder="email">
		<input bind:value={pass} placeholder="password" type="password">
		<input type="checkbox" bind:checked={remember_me}>
        <button
          onclick={async () => {
            await authClient.signUp.email({name, email, password:pass, rememberMe: remember_me} )
          }}
        >
          Log in
        </button>
      {/if}
    </div>