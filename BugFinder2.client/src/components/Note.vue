<template>
  <div class="shadow-sm my-2 rounded">
    <div class="col-12">
      <h5>Creator Name</h5>
    </div>
    <div class="col-12">
      <p>{{ note.body }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Note } from '../models/Note'
export default {
  props: {
    note: {
      type: Note,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account)

    }
  }

}
</script>

<style>

</style>
