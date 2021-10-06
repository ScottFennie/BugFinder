<template>
  <div :class="bug.bug.closed === true ? 'col-12 mt-3 bg-dark text-white' : 'col-12 mt-3'">
    <div :class=" bug.bug.priority >= 5 ? 'high-priority row shadow-sm rounded bug-card py-3' : 'row shadow-sm rounded bug-card py-3'" @click="goToBugPage(bug.bug.id)">
      <div class="col-md-2">
        <h6 class="">
          {{ bug.bug.title }}
        </h6>
      </div>
      <div class="col-md-3">
        <h6>{{ bug.bug.priority }}</h6>
      </div>
      <div class="col-md-3">
        <h6 v-if="bug.bug.creator">
          {{ bug.bug.creator.name }}
        </h6>
      </div>
      <div class="col-md-2">
        <h6>{{ new Date(bug.bug.updatedAt).toDateString() }}</h6>
      </div>
      <div class="col-md-2">
        <h6 v-if="bug.bug.closed === false">
          Open
        </h6>
        <h6 v-if="bug.bug.closed === true">
          Closed
        </h6>
      </div>
    </div>
  </div>
</template>

<script>
import { Bug } from '../models/Bug'
import { router } from '../router'
import { bugService } from '../services/BugService'
import Pop from '../utils/Pop'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup() {
    return {
      async goToBugPage(bugId) {
        try {
          await bugService.gotToBugPage(bugId)
          router.push({ name: 'BugInfo', params: { bugId: bugId } })
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
