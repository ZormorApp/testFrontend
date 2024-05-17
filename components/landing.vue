<template>
  <section class="flex-1 flex justify-center items-center home bg-gray-900 bg-opacity-50">
    <div
      class="w-screen flex justify-center items-center">
      <div class="text-center cursor-pointer">
        <h1 class="text-6xl font-bold uppercase font-sans text-orange-500">
          welcome to Zormor
        </h1>
        <p class="text-2xl font-sans">
          Know more about us and <br />
          what we do
        </p>
        <NuxtLink
          to="/about"
          class="btn2 inline-block hover:bg-orange-400 m-2 font-bold uppercase"
          >about us</NuxtLink
        >

        <NuxtLink
          to="/all-places"
          class="btn2 inline-block hover:bg-orange-400 m-2 font-bold uppercase"
          >Browse Places</NuxtLink
        >
      </div>
    </div>
  </section>
</template>

<style scoped></style>
