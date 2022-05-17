<template>
  <div class="header">
    <div class="container header__container">
      <h1 class="header__title">THE PLANETS</h1>
      <div
        tabindex="1"
        class="dropdown"
        ref="menuBtn"
        :class="isMenuOpen ? 'show-menu' : ''"
        aria-label="menu-button"
      >
        <img src="@/assets/icons/icon-hamburger.svg" alt="" />
        <nav class="dropdown__menu" aria-label="primary-nav">
          <ul class="menu__planets container">
            <li
              tabindex="1"
              v-for="(planet, index) in store.planets"
              :key="index"
              class="planets__item"
              :class="`marker-${planet.name.toLowerCase()}`"
              @click="clickOnPlanet(index)"
            >
              <span>{{ planet.name.toUpperCase() }}</span>
              <img src="@/assets/icons/icon-chevron.svg" alt="" />
            </li>
          </ul>
        </nav>
      </div>
      <nav class="header__menu" aria-label="primary-navigation">
        <ul class="menu__planets">
          <li
            @click="clickOnPlanet(index)"
            v-for="(planet, index) in store.planets"
            :key="index"
            class="planets__item"
            :class="[`hover-border-top-${planet.name.toLowerCase()}`]"
          >
            {{ planet.name.toUpperCase() }}
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { planetsStore } from "@/stores/planets";
import { watch, ref } from "vue";

export default {
  setup() {
    // Store
    const store = planetsStore();
    // Data
    const isMenuOpen = ref(false);
    const menuBtn = ref(null);
    //Methods
    function clickOnPlanet(index) {
      store.setCurrentPlanet(index);
      this.isMenuOpen = false;
    }
    // Watchers
    watch(
      () => store.currentPlanet,
      () => {
        localStorage.setItem("lastPlanet", store.currentPlanet);
      }
    );

    return {
      store,
      isMenuOpen,
      menuBtn,
      clickOnPlanet,
    };
  },
  created() {
    document.addEventListener("click", (e) => {
      if (
        this.menuBtn === e.target ||
        (this.isMenuOpen && !this.menuBtn.contains(e.target))
      ) {
        this.isMenuOpen = !this.isMenuOpen;
      }
    });
  },
};
</script>

<style lang="scss">
.header {
  border-bottom: $border;
  position: relative;
  .header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
    @include respond(md) {
      display: flex;
      flex-direction: column;
      gap: 38px;
    }
    @include respond(lg) {
      flex-direction: row;
      width: 95%;
      max-width: 1368px;
      .header__title {
        width: 100%;
      }
    }
    .dropdown {
      cursor: pointer;
      @include respond(md) {
        display: none;
      }
      img {
        vertical-align: middle;
        pointer-events: none;
      }
      &.show-menu {
        .dropdown__menu {
          display: block;
          visibility: visible;
          opacity: 1;
          pointer-events: auto;
        }
      }
      .dropdown__menu {
        transition: all 250ms ease;
        opacity: 0;
        z-index: 1000;
        position: absolute;
        pointer-events: none;
        left: 50%;
        top: 100%;
        transform: translateX(-50%);
        width: 100%;
        background-color: $bg-primary;
        box-shadow: 0px 16px 30px -10px rgba(70, 96, 187, 0.2);
        .menu__planets {
          position: relative;
          .planets__item {
            @include planet-item;
            position: relative;
            padding: 18px 0;
            padding-left: 44px;
            font-size: 15px;
            border-bottom: $border-alt;
            display: flex;
            justify-content: space-between;
            align-items: center;
            span {
              font-weight: bold;
            }
            &:nth-last-child(1) {
              border-bottom: none;
            }
          }
        }
      }
    }
    .header__menu {
      display: none;
      @include respond(md) {
        display: block;
        width: 100%;
      }
      .menu__planets {
        @include respond(md) {
          display: flex;
          justify-content: space-between;
          .planets__item {
            @include planet-item;
            position: relative;
            opacity: 0.75;
            letter-spacing: 1px;
            line-height: 25px;
            font-size: map-get($text, base);
            cursor: pointer;
            padding: 12px 0;
          }
        }
      }
    }
  }
}
</style>
