<template>
  <header class="sticky top-0 shadow-sm bg-black h-30 w-full">
    <nav class="container mx-auto p-4 flex justify-between items-center">
      <NuxtLink to="/">
        <NuxtImg height="8" src="/logo.svg" />
      </NuxtLink>
      <div>
        <NuxtLink to="/signup" class="font-bold btn m-2 uppercase"
          >sign up</NuxtLink
        >
      </div>
    </nav>
  </header>
</template>
