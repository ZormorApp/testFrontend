<script setup lang="ts">
import { QUERY_GET_ALL } from "~/constants"

// const placesStore = usePlacesStore()
// placesStore.fetchAll()

// const data = placesStore.getAllData
// console.log(data.places)

const { data } = await useAsyncQuery(QUERY_GET_ALL)
const places = data.value.places
console.log(places)
// const fromDb = placesStore.fetch()
// console.log(fromDb)

// const newData = computed(() => fromDb.result.value.places)

// const { data } = await useAsyncQuery(readQuery)
// console.log(data, 1)

const redirect = async (id: number) => {
  // console.log(`/zormor/${id}`)
  await navigateTo(`/zormor/${id}`)
}
</script>

<template>
  <div class="flex-1 py-4 container h-auto min-h-screen flex flex-col items-stretch gap-4 text-white">
    <div
      v-for="item in places"
      class="p-4 border-[1px] border-amber-300 rounded-lg hover:shadow-md hover:shadow-amber-200 hover:cursor-pointer"
      @click="redirect(item.id)">
      <div class="grid sm:grid-cols-2">
        <p class="capitalize text-lg font-bold">{{ item.name }}</p>

        <p class="text-sm md:justify-self-end">{{ item.location }}</p>
      </div>

      <p class="break-words">{{ item.description }}</p>
    </div>
  </div>
</template>
