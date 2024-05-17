<template>
  <div class="flex-1 py-4 container h-auto min-h-screen grid gap-4 text-white">
    <div
      v-for="items in [1, 2, 3, 4, 5, 6]"
      class="p-4 border-[1px] border-amber-300 rounded-lg hover:shadow-md hover:shadow-amber-200 hover:cursor-pointer">
      <div class="grid sm:grid-cols-2">
        <p class="capitalize text-lg font-bold">Name of Place</p>

        <p class="text-sm md:justify-self-end">Location</p>
      </div>

      <p class="break-words">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        cursus dolor a sem convallis, eu cursus purus eleifend. Phasellus
        sagittis nibh id sem interdum volutpat. Proin placerat, sem non accumsan
        vehicula, eros purus accumsan eros, ac elementum lacus neque nec dolor.
        Cras ultrices rutrum neque, nec hendrerit leo scelerisque sit amet.
        Pellentesque faucibus turpis neque, efficitur aliquet neque ultricies
        vel. Fusce nec arcu semper, fringilla arcu euismod, ornare augue. Sed
        felis sapien, vulputate eget tellus sit amet, dictum mattis lacus.
        Curabitur viverra nunc et ante tincidunt, non pharetra eros imperdiet.
        Morbi tempor tempor sem facilisis consequat. Proin porta nec arcu in
        posuere.
      </p>
    </div>
  </div>
</template>
