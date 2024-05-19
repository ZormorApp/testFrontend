<script setup lang="ts">
const placesStore = usePlacesStore()

const data = placesStore.allPlaces

const redirect = async (id: number) => {
  await navigateTo(`/zormor/${id}`)
}
</script>

<template>
  <div class="flex-1 py-4 container h-auto min-h-screen grid gap-4 text-white">
    <div
      v-for="item in data"
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
