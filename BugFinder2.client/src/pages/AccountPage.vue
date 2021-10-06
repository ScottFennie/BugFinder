<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-4 d-flex justify-content-between">
        <h3 class="text-pink">
          My Bugs
        </h3>
      </div>
      <div class="mt-5 col-12 border border-bottom-2 border-top-0 border-end-0 border-start-0">
        <div class="row rounded">
          <div class="col-md-2">
            <h6 class="">
              Title
            </h6>
          </div>
          <div class="col-md-3">
            <h6 class="selectable" @click="toggleAscending()">
              Priority
            </h6>
          </div>
          <div class="col-md-3">
            <!-- <h6>Reported By</h6> -->
          </div>
          <div class="col-md-2">
            <h6>Last Updated</h6>
          </div>
          <div class="col-md-2">
            <h6>Closed/Open</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <TrackedBug :bug="b" v-for="b in bugs" :key="b.id" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { accountService } from '../services/AccountService'
export default {
  name: 'Account',
  setup() {
    onMounted(async() => {
      await accountService.getMyTrackedBugs()
    })
    return {
      account: computed(() => AppState.account),
      bugs: computed(() => AppState.trackedBugs)

    }
  }
}
</script>

<style lang ="scss">
.text-pink{
color: #E62D90;
}
img {
  max-width: 100px;
}
</style>
