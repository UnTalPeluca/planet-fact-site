import { defineStore } from "pinia";
import data from "@/assets/json/data.json";

export const planetsStore = defineStore("planets", {
  state: () => ({
    currentPlanet: localStorage.getItem("lastPlanet")
      ? JSON.parse(localStorage.getItem("lastPlanet"))
      : 2,
    currentSection: "overview",
    planets: data,
  }),
  actions: {
    setCurrentPlanet(payload) {
      this.currentPlanet = payload;
      this.currentSection = "overview";
    },
    setCurrentSection(payload) {
      this.currentSection = payload;
    },
  },
  getters: {
    currentPlanetData() {
      return this.planets[this.currentPlanet];
    },
  },
});
