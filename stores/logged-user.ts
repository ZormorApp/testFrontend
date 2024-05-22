import { defineStore } from "pinia"

export const useLoggedUserStore = defineStore("loggedUserStore", () => {
  const cred = ref({})

  return {cred}
})