<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-4 d-flex justify-content-between">
        <h3 class="text-pink">
          Bugs
        </h3>
        <button class="btn btn-primary text-white button-pink" data-bs-target="#bug-modal" data-bs-toggle="modal">
          Report Bug
        </button>
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
            <h6>Reported By</h6>
          </div>
          <div class="col-md-2">
            <h6>Last Updated</h6>
          </div>
          <div class="col-md-2">
            <h6 class="selectable" @click="toggleClosed()">
              Closed/Open
            </h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Bug :bug="b" v-for="b in bugs" :key="b.id" />
    </div>
  </div>

  <Modal id="bug-modal">
    <template #modal-title class="text-pink">
      Add A Bug
    </template>
    <template #modal-body>
      <BugForm />
    </template>
  </Modal>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { bugService } from '../services/BugService'
import Pop from '../utils/Pop'
import { AppState } from '../AppState'
export default {
  setup() {
    const ascending = ref(true)
    const closed = ref(false)

    function prioritySorter(a, b) {
      if (ascending.value) {
        return b.priority - a.priority
      }
      return a.priority - b.priority
    }

    function onlyOpen(b) {
      if (closed.value) {
        return b.closed === true
      }
      return true
    }
    onMounted(async() => {
      try {
        await bugService.getBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      ascending,
      closed,
      bugs: computed(() => AppState.bugs.filter(onlyOpen).sort(prioritySorter)),
      toggleAscending() {
        ascending.value = !ascending.value
      },
      toggleClosed() {
        closed.value = !closed.value
      }
    }
  }
}
</script>

<style scoped lang="scss">

.text-pink{
color: #E62D90;
}
.button-pink{
background-color: #E62D90;
border: none;
}
</style>
