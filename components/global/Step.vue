<template>
  <div class="step mb-24 relative">
    <div class="image-wrapper relative">
      <div class="md:pl-24 overflow-hidden">
        <div
          class="box md:rounded overflow-hidden relative mb-6 whitespace-no-wrap"
          :class="{ 'bg-accent': !darkMode, 'bg-base': darkMode }"
        >
          <c-image v-if="img" class="shadow-down-md" :alt="title" :src="img" />
          <div
            v-if="images"
            class="rails transition duration-300 ease-in-out"
            :style="{ transform: `translateX(-${sliderIndex * 100}%)` }"
          >
            <c-image
              v-for="(image, i) in images"
              :key="i"
              class="inline-block shadow-down-md transform -translate-x-1/2"
              :alt="title"
              :src="image"
            />
          </div>
          <template v-if="images">
            <ul
              class="flex md:hidden absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-4 justify-center"
            >
              <li
                v-for="(_, key) in images"
                :key="key"
                class="w-2 h-2 rounded-full border border-font-alt3 mr-2 last:mr-0"
                :class="{ 'border-none bg-accent': sliderIndex === key }"
              />
            </ul>
            <nav
              class="md:hidden absolute transform top-1/2 translate-y-1/2 w-full flex text-font-primary px-2"
            >
              <div
                v-if="sliderIndex"
                class="cursor-pointer shadow-down-md flex items-center justify-center w-8 h-8 rounded-full bg-body icon-chevron-left"
                @click="sliderIndex--"
              />
              <div
                v-if="sliderIndex < images.length - 1"
                class="cursor-pointer shadow-down-md flex items-center justify-center w-8 h-8 rounded-full bg-body icon-chevron-right ml-auto"
                @click="sliderIndex++"
              />
            </nav>
          </template>
        </div>
      </div>
    </div>

    <div class="number-wrapper relative flex">
      <div
        class="w-24 hidden md:block flex-shrink-0 font-semibold text-font-alt3 relative"
      >
        <div class="flex items-center">
          <div class="border bg-body rounded-full border-alt4">
            <div class="w-2 h-2 rounded-full bg-alt4 m-px"></div>
          </div>
          <div class="flex mx-auto">
            0
            <div class="number" />
            .
          </div>
        </div>
      </div>
      <div>
        <slot />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Getter } from 'nuxt-property-decorator'

@Component
export default class Steps extends Vue {
  @Getter darkMode
  @Prop() img
  @Prop() images
  @Prop() title
  sliderIndex = 0
}
</script>
<style lang="scss">
.step {
  .image-wrapper {
    width: calc(100% + 48px);
    @apply -ml-6;
  }
  @screen md {
    .image-wrapper {
      @apply w-full ml-0;
    }

    .rails {
      transform: unset !important;
    }
  }
  @screen md-max {
    .box {
      overflow: hidden;
      max-height: 400px;

      img {
        @apply origin-top-left transform scale-150;
      }
    }
    &:nth-child(3) {
      .box {
        img {
          @apply translate-x-0;

          &:first-child {
            @apply origin-top-right;
          }
        }
      }
    }
  }
  img {
    @apply m-0;
  }
  h2 {
    margin-top: 0 !important;
  }

  .c-button {
    @apply mt-6 inline-block;

    &:nth-of-type(1) {
      @apply mr-4;
    }
  }
}
</style>
