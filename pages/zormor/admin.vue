<template>
  <div class="container py-4 flex justify-center items-center">
    <div class="w-full">
      <h2 class="text-center uppercase font-bold">Create post</h2>

      <form class="grid gap-4">
        <div class="grid">
          <label class="mb-2 uppercase font-bold">Name</label>
          <input
            class="input"
            type="text"
            placeholder="enter name of place"
            v-model="placeName" />
          <ErrorMessage :message="errors.name" />
        </div>

        <div class="grid">
          <label class="mb-2 uppercase font-bold">Description</label>
          <input
            class="input"
            type="text"
            placeholder="enter place description"
            v-model="placeDescription" />
          <ErrorMessage :message="errors.description" />
        </div>

        <!-- <div class="grid">
          <label class="mb-2 uppercase font-bold">Location</label>
          <input
            class="input"
            type="text"
            placeholder="enter place location"
            v-model="placeLocation" />
          <ErrorMessage :message="errors.location" />
        </div> -->

        <div class="relative">
          <p class="mb-2 uppercase font-bold">Select location on map</p>
          <div
            id="map"
            class="relative top-0 z-1 left-0 h-[300px] rounded-lg text-black font-bold"></div>
          <ErrorMessage :message="errors.location" />
        </div>

        <!-- <label class="uppercase font-bold">Opening time</label>
        <input class="input" type="time" placeholder="enter opening time" />

        <label class="uppercase font-bold">Closing time</label>
        <input class="input" type="time" placeholder="enter closing time" /> -->

        <div class="grid">
          <label class="mb-2 uppercase font-bold">upload image(s)</label>
          <input id="image" type="file" accept="image/png, image/jpg, image/jpeg" multiple @change.prevent="handleImages"/>
          <!-- <input type="text" @change.prevent="handleImages"/> -->
        </div>

        <div class="mb-4">
          <div class="flex flex-col gap-3">
            <p class="uppercase font-bold">Open Hours:</p>

            <div class="flex flex-wrap gap-x-4 gap-y-2">
              <button
                v-for="item in DAYS_OF_WEEK"
                @click="() => handleDays(item)"
                :class="`w-12 p-2 aspect-square grid place-items-center rounded-full border-[1px] border-chrome-yellow hover:bg-chrome-yellow/30 capitalize text-sm ${usedDays.includes(item) ? 'bg-chrome-yellow text-black' : ''}`"
                type="button">
                <span>{{ item }}</span>
              </button>
            </div>

            <div
              v-for="(item, index) in openPeriods"
              class="py-2 flex justify-between gap-2 border-b-[1px] border-chrome-yellow">
              <div class="flex-1 grid md:grid-cols-3 items-center gap-2">
                <div class="grid grid-cols-2 gap-2">
                  <label for="start">Start:</label>
                  <input
                    type="time"
                    @input="(e) => handlePeriod(e.target.value, 'start')"
                    :value="item.start"
                    class="bg-transparent outline-none text-white" />
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label for="start">End:</label>
                  <input
                    type="time"
                    @input="(e) => handlePeriod(e.target.value, 'end')"
                    :value="item.end"
                    class="bg-transparent outline-none text-white" />
                </div>

                <div class="capitalize">
                  {{ item.days.join(", ") }}
                </div>
              </div>

              <button
                v-if="openPeriods.length > 1"
                class="p-2 grid place-items-center"
                type="button"
                @click="() => deletePeriod(index)">
                <img
                  src="~/assets/images/trash-can.svg"
                  width="16"
                  alt="delete button" />
              </button>
            </div>

            <button
              v-if="canAddPeriod"
              type="button"
              class="p-2 w-max"
              @click="addNewPeriod">
              <img src="~/assets/images/add.svg" width="16" />
            </button>
          </div>

          <ErrorMessage :message="errors.openPeriods" />
        </div>

        <button
          type="button"
          class="btn hover:bg-orange-400 font-bold"
          @click="handleSubmit">
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { Loader } from "@googlemaps/js-api-loader"

useHead({
  title: "zormor | create",
  meta: [{ name: "description", content: "zormor creation screen " }],
})

// form Data
const placeName = ref("")
const placeDescription = ref("")
const placeLocation = ref({ lat: "", long: "", location: "" })
const openPeriods = ref([{ days: [], start: "", end: "" }])
const images = ref([])

const errors = ref({
  name: "",
  description: "",
  location: "",
  openPeriods: "",
})

// points to current position of openPeriods that can be edited
const pointer = ref(0)

const DAYS_OF_WEEK = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"]

const usedDays = ref([])
const canAddPeriod = ref(true)

const handleDays = (day) => {
  // if the selected day is not already in use, add it to the current days
  if (!usedDays.value.includes(day)) {
    openPeriods.value[pointer.value].days.push(day)
  }
  // if the selected day is part of the currently active period, remove it
  else if (openPeriods.value[pointer.value].days.includes(day)) {
    const indexInPeriods = openPeriods.value[pointer.value].days.indexOf(day)

    openPeriods.value[pointer.value].days.splice(indexInPeriods, 1)
    canAddPeriod.value = true
  }
}

const handlePeriod = (value, type) => {
  if (type === "start") {
    openPeriods.value[pointer.value].start = value
  } else if (type === "end") {
    openPeriods.value[pointer.value].end = value
  }
}

const addNewPeriod = () => {
  pointer.value += 1
  openPeriods.value.push({ days: [], start: "", end: "" })
}

const deletePeriod = (index) => {
  // only delete if openPeriods length is greater than 1
  if (openPeriods.value.length > 1) {
    openPeriods.value.splice(index, 1)
    pointer.value -= 1
    canAddPeriod.value = true
  }
}

const handleImages = e => {
  const files = e.target.files
  // console.log(files)

  for (let i=0; i<files.length; i++) {
    const reader = new FileReader()
    reader.readAsDataURL(files[i])

    reader.onload = e => {
      // console.log(e.target.result)
      images.value.push(e.target.result)
    }
  }
}

// check for errors in form values
const handleErrors = () => {
  let anyError = true
  const name = placeName.value.trim()
  const description = placeDescription.value.trim()
  const location = placeLocation.value

  if (!name) {
    errors.value.name = "Please enter a valid name"
    anyError = false
  } else {
    errors.value.name = ""
  }

  if (!description) {
    anyError = false
    errors.value.description = "Please enter a valid description"
  } else {
    errors.value.description = ""
  }

  if (!location.lat || !location.long) {
    anyError = false
    errors.value.location = "Please choose a location on the map"
  } else {
    errors.value.location = ""
  }

  if (openPeriods.value.some((item) => item.days.length === 0)) {
    errors.value.openPeriods = "Please fill in the days"
    anyError = false
  } else if (openPeriods.value.some((item) => item.start === "")) {
    errors.value.openPeriods = "Please add the start hours"
    anyError = false
  } else if (openPeriods.value.some((item) => item.end === "")) {
    errors.value.openPeriods = "Please add the end hours"
    anyError = false
  } else {
    errors.value.openPeriods = ""
  }

  return anyError
}

// handle form submission
const handleSubmit = async () => {
  if (!handleErrors()) {
    console.log("there are errors in your form")
  }
  else {
    const placesStore = usePlacesStore()
    console.log("no errors")
    const payload = {
      id: placesStore.numOfPlaces + 1,
      name: placeName.value,
      description: placeDescription.value,
      location: placeLocation.value.location,
      latitude: placeLocation.value.lat,
      longitude: placeLocation.value.long,
      openPeriods: openPeriods.value,
      images: images.value
    }
    console.log(
      placeName.value,
      placeDescription.value,
      placeLocation.value,
      openPeriods.value,
      images.value
    )
    placesStore.addPlace(payload)
    navigateTo('/zormor')



    // const query = gql`
    //   mutation CreatePlace ($input: PlaceDto!) {
    //     createPlace (input: $input) {
    //       name
    //     }
    //   }
    // `
    // const variables = {
    //   name: placeName.value,
    //   description: placeDescription.value,
    //   location: placeLocation.value.location,
    //   latitude: String(placeLocation.value.lat),
    //   longitude: String(placeLocation.value.long),
    //   hours: JSON.stringify(openPeriods.value),
    //   locationImage: JSON.stringify(images.value)
    // }
    // const handler = useMutation(query, { variables })

    // console.log(useMutation(query, { variables }))
    // handler.mutate(variables)

    // mutate.then(res => {
    //   console.log('data sent successfully')
    //   // navigateTo(`/zormor`)
    // }).catch(err => {
    //   console.log(err)
    // })
    // const {data} = await mutate(variables)
    // console.log(data)

    // const query = gql`
    //   mutation Create() {
    //     createPlace(
    //       name: placeName.value,
    //       description: placeDescription.value,
    //       location: placeLocation.value.location,
    //       latitude: String(placeLocation.value.lat),
    //       longitude: String(placeLocation.value.long),
    //       hours: JSON.stringify(openPeriods.value),
    //       locationImage = JSON.stringify(images.value)
    //     ){}
    //   }
    
    // `

    // useAsyncQuery(query).then(res => {
    //   console.log('data sent successfully')
    //   navigateTo(`/zormor`)
    // }).catch(err => {
    //   console.log(err)
    // })
  }
}

// location logic here
const loader = new Loader({
  apiKey: "AIzaSyA4AFlUsM8oyxBokx6pMWhaLyj2BHMCMVY",
  version: "weekly",
})

loader.load().then(async () => {
  const { Map } = await google.maps.importLibrary("maps")
  const geocoder = await new google.maps.Geocoder();
  const accra = { lat: 5.5593, lng: -0.1974 }

  let map = new Map(document.getElementById("map"), {
    center: accra,
    zoom: 8,
  })

  let infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: accra,
    color: "#000000",
  })

  infoWindow.open(map)

  map.addListener("click", (event) => {
    // Close the current InfoWindow.
    infoWindow.close()
    // console.log(event.latLng.lng())
    const coordinates = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    }
    placeLocation.value.lat = coordinates.lat
    placeLocation.value.long = coordinates.lng

    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: event.latLng,
    })

    geocoder
    .geocode({ location: {lat: event.latLng.lat(), lng: event.latLng.lng()} })
    .then(res => {
      console.log(res)
      const data = res.results
      let address = ""

      if (data[1]) {
        address = data[1].formatted_address
        console.log('res1')
      } else {
        address = data[0].formatted_address
        console.log('res2')
      }
      infoWindow.setContent(`
        <div class="text-center font-bold">
          <p>${address}</p>
          <p>lat: ${coordinates.lat}, long: ${coordinates.lng}</p>
        </div>
      `)
      infoWindow.open(map)

      placeLocation.value.location = address
    })
    .catch(err => {
      console.log(err)
      infoWindow.setContent(`
        <p>Sorry cannot display location information right now</p>
      `)
      infoWindow.open(map)
    })
  })
})

watch(
  openPeriods,
  (curr) => {
    usedDays.value = curr.map((item) => item.days).flat(1)
  },
  { deep: true }
)

watch(
  [usedDays, openPeriods],
  () => {
    const prevStart = openPeriods.value[pointer.value].start
    const prevEnd = openPeriods.value[pointer.value].end
    const prevDays = openPeriods.value[pointer.value].days
    // cannot add if all days used up
    if (DAYS_OF_WEEK.every((item) => usedDays.value.includes(item))) {
      canAddPeriod.value = false
    }
    // cannot add if previous is not filled
    else if (!prevStart || !prevEnd || prevDays.length === 0) {
      canAddPeriod.value = false
    }
    // cannot add more than 7 since only 7 days in week
    else if (openPeriods.value.length >= 7) {
      canAddPeriod.value = false
    } else {
      canAddPeriod.value = true
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped></style>
