import { defineStore } from "pinia"
import { PLACES_DB } from "~/data/mock-db"

export const usePlacesStore = defineStore('placesStore', {
  state: () => ({
    'name': 'Places Database',
    'description': 'Mock database for holding information about all places',
    'data': PLACES_DB as any
  }),
  getters: {
    allPlaces: state => state.data
  },
  // actions: {
  //   fetch() {
  //     this.data = PLACES_DB
  //   }
  // }
})