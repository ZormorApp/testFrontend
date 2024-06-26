<script setup>
import { QUERY_GET_ALL } from "~/constants"
// const userStore = inject('userStore')
const storageUser = ref(JSON.parse(localStorage.getItem('user')))

console.log('in navbar', storageUser.value)

const { data } = await useAsyncQuery(QUERY_GET_ALL)
const places = data.value.places

const searchModalOpen = ref(false)
const sideMenuOpen = ref(false)

const searchParam = ref("")

// contains list of place names that match the search query
const searchRes = computed(() =>
  places.filter((item) => {
    const cleanedInput = searchParam.value.trim().toLowerCase()
    return cleanedInput && item.name.toLowerCase().includes(cleanedInput)
  })
)

const handleSearchModal = (action) => {
  if (action === "open") {
    searchModalOpen.value = true
    sideMenuOpen.value = false
  } else {
    searchParam.value = ""
    searchModalOpen.value = false
  }
}

const redirect = async (id) => {
  searchModalOpen.value = false
  await navigateTo(`/zormor/${id}`)
}

const handleSignUp = async () => {
  sideMenuOpen.value = false
  await navigateTo("/signup")
}

const handleSignIn = async () => {
  sideMenuOpen.value = false
  await navigateTo("/signin")
}

const handleSignOut = async () => {
  sideMenuOpen.value = false

  // clear localstorage user
  for (const prop in storageUser.value) {
    // console.log(prop)
    if (storageUser.value.hasOwnProperty(prop)) {
      console.log(prop)
      storageUser.value[prop] = ""
    }
  }
  localStorage.setItem('user', JSON.stringify(storageUser.value))

  const route = useRoute()
  const {path} = route

  if (path === "/zormor/admin") {
    await navigateTo("/")
  }
}

const goToAddPage = async () => {
  sideMenuOpen.value = false
  await navigateTo("/zormor/admin")
}

// if window width becomes larger than 640px close the side menu
const disableSideMenu = () => {
  if (window.innerWidth >= 640) {
    sideMenuOpen.value = false
  }
}

const count = ref(0)

// watch(
//   newCheck.value,
//   () => {
//     count.value += 1
//   },
//   { deep: true }
// )

onMounted(() => {
  window.addEventListener("resize", disableSideMenu)
})

onUnmounted(() => {
  window.addEventListener("resize", disableSideMenu)
})
</script>

<template>
  <header class="sticky top-0 z-[5] shadow-sm bg-black h-30 w-full">
    <nav class="container mx-auto py-4 flex items-center">
      <NuxtLink to="/">
        <NuxtImg height="8" src="/logo.svg" />
      </NuxtLink>

      <div class="ms-auto flex gap-2 items-center">
        <button
          @click="handleSearchModal('open')"
          class="max-sm:hidden p-3 bg-chrome-yellow uppercase rounded-lg text-black font-bold text-sm">
          <img
            src="~/assets/images/magnifying-glass.svg"
            alt="search icon"
            width="16" />
        </button>

        <!-- show if no user is in localstorage -->
        <div v-if="!storageUser.id" class="max-sm:hidden flex items-center gap-x-2">
          <NuxtLink to="/signup" class="p-3 font-bold rounded-lg bg-chrome-yellow uppercase whitespace-nowrap text-black text-sm">
            sign up
          </NuxtLink>

          <NuxtLink
            to="/signin"
            class="p-3 font-bold rounded-lg bg-chrome-yellow uppercase whitespace-nowrap text-black text-sm">
            sign in
          </NuxtLink>
        </div>

        <!-- else if user in storage and user is admin -->
        <NuxtLink
          v-else-if="storageUser.id && storageUser.role === 'ADMIN'"
          to="/zormor/admin"
          class="max-sm:hidden p-3 font-bold rounded-lg bg-chrome-yellow uppercase whitespace-nowrap text-black text-sm">
          Add Place
        </NuxtLink>

        <!-- else if user in storage (so someone is logged in)-->
        <button
          v-if="storageUser.id"
          @click="handleSignOut"
          class="max-sm:hidden p-3 font-bold rounded-lg bg-chrome-yellow uppercase whitespace-nowrap text-black text-sm">
          sign out
        </button>

        <button class="sm:hidden p-3" @click="sideMenuOpen = true">
          <img
            src="~/assets/images/burger-menu.svg"
            alt="nav menu icon"
            width="24" />
        </button>
      </div>
    </nav>
  </header>

  <!-- Search bar modal start -->
  <div
    v-if="searchModalOpen"
    class="fixed top-0 bottom-0 h-screen w-screen py-24 flex flex-col items-center">
    <div
      @click="handleSearchModal('close')"
      class="absolute z-10 top-0 left-0 h-full w-full backdrop-blur-sm"></div>

    <div
      class="relative z-20 py-4 container w-5/6 sm:w-3/4 text-white rounded-lg bg-black">
      <div class="flex">
        <input
          class="flex-1 p-2 w-full outline-none border-grey border-2 rounded-md text-black"
          v-model="searchParam"
          placeholder="Search for places..." />
      </div>

      <div
        v-if="searchParam.length > 0"
        class="max-h-[300px] py-2 flex flex-col overflow-y-auto">
        <div v-if="searchRes.length > 0">
          <div
            v-for="item in searchRes"
            class="px-2 py-4 flex flex-col items-stretch gap-2 border-b-[1px] border-chrome-yellow hover:shadow-md hover:shadow-chrome-yellow cursor-pointer"
            @click="redirect(item.id)">
            <p class="capitalize font-bold">{{ item.name }}</p>

            <p class="truncate">{{ item.description }}</p>
          </div>
        </div>

        <div v-else>
          <p class="px-2 py-4">No results match your query</p>
        </div>
      </div>
    </div>
  </div>
  <!-- Search bar modal end -->

  <!-- Side menu for small screens start -->
  <div
    v-if="sideMenuOpen"
    class="fixed top-0 z-[50] bottom-0 h-screen w-screen py-24 flex flex-col items-center">
    <div
      class="absolute top-0 bottom-0 z-[51] h-full w-full backdrop-blur-sm"
      @click="sideMenuOpen = false"></div>

    <div
      class="absolute top-0 right-0 z-[52] py-4 px-2 w-[250px] h-full flex flex-col items-stretch bg-black gap-4">
      <button class="self-end" @click="sideMenuOpen = false">
        <img
          src="~/assets/images/close.svg"
          alt="close side menu icon"
          width="24" />
      </button>

      <button
        @click="handleSearchModal('open')"
        class="p-3 bg-chrome-yellow uppercase rounded-lg text-black font-bold">
        Search
      </button>

      <!-- show these buttons if there is no user in localstorage -->
        <button
          v-if="!storageUser.id"
          @click="handleSignUp"
          class="p-3 bg-chrome-yellow uppercase rounded-lg text-black font-bold">
          sign up
        </button>

        
        <button
          v-if="!storageUser.id"
          @click="handleSignIn"
          class="p-3 bg-chrome-yellow uppercase rounded-lg text-black font-bold">
          sign in
        </button>

        <!-- else show logout -->
        <button
          v-else
          @click="handleSignOut"
          class="p-3 bg-chrome-yellow uppercase rounded-lg text-black font-bold">
          sign out
        </button>

        <!-- if user in storage and user is admin -->
        <button
          v-if="storageUser.id && storageUser.role === 'ADMIN'"
          @click="goToAddPage"
          class="p-3 bg-chrome-yellow uppercase rounded-lg text-black font-bold">
          Add Place
        </button>
    </div>
  </div>
  <!-- Side menu for small screens end -->
</template>
