<template>
  <div class="mx-1">
    <img :src="bug.tracker.picture" alt="" class="prof-img">
  </div>
</template>

<script>
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {

    }
  }

}
</script>

<style lang="scss">
.prof-img{
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
  height: 4vh;
  width: 4vh;
}

</style>
