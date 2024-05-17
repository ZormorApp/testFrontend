<template>
  <div class="flex-1 container flex justify-center items-center h-screen">
    <div class="card">
      <h2 class="text-center uppercase font-bold">sign in</h2>
      <form>
        <label class="uppercase font-bold">Email</label>
        <input class="input" type="email" placeholder="enter your email" />
        <label class="uppercase font-bold">password</label>
        <input
          class="input"
          type="password"
          placeholder="enter your password" />
        <button type="submit" class="btn hover:bg-orange-400 font-bold">
          Sign in
        </button>
        <p class="text-center">
          Don't have an account?
          <span
            ><NuxtLink
              to="/signup"
              class="text-orange-500 hover:text-orange-300"
              >Sign up</NuxtLink
            ></span
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "zormor | sign-in",
  meta: [{ name: "description", content: "zormor sign in page" }],
})
</script>

<style scoped></style>
