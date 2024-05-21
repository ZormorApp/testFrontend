import { defineStore } from "pinia"
// import { QUERY_GET_ALL, QUERY_GET_ONE } from "~/constants"
// import { PLACES_DB } from "~/data/mock-db"
// import {
//   ApolloClient,
//   createHttpLink,
//   InMemoryCache,
// } from "@apollo/client/core"
// import { provideApolloClient, useQuery } from "@vue/apollo-composable"
// import { gql } from "graphql-tag"
// import { useQuery } from "@apollo/client"

// const httpLink = createHttpLink({
//   uri: "https://testbackend-0wc0.onrender.com/graphql",
// })

// const cache = new InMemoryCache()

// const apolloClient = new ApolloClient({
//   link: httpLink,
//   cache,
// })

export const useUserStore = defineStore("userStore", () => {
  const key = reactive({
    id: "d4cdb12e-5cee-48fc-9048-d1c01bd37bca",
    role: "ADMIN",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluQGdtYWlsLmNvbSIsInN1YiI6ImQ0Y2RiMTJlLTVjZWUtNDhmYy05MDQ4LWQxYzAxYmQzN2JjYSIsImlhdCI6MTcxNjI2MjkwOSwiZXhwIjoxNzE2Mjk4OTA5fQ.OvjsITCO0_sy7CbelKu4KAQ95Z94WtlJTMZkfOLHK7E",
    username: "admin@gmail.com"
  })
  // const name = "Places Database"

  // const description = "Mock database for holding information about all =places"

  // const data = ref([] as any)

  // const getAllData = computed(() => data.value)
  function updateKey({id,role,token,username}) {
    key.id = id
    key.role = role
    key.token = token
    key.username = username
  }

  function clearKey() {
    key.id = ""
    key.role = ""
    key.token = ""
    key.username = ""
  }
  return { key, updateKey, clearKey }
})
