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
        <ErrorMessage :message="errMsg"/>
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
const toast = useToast()
// const storageUser = ref(useLoggedUserStore().cred)
// const storageUser = useLoggedUserStore().cred

const errMsg = ref("")

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

  try {
    // make sign in request to database to see if user exists,
    const {mutate} = useMutation(SIGN_IN(email, password)) 
    const attempSignIn: any = mutate()

    attempSignIn.then((success: any) => {
      const user = {
        access_token:  success.data.login.access_token,
        username:  success.data.login.user.username,
        role:  success.data.login.user.role,
        id:  success.data.login.user.id,
      }
      toast.add({ title: `Successfully signed in as ${email}` })
      console.log("success", success)
      localStorage.setItem('user', JSON.stringify(user))
      reloadNuxtApp({path: '/zormor'})
    })
    .catch((err: any) => {
      errMsg.value = 'Wrong email or password'
      console.log("Error:", err.message)
    })
  } catch(err: any){
    console.log("Error:", err)
    // alert("user not found")
    toast.add({ title: "Sorry, something went wrong. Please try again later." })
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
