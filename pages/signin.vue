<template>
  <div class="flex-1 container flex justify-center items-center h-screen">
    <div class="card">
      <h2 class="text-center uppercase font-bold">sign in</h2>
      <UForm :state="state" :schema="schema" @submit="onSubmit">
        <label class="uppercase font-bold">Email</label>
        <input
          v-model="state.email"
          class="input"
          type="email"
          placeholder="enter your email" />
        <label class="uppercase font-bold">password</label>
        <input
          v-model="state.password"
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
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import { z } from "zod"
import type { FormSubmitEvent } from "#ui/types"
import { SIGN_IN } from "~/constants";

useHead({
  title: "zormor | sign-in",
  meta: [{ name: "description", content: "zormor sign in page" }],
})

const schema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(8, "must be at least 8 characters"),
})

const state = reactive({
  email: undefined,
  password: undefined,
})

type Schema = z.output<typeof schema>

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // console.log(event.data)
  const email = event.data.email
  const password = event.data.password
  // console.log(typeof email, typeof password)

  // make sign in request to database to see if user exists,
  const {mutate} = useMutation(SIGN_IN(email, password))
  // const response = data.value
  const res = await mutate()
  console.log(res)

  // if exists get token and store in localstorage

  // if not exists, alert user that email is invalid
}
</script>

<style scoped></style>
