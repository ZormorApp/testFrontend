<script setup>
import { Loader } from "@googlemaps/js-api-loader"
const route = useRoute()
const placesStore = usePlacesStore()

const { locationId } = route.params

const place = placesStore.allPlaces.find(
  (item) => item.id === Number(locationId)
)

const allImages = place.images
const focusedImageIndex = ref(0)

const showImageFull = ref(false)

const handleImageFull = (action, index=0) => {
  if (action === 'close') {
    showImageFull.value = false
  }
  else if (action === 'open') {
    showImageFull.value = true
    focusedImageIndex.value = index
  }
}

const browse = (action) => {
  if (action === 'next') {
    if (focusedImageIndex.value + 1 >= allImages.length) {
      focusedImageIndex.value = 0
    } else {
      focusedImageIndex.value += 1
    }
  }
  else if (action === 'prev') {
    if (focusedImageIndex.value - 1 < 0) {
      focusedImageIndex.value = allImages.length - 1
    } else {
      focusedImageIndex.value -= 1
    }
  }
}
  // console.log(focusedImageIndex.value)

const loader = new Loader({
  apiKey: "AIzaSyA4AFlUsM8oyxBokx6pMWhaLyj2BHMCMVY",
  version: "weekly",
})

loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary("maps")
  const marker = { lat: place.latitude, lng: place.longitude }

  new Map(document.getElementById("mark"), {
    center: marker,
    zoom: 8,
  })
})

// console.log(typeof locationId, place)
</script>

<template>
  <div class="flex-1 container py-4">
    <div v-if="place" class="flex flex-col gap-4">
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

      <div v-if="allImages.length > 0">
        <p class="font-bold">Image Gallery</p>
        <div class="flex gap-2">
          <img v-for="(item, index) in allImages.filter((elem, index) => index < 5)" :src="item" width="100" class="aspect-square object-cover" @click="() => handleImageFull('open', index)" />
        </div>
      </div>

      <div class="relative">
        <p class="mb-2 uppercase font-bold">Location on Map:</p>
        <div
          id="mark"
          class="relative top-0 left-0 h-[300px] rounded-lg"></div>
      </div>
    </div>

    <div
      v-else
      class="h-full flex flex-col justify-center items-center gap-4 text-center text-xl">
      <p class="text-5xl">Error</p>

      <p>Sorry the page you're looking for doesn't exist</p>
    </div>

    <div v-if="showImageFull" class="fixed z-[50] top-0 left-0 w-screen h-screen flex flex-col items-center justify-center backdrop-blur-md">
      <div class="absolute z-[100] w-full h-full" @click="() => handleImageFull('close')"></div>

      <div class="relative z-[101] container w-5/6 py-4 flex gap-2 items-stretch justify-center bg-white rounded-lg">
        <button class="p-2 hover:bg-gray-300/50" @click="() => browse('prev')">
          <img src="~/assets/images/nav.svg" width="16" class="rotate-180"/>
        </button>

        <img :src="allImages[focusedImageIndex]" class="self-center flex-1 min-w-0 object-contain"/>

        <button class="p-2 hover:bg-gray-300/50" @click="() => browse('next')">
          <img src="~/assets/images/nav.svg" width="16"/>
        </button>
      </div>
    </div>
  </div>
</template>
