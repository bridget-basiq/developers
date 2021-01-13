<template>
  <RightAside class="playground" :large="true">
    <div class="container flex flex-col">
      <slot />
    </div>
  </RightAside>
</template>
<style lang="scss">
.playground {
  top: 34px;
  width: 512px;

  .container {
    height: calc(100vh - 64px);

    > * {
      @apply flex-1 overflow-scroll;

      &:first-child {
        @apply bg-off-body;

        header {
          @apply top-0;
        }
      }
    }
  }

  .code-block {
    @apply m-0 rounded-none border-0 border-b;

    code {
      @apply pr-8;
    }

    header {
      @apply bg-transparent border-b-0 h-auto pt-6;
    }

    header,
    pre {
      @apply px-8;
    }

    pre {
      @apply py-6;
    }
  }
}
</style>
