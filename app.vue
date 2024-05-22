<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<!-- <script setup>
import { useLoggedUserStore } from './stores/logged-user';

const loggedUserStore = useLoggedUserStore()
console.log(loggedUserStore.cred)
loggedUserStore.cred = {
    access_token: "",
    username: "",
    role: "",
    id: "",
  }

let userExists = localStorage.getItem('user')
// let userInStorage

if (!userExists) {
  const pattern  = {
    access_token: "",
    username: "",
    role: "",
    id: "",
  }
  localStorage.setItem('user', JSON.stringify(pattern))
  loggedUserStore.cred = pattern
}
else {
  loggedUserStore.cred = ref(JSON.parse(userExists))
}
console.log(loggedUserStore.cred)

// localStorage.setItem('user', JSON.stringify(user))
</script> -->