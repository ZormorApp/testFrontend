<template>
  <div class="flex-1 container flex justify-center items-center h-screen">
    <div class="card">
      <h2 class="text-center uppercase font-bold">sign in</h2>
      <UForm POSt="/zormor" :state="state" :schema="schema" @submit="onSubmit">
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
const router = useRouter();

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

 
  const res = await mutate()
  console.log(res)
  // const token = res.data.login.access_token 
  const user = {
    access_token:  res.data.login.access_token,
    username:  res.data.login.user.username,
    role:  res.data.login.user.role,
    id:  res.data.login.user.id,
  }

  console.log(user)
  //sets token to local strage 
  // localStorage.setItem('access_token', token)
   localStorage.setItem('user', JSON.stringify(user))

  try{
    if(email ===  res.data.login.user.username){
      console.log("success")
      router.push('/zormor')
    }
  }catch(err){
    console.log(err)
    alert("user not found")
  }

  // if exists get token and store in localstorage

  // if not exists, alert user that email is invalid

//   const signInMutation = useMutation(() => SIGN_IN(email, password), {
//     onSuccess:  (data) => {
//       // Store the token in local storage
//       console.log(data)// Assuming the token is in the data object
//       const router = useRoute();  //using the router
//       localStorage.setItem('access_token', token)
//       console.log('Token stored in local storage:', token)
      
//       // Redirect to the desired page, e.g., home
//        router.redirect('/zormor')
//     },
//     onError: (error) => {
//       // Handle error, e.g.
//  onError: (error) => {
//       // Handle error, e.g., display a message to the user
//       console.error('Sign-in failed:', error)
//       alert('Invalid email or password. Please try again.')
//     }
//   }})
}
</script>

<style scoped></style>
