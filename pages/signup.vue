<template>
  <div class="flex-1 container flex justify-center items-center h-screen">
    <div class="card">
      <h2 class="text-center uppercase font-bold">sign up</h2>
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
        <ErrorMessage :message="errorMsg"/>
        <button type="submit" class="btn hover:bg-orange-400 font-bold">
          Sign up
        </button>
        <p class="text-center">
          Already have an account?
          <span
            ><NuxtLink
              to="/signin"
              class="text-orange-500 hover:text-orange-300"
              >Sign in</NuxtLink
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
import { SIGN_IN, SIGN_UP } from "~/constants";
const toast = useToast()

const errorMsg = ref("")

useHead({
  title: "zormor | sign-up",
  meta: [{ name: "description", content: "zormor sign up page" }],
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
  // const res = useMutation(SIGN_UP(email, password))
  // const response = data.value
  // const res = await mutate()
  // console.log(res)
  // this.$router.push('/zormor')

  // if exists get token and store in localstorage

// if not exists, alert user that email is invalid

  //note: the select option role is not passed
  // Define the sign-in mutation

  try {
    const {mutate} = useMutation(SIGN_UP(email, password))
    const attemptSignUp = mutate()
    // mutate().then(res => {
    //   console.log(res)
    // }).catch(err => {
    //   console.log(err)
    // })
    attemptSignUp.then(res => {
      console.log(res)
      const {mutate} = useMutation(SIGN_IN(email, password)) 
      const attemptSignIn = mutate()
      toast.add({"title": `Welcome ${email} to Zormor!`})

      attemptSignIn.then(async (signInRes: any) => {
        const user = {
          access_token:  signInRes.data.login.access_token,
          username:  signInRes.data.login.user.username,
          role:  signInRes.data.login.user.role,
          id:  signInRes.data.login.user.id,
        }
        localStorage.setItem('user', JSON.stringify(user))
        console.log("Sign in successful")
        toast.add({"title": `Successfully signed into ${user.username}`})
        reloadNuxtApp({path: '/zormor'})
      })
      .catch((signInErr: any) => {
        console.log("Sign in error:", signInErr.message)
        toast.add({"title": "Sorry, something went wrong signing you in. Please try again later"})
      })
    })
    .catch(err => {
      console.log(err.message)
      errorMsg.value = err.message
    })
    // console.log(res)
  } catch(err) {
    console.log(err)
    toast.add({ title: "Sorry, something went wrong. Please try again later" })
  }
}



</script>

<style scoped></style>
