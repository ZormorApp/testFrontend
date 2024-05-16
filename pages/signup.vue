<template>
    <div class="container  flex justify-center items-center h-screen">
        <div class="card">
            <h2 class="text-center uppercase font-bold" >sign up</h2>
            <form>
                <label class="uppercase font-bold" >Email</label>
                <input class="input" type="email" placeholder="enter your email">
                <label class="uppercase font-bold">password</label>
                <input class="input"  type="password" placeholder="enter your password">
                <button type="submit" class="btn hover:bg-orange-400 font-bold">Sign up</button>
                <p class="text-center">Already have an account? <span><NuxtLink to="/signin" class="text-orange-500 hover:text-orange-300">Sign in</NuxtLink></span></p>
            </form>
        </div>
    </div>
  </template>
  
  <script setup>

    useHead({
    title: "zormor | sign-up",
    meta: [
        {name:"description",  content: "zormor sign up page"}
    ]
  })

</script>
  
  <style scoped></style>