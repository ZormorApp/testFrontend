import { defineStore } from "pinia"
import { USERS_DB } from "~/data/user-db"

export const useUser = defineStore("user", {
  state: () => ({
    name: "Users Database",
    description: "Mock database for holding information about all users",
    data: USERS_DB as any,
  }),
  getters: {
    allPlaces: (state) => state.data,
  },
  // actions: {
  //   fetch() {
  //     this.data = PLACES_DB
  //   }
  // }
})
