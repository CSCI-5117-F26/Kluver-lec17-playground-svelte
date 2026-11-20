<script lang="ts">
  import { authClient } from "#lib/auth.client.ts";
  const session = authClient.useSession();

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
      <h1>Sign in</h1>
		<input bind:value={email} placeholder="email">
		<input bind:value={pass} placeholder="password" type="password">
		<input type="checkbox" bind:checked={remember_me}>
        <button
          onclick={async () => {
            await authClient.signIn.email({email, password:pass, rememberMe: remember_me} )
          }}
        >
          Log in
        </button>
      {/if}
    </div>