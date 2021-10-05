<template>
  <div :class="bug.closed === true ? 'col-12 mt-3 bg-dark text-white' : 'col-12 mt-3'">
    <div :class=" bug.priority >= 5 ? 'high-priority row shadow-sm rounded bug-card py-3' : 'row shadow-sm rounded bug-card py-3'" @click="goToBugPage(bug.id)">
      <div class="col-md-2">
        <h6 class="">
          {{ bug.title }}
        </h6>
      </div>
      <div class="col-md-3">
        <h6>{{ bug.priority }}</h6>
      </div>
      <div class="col-md-3">
        <h6 v-if="bug.creator">
          {{ bug.creator.name }}
        </h6>
      </div>
      <div class="col-md-2">
        <h6>Last Updated</h6>
      </div>
      <div class="col-md-2">
        <h6 v-if="bug.closed === false">
          Open
        </h6>
        <h6 v-if="bug.closed === true">
          Closed
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import { Bug } from '../models/Bug'
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

<style>

</style>
