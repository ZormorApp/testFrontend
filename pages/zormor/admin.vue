<template>
    <div class="flex-1 container flex justify-center items-center h-screen">
      <div class="card">
        <h2 class="text-center uppercase font-bold">Create post</h2>
        <form>
          <label class="uppercase font-bold">Name</label>
          <input class="input" type="text" placeholder="enter name of place" />
          <label class="uppercase font-bold">Description</label>
          <input
            class="input"
            type="text"
            placeholder="enter place description" />
            <label class="uppercase font-bold">Location</label>
          <input
            class="input"
            type="text"
            placeholder="enter place location" />
            <label class="uppercase font-bold">Opening time</label>
          <input
            class="input"
            type="time"
            placeholder="enter opening time" />
            <label class="uppercase font-bold">Closing time</label>
          <input
            class="input"
            type="time"
            placeholder="enter closing time" />
            <label class="uppercase font-bold">Image</label>
          <input
            class="input"
            type="text"
            placeholder="enter place location" />
          <button type="submit" class="btn hover:bg-orange-400 font-bold">
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
  </script>
  
  <style scoped></style>