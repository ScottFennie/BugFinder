<template>
  <div class="col-12 mt-3">
    <div :class=" bug.priority >= 5 ? 'high-priority row shadow-sm rounded bug-card py-3' : 'row shadow-sm rounded bug-card py-3'" @click="goToBugPage(bug.id)">
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
        <h6 v-if="bug.closed === false">
          Open
        </h6>
        <h6 v-if="bug.closed === true">
          Open
        </h6>
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
import { router } from '../router'
export default {
  props: {
    bug: {
      type: Bug,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async getBugs() {
        try {
          await bugService.getBugs()
        } catch (error) {
          Pop.toast(error)
        }
      },
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

<style lang="scss">
.bug-card{
    border:none;
    transition: transform .2s;
}
.bug-card:hover{
 border: 1px solid #E62D90;
 cursor: pointer;
 transform: scale(1.02);
}
.high-priority{
background-color: #fd65b646;
}

</style>
