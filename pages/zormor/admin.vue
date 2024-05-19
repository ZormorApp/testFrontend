<template>
  <div class="container py-4 flex justify-center items-center">
    <div class="">
      <h2 class="text-center uppercase font-bold">Create post</h2>

      <form class="grid gap-4">
        <div class="grid">
          <label class="mb-2 uppercase font-bold">Name</label>
          <input class="input" type="text" placeholder="enter name of place" v-model="placeName" />
          <ErrorMessage :message="errors.name"/>
        </div>

        <div class="grid">
          <label class="mb-2 uppercase font-bold">Description</label>
          <input
            class="input"
            type="text"
            placeholder="enter place description" v-model="placeDescription" />
            <ErrorMessage :message="errors.description"/>
        </div>

        <div class="grid">
          <label class="mb-2 uppercase font-bold">Location</label>
          <input class="input" type="text" placeholder="enter place location" v-model="placeLocation" />
          <ErrorMessage :message="errors.location"/>
        </div>

        <!-- <label class="uppercase font-bold">Opening time</label>
        <input class="input" type="time" placeholder="enter opening time" />

        <label class="uppercase font-bold">Closing time</label>
        <input class="input" type="time" placeholder="enter closing time" /> -->

        <label class="uppercase font-bold">Image</label>
        <input class="input" type="text" placeholder="enter place location" />

        <div class="mb-4">
          <div class="flex flex-col gap-3">
            <p class="uppercase font-bold">Open Hours:</p>

            <div class="flex flex-wrap gap-x-4 gap-y-2">
              <button v-for="item in DAYS_OF_WEEK" @click="() => handleDays(item)" :class="`w-12 p-2 aspect-square grid place-items-center rounded-full border-[1px] border-chrome-yellow hover:bg-chrome-yellow/30 capitalize text-sm ${usedDays.includes(item) ? 'bg-chrome-yellow text-black' : ''}`" type="button">
                <span>{{item}}</span>
              </button>
            </div>

            <div v-for="(item, index) in openPeriods" class="py-2 flex justify-between gap-2 border-b-[1px] border-chrome-yellow">
              <div class="flex-1 grid md:grid-cols-3 items-center gap-2">
                <div class="grid grid-cols-2 gap-2">
                  <label for="start">Start:</label>
                  <input type="time" @input="(e) => handlePeriod(e.target.value, 'start')" :value="item.start" class="bg-transparent outline-none text-white"/>
                </div>

                <div class="grid grid-cols-2 gap-2">
                  <label for="start">End:</label>
                  <input type="time" @input="(e) => handlePeriod(e.target.value, 'end')" :value="item.end" class="bg-transparent outline-none text-white"/>
                </div>

                <div class="capitalize">
                  {{item.days.join(", ")}}
                </div>
              </div>

              <button v-if="openPeriods.length > 1" class="p-2 grid place-items-center" type="button" @click="() => deletePeriod(index)">
                <img src="~/assets/images/trash-can.svg" width="16" alt="delete button" />
              </button>
            </div>

            <button type="button" :class="`p-2 w-max ${canAddPeriod} ? '' : 'hidden'`" @click="addNewPeriod">
              <img src="~/assets/images/add.svg" width="16"/>
            </button>
          </div>

          <ErrorMessage :message="errors.openPeriods"/>
        </div>

        <button type="button" class="btn hover:bg-orange-400 font-bold" @click="handleSubmit">
          Create
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: "zormor | create",
  meta: [{ name: "description", content: "zormor creation screen " }],
})

// form Data
const placeName = ref("")
const placeDescription = ref("")
const placeLocation = ref("")
const openPeriods = ref([
  {days: [], start: '', end: ''}
])

const DAYS_OF_WEEK = ["mon", "tue", "wed", "thur", "fri", "sat", "sun"];

const pointer = ref(0)

const usedDays = ref(openPeriods.value.map(item => item.days).flat(1))
const canAddPeriod = ref(true)

const handleDays = (day) => {
  // get all days currently in openPeriods
  // const usedDays = openPeriods.value.map(item => item.days).flat(1)
  if (!usedDays.value.includes(day)) {
    // if the selected day is not already in use, add it to the current days
    openPeriods.value[pointer.value].days.push(day)
    usedDays.value.push(day)
  } else if (openPeriods.value[pointer.value].days.includes(day)) {
    // if the selected day is part of the currently active period, remove it
    const indexInPeriods = openPeriods.value[pointer.value].days.indexOf(day)
    const indexInUsedDays = usedDays.value.indexOf(day)

    openPeriods.value[pointer.value].days.splice(indexInPeriods, 1)
    usedDays.value.splice(indexInUsedDays, 1)
    // canAddPeriod = true
  }
}

const handlePeriod = (value, type) => {
  if (type === 'start') {
    openPeriods.value[pointer.value].start = value
  } else if (type === 'end') {
    openPeriods.value[pointer.value].end = value
  }
}

const addNewPeriod = () => {
  // cannot add more than 7
  if (openPeriods.value.length >= 7) {
    canAddPeriod.value = false
    return
  }
  // cannot add if previous is not filled
  // const allValues = Object.values(openPeriods.value[pointer.value])
  const prevStart = openPeriods.value[pointer.value].start
  const prevEnd = openPeriods.value[pointer.value].end
  const prevDays = openPeriods.value[pointer.value].days
  if (!prevStart || !prevEnd || prevDays.length === 0) {
    canAddPeriod.value = false
    return
  }
  // cannot add if all days used up
  if (DAYS_OF_WEEK.every(item => usedDays.value.includes(item))) {
    canAddPeriod.value = false
    return
  }
  // adding should increase pointer
  canAddPeriod.value = true
  pointer.value += 1
  openPeriods.value.push({days: [], start: '', end: ''})
}

const deletePeriod = (index) => {
  // only delete if openPeriods length is greater than 1
  if (openPeriods.value.length > 1) {
    openPeriods.value.splice(index, 1)
    pointer.value -= 1
    canAddPeriod.value = true
  }
}

const errors = ref({
  name: "",
  description: "",
  location: "",
  openPeriods: "",
})

const handleSubmit = () => {
  if (!handleErrors()) {
    console.log('there are errors in your form')
  } else {
    console.log('no errors')
  }
  // console.log(placeName.value)
}

const handleErrors = () => {
  let anyError = true
  const name = placeName.value.trim()
  const description = placeDescription.value.trim()
  const location = placeLocation.value.trim()
  
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
  
  if (!location) {
    anyError = false
    errors.value.location = "Please enter a valid location"
  } else {
    errors.value.location = ""
  }

  if (openPeriods.value.some(item => item.days.length === 0)) {
    errors.value.openPeriods = "Please fill in the days"
    anyError = false
  }
  else if (openPeriods.value.some(item => item.start === "")) {
    errors.value.openPeriods = "Please add the start hours"
    anyError = false
  }
  else if (openPeriods.value.some(item => item.end === "")) {
    errors.value.openPeriods = "Please add the end hours"
    anyError = false
  }
  else {
    errors.value.openPeriods = ""
  }

  return anyError
}

</script>

<style scoped></style>
