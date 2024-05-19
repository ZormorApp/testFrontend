<script setup>
const route = useRoute()
const placesStore = usePlacesStore()

const { locationId } = route.params

const place = placesStore.allPlaces.find(
  (item) => item.id === Number(locationId)
)

console.log(typeof locationId, place)
</script>

<template>
  <div class="flex-1 container py-4">
    <div v-if="place" class="flex flex-col gap-2">
      <div class="grid grid-cols-1 md:grid-cols-2 md:items-center">
        <p class="capitalize font-bold text-3xl">{{ place.name }}</p>

        <p class="md:justify-self-end capitalize font-bold">
          {{ place.location }}
        </p>
      </div>

      <div
        v-for="period in place.openPeriods"
        class="grid grid-cols-2 font-bold">
        <p class="capitalize">{{ period.days.join(", ") }}</p>

        <p class="justify-self-end self-center">
          {{ `${period.start} - ${period.end}` }}
        </p>
      </div>

      <p>{{ place.description }}</p>
    </div>

    <div
      v-else
      class="h-full flex flex-col justify-center items-center gap-4 text-center text-xl">
      <p class="text-5xl">Error</p>

      <p>Sorry the page you're looking for doesn't exist</p>
    </div>
  </div>
</template>
