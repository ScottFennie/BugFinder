<template>
  <div class="col-12 mt-3">
    <div class="row shadow-sm rounded py-2">
      <div class="col-2">
        <h6 class="">
          {{ bug.title }}
        </h6>
      </div>
      <div class="col-3">
        <h6>{{ bug.priority }}</h6>
      </div>
      <div class="col-3">
        <h6>{{ bug.creator.name }}</h6>
      </div>
      <div class="col-2">
        <h6>Last Updated</h6>
      </div>
      <div class="col-2">
        <h6>{{ bug.closed }}</h6>
      </div>
    </div>
  </div>
</template>

<script>
import Pop from '../utils/Pop'
import { bugService } from '../services/BugService'
import { Bug } from '../models/Bug'
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
export default {
  props: {
    bug: {
      type: Bug,
      required: true
    }
  },
  setup() {
    return {
      account: computed(() => AppState.account),
      async getBugs() {
        try {
          await bugService.getBugs()
        } catch (error) {
          Pop.toast(error)
        }
      }
    }
  }

}
</script>

<style>

</style>
