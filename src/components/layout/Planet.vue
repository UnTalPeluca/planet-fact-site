<template>
  <div class="planet">
    <div class="container">
      <ol class="planet__menu" aria-label="planet-section-navigation">
        <li
          v-for="(section, index) in sections"
          :key="index"
          @click="store.setCurrentSection(index)"
          class="menu__item"
          :class="
            index === store.currentSection
              ? [
                  `border-bottom-${store.currentPlanetData.name.toLowerCase()}`,
                  `bg-${store.currentPlanetData.name.toLowerCase()}`,
                ]
              : ''
          "
        >
          <span class="item__name item__short-name">{{
            section.name.short.toUpperCase()
          }}</span>
          <span class="item__name">{{ section.name.full.toUpperCase() }}</span>
        </li>
      </ol>
      <div
        class="planet__image"
        :class="`height-${store.currentPlanetData.name.toLowerCase()}`"
      >
        <img
          class="image_overview"
          v-if="store.currentSection === 'overview'"
          :src="getPlanetImg(sections['overview'].img)"
          alt=""
        />
        <img
          class="image__structure"
          v-else-if="store.currentSection === 'structure'"
          :src="getPlanetImg(sections['structure'].img)"
          alt=""
        />
        <span v-else class="image__geology-wrapper">
          <img
            class="image__overview"
            :src="getPlanetImg(sections['overview'].img)"
            alt=""
          />
          <img
            class="image__geology"
            :src="getPlanetImg(sections['geology'].img)"
            alt=""
          />
        </span>
      </div>
      <div class="planet__info">
        <h2 class="info__name">
          {{ store.currentPlanetData.name.toUpperCase() }}
        </h2>
        <p class="info__description">
          {{ store.currentPlanetData[store.currentSection].content }}
        </p>
        <div class="info__source">
          Source :
          <a :href="store.currentPlanetData[store.currentSection].source"
            >Wikipedia<img src="@/assets/icons/icon-source.svg" alt="" />
          </a>
        </div>
      </div>
      <ul class="planet__stats">
        <li class="stats__stat" v-for="(stat, index) in stats" :key="index">
          <h4 class="stat__name stat__name--short">
            {{ stat.shortName.toUpperCase() }}
          </h4>
          <h4 class="stat__name">{{ stat.name.toUpperCase() }}</h4>
          <p class="stat__value">
            {{ store.currentPlanetData[index].toUpperCase() }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { planetsStore } from "@/stores/planets";
import { mapState, mapActions } from "pinia";

export default {
  setup() {
    const store = planetsStore();
    const sections = {
      overview: {
        name: {
          short: "overview",
          full: "overview",
        },
        img: "planet",
      },
      structure: {
        name: {
          short: "structure",
          full: "internal structure",
        },
        img: "internal",
      },
      geology: {
        name: {
          short: "surface",
          full: "surface geology",
        },
        img: "geology",
      },
    };
    const stats = {
      rotation: {
        shortName: "rotation",
        name: "rotation time",
      },
      revolution: {
        shortName: "revolution",
        name: "revolution time",
      },
      radius: {
        shortName: "radius",
        name: "radius",
      },
      temperature: {
        shortName: "average temp.",
        name: "average temp.",
      },
    };

    function getPlanetImg(img) {
      return new URL(
        `../../assets/images/planets/${store.currentPlanetData.images[img]}`,
        import.meta.url
      ).href;
    }
    return {
      getPlanetImg,
      store,
      sections,
      stats,
    };
  },
};
</script>

<style lang="scss">
.planet {
  position: relative;
  .container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 275px auto auto;
    @include respond(md) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 460px auto auto;
      grid-template-areas:
        "image image"
        "info menu"
        "stats stats";
    }
    @include respond(lg) {
      padding-top: 32px;
      width: 1110px;
      grid-template-columns: 1fr 350px;
      grid-template-rows: calc(720px * 0.65) calc(720px * 0.35) auto;
      grid-template-areas:
        "image info"
        "image menu"
        "stats stats";
    }
    .planet__menu {
      display: flex;
      justify-content: space-between;
      &::before {
        content: "";
        position: absolute;
        top: 49px;
        left: 0;
        border-bottom: $border;
        width: 100vw;
      }
      .menu__item {
        @include h3;
        position: relative;
        letter-spacing: 1.93px;
        font-size: map-get($text, sm);
        padding: 21px 0;
        cursor: pointer;
        .item__name {
          display: none;
          font-weight: bold;
          &.item__short-name {
            display: block;
            opacity: 0.5;
          }
        }
      }
      @include respond(md) {
        grid-area: menu;
        flex-direction: column;
        justify-content: center;
        width: 281px;
        margin-left: auto;
        counter-reset: item;
        list-style-type: none;
        gap: 16px;
        &::before {
          display: none;
        }
        .menu__item {
          padding: 16px 0;
          border: $border;
          transition: background-color 250ms ease;
          &:hover {
            background-color: $bg-hover;
          }
          .item__name {
            display: block;
            &::before {
              content: counter(item, decimal-leading-zero) " ";
              counter-increment: item;
              padding: 0 20px;
              opacity: 0.5;
            }
            &.item__short-name {
              display: none;
            }
          }
        }
      }
      @include respond(lg) {
        align-self: flex-start;
        width: 100%;
        .menu__item {
          padding: 19px 0;
          font-size: map-get($text, md);
        }
      }
    }
    .planet__image {
      margin: auto;
      width: 100%;
      display: flex;
      img {
        margin: 0 auto;
        object-fit: contain;
        max-width: 100%;
      }
      .image__geology-wrapper {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        object-fit: contain;
        max-width: 100%;
        .image__geology {
          position: absolute;
          top: 25%;
          height: 125px;
        }
      }
      @include respond(md) {
        grid-area: image;
        .image__geology-wrapper {
          .image__geology {
            top: 32.5%;
            height: 200px;
          }
        }
      }
      @include respond(lg) {
        grid-area: image;
        transform: translateX(-75px);
        .image__geology-wrapper {
          .image__geology {
            top: 62.5%;
          }
        }
      }
    }
    .planet__info {
      display: flex;
      flex-direction: column;
      gap: 16px;
      text-align: center;
      .info__name {
        font-size: map-get($text, 4xl);
      }
      .info__description {
        font-size: map-get($text, base);
        line-height: 22px;
      }
      .info__source {
        font-size: map-get($text, md);
        opacity: 0.5;
        padding: 18px 0 32px 0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        a {
          color: $text-primary;
          font-weight: bold;
          display: flex;
          align-items: flex-end;
          img {
            padding-left: 4px;
          }
        }
      }
      @include respond(md) {
        gap: 24px;
        grid-area: info;
        text-align: start;
        max-width: 339px;
        .info__name {
          font-size: map-get($text, 5xl);
        }
        .info__source {
          margin-right: auto;
        }
      }
      @include respond(lg) {
        align-self: flex-end;
        max-width: 350px;
        height: 100%;
        padding-top: 100px;
        .info__name {
          font-size: map-get($text, 6xl);
        }
        .info__description {
          font-size: map-get($text, lg);
          line-height: 25px;
        }
        .info__source {
          font-size: map-get($text, lg);
          margin-top: auto;
          padding: 24px 0 38px 0;
        }
      }
    }
    .planet__stats {
      display: flex;
      flex-direction: column;
      gap: 8px 0;
      .stats__stat {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: $border;
        padding: 12px 24px;
        .stat__name {
          display: none;
          font-size: map-get($text, xs);
          letter-spacing: 0.75px;
          line-height: 16px;
          opacity: 0.5;
          &.stat__name--short {
            display: block;
          }
        }
        .stat__value {
          font-family: $antonio;
          font-size: map-get($text, xl);
          letter-spacing: -0.75px;
        }
      }
      @include respond(md) {
        grid-area: stats;
        flex-direction: row;
        justify-content: space-between;
        gap: 10px;
        .stats__stat {
          flex-direction: column;
          align-items: flex-start;
          padding: 14px 16px;
          width: 100%;
          gap: 10px;
          .stat__name {
            display: block;
            letter-spacing: 0.75px;
            &.stat__name--short {
              display: none;
            }
          }
          .stat__value {
            font-size: map-get($text, 2xl);
          }
        }
      }
      @include respond(lg) {
        grid-area: stats;
        flex-direction: row;
        justify-content: space-between;
        gap: 30px;
        .stats__stat {
          flex-direction: column;
          align-items: flex-start;
          padding: 24px 20px;
          width: 100%;
          gap: 10px;
          .stat__name {
            font-size: map-get($text, base);
            &.stat__name--short {
              display: none;
            }
          }
          .stat__value {
            font-size: map-get($text, 4xl);
          }
        }
      }
    }
  }
}
</style>
