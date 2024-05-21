import { defineStore } from "pinia"
import { QUERY_GET_ALL, QUERY_GET_ONE } from "~/constants"
import { PLACES_DB } from "~/data/mock-db"
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { provideApolloClient, useQuery } from "@vue/apollo-composable"
import { gql } from "graphql-tag"
// import { useQuery } from "@apollo/client"

const httpLink = createHttpLink({
  uri: 'https://testbackend-0wc0.onrender.com/graphql',
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

export const usePlacesStore = defineStore("placesStore", () => {
  const name = "Places Database"

  const description = "Mock database for holding information about all =places"

  const data = ref([] as any)

  const getAllData = computed(() => data.value)

  function fetchAll() {
    // const infos = await useAsyncQuery(QUERY_GET_ALL)
    const query = provideApolloClient(apolloClient)(() => useQuery(QUERY_GET_ALL))
    // return query
    const res = computed(() => query.result.value)
    data.value = res
    console.log(res)
  }

  function fetchOne(id: number) {
    // const query = provideApolloClient(apolloClient)(() => useQuery(QUERY_GET_ONE(id)))
    // const res = computed(() => query.result.value)
    // return query
    return data
  }

  return {name, description, data, getAllData, fetchOne, fetchAll}
  // state: () => ({
  //   name: "Places Database",
  //   description: "Mock database for holding information about all places",
  //   data: [] as any,
  // }),
  // getters: {
  //   allPlaces: (state) => state.data,
  //   numOfPlaces: state => state.data.length
  // },
  // actions: {
  //   fetch() {
  //     // const infos = await useAsyncQuery(QUERY_GET_ALL)
  //     const query = provideApolloClient(apolloClient)(() => useQuery(QUERY_GET_ALL))
  //     // return query
  //     const res = computed(() => query.result.value.places)
  //     this.data = res
  //     console.log(res)
  //   },
  //   addPlace(payload: unknown) {
  //     this.data.push(payload)
  //   },
  // }
})
