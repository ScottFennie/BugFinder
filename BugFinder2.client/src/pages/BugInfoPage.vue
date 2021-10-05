<template>
  <div class="container-fluid">
    <div class="row bg-img">
      <div class="col-12 px-0 d-flex justify-content-between align-items-center">
        <h1 class="text-white mt-3 ms-5">
          {{ bug.title }}
        </h1>
        <div class="me-3" v-if="bug.creatorId === account.id">
          <button class="btn button-white text-pink text-white mt-2 me-5" v-if="bug.closed === false" @click="closeBug()">
            Close
          </button>
        </div>
      </div>
      <div class="col-12">
        <div class="mx-5 mt-3 row py-3 bg-white rounded shadow-sm spill">
          <div class="col-12" v-if="account.id === bug.creatorId">
            <form @submit.prevent="editBug()" class="mb-3" v-if="bug.closed === false">
              <div class="row">
                <div class="col-12">
                  <h5 class="mb-2 t-color">
                    Edit Bug
                  </h5>
                  <input type="text"
                         class="form-control bg-white mb-2"
                         id="exampleFormControlInput1"
                         placeholder="Bug Title"
                         v-model="editable.title"
                         name="title"
                         required
                  >
                </div>
                <div class="col-12">
                  <div class="input-group mb-2">
                    <input type="number"
                           class="form-control bg-white"
                           name="weight"
                           placeholder="Priority (1-5)"
                           aria-label="Recipient's username"
                           aria-describedby="button-addon2"
                           min="1"
                           max="5"
                           v-model="editable.priority"
                           required
                    >
                  </div>
                </div>
                <div class="col-12">
                  <div class="input-group mb-2">
                    <input type="text"
                           class="form-control bg-white"
                           name="description"
                           placeholder="Add Description"
                           aria-label="Recipient's username"
                           aria-describedby="button-addon2"
                           v-model="editable.description"
                           required
                    >
                  </div>
                </div>
                <div class="col-md-2">
                  <button type="submit" class="p-1 px-3 btn button-pink text-white" title="Create a Task" data-bs-dismiss="modal" aria-label="Close">
                    <i class="mdi mdi-plus f-16" title="Add Task" />
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div class="col-4 d-flex flex-column">
            <h6 class="ms-2">
              reported by
            </h6>
            <div class="">
              <h3 class="ms-2" v-if="bug.creator">
                {{ bug.creator.name }}
              </h3>
            </div>
          </div>
          <div class="col-3 d-flex flex-column">
            <h6>Priority</h6>
            <h5>{{ bug.priority }}</h5>
          </div>
          <div class="col-3 d-flex flex-column">
            <h6>Last Updated</h6>
            <h5>Jan 5 1997</h5>
          </div>
          <div class="col-2 d-flex flex-column">
            <h6>Status</h6>
            <h5 v-if="bug.closed === false">
              Open
            </h5>
            <h5 v-if="bug.closed === true">
              Closed
            </h5>
          </div>
          <div class="col-12">
            <h6 class="pt-5 ms-3">
              Description
            </h6>
            <p class="py-2 ms-3">
              {{ bug.description }}
            </p>
          </div>
          <div class="col-12">
            <button class="ms-2 mt-3 btn button-pink text-white" @click="createTrackedBug()" v-if="isTracked === false">
              Track
            </button>
            <button class="ms-2 mt-3 btn button-pink text-white" @click="deleteMyTrackedBug()" v-if="isTracked === true">
              Untrack
            </button>
            <div class="d-flex flex-row mt-3">
              <Trackers :bug="b" v-for="b in tbugs" :key="b.id" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mt-4">
        <div class="ms-2">
          <h3 class="ms-5 text-pink">
            Notes
          </h3>
        </div>
      </div>
      <div class="col-12">
        <div class="card mx-5 shadow-sm border-0">
          <div class="container-fluid">
            <div class="row">
              <div class="col-12">
                <h6 class="pt-2 ps-1">
                  Add New Note
                </h6>
              </div>
              <NoteForm />
              <Note :note="n" v-for="n in notes" :key="n.id" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { accountService } from '../services/AccountService'

export default {
  setup() {
    const route = useRoute()
    const editable = ref({})
    const tracked = ref(false)

    onMounted(async() => {
      await bugService.getBugById(route.params.bugId)
      await bugService.getNotesByBugId(route.params.bugId)
      await bugService.getTrackedBugs(route.params.bugId)
      await accountService.getMyTrackedBugs()
      await bugService.isTracked(route.params.bugId)
    })
    return {
      tracked,
      editable,
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes),
      account: computed(() => AppState.account),
      tbugs: computed(() => AppState.currentTrackedBugs),
      isTracked: computed(() => AppState.isTracked),

      async editBug() {
        try {
          await bugService.editBug(editable.value, route.params.bugId)
          Pop.toast('bug edited', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async createTrackedBug() {
        try {
          await bugService.createTrackedBug(route.params.bugId)
          Pop.toast('bug tracked', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async closeBug() {
        try {
          await bugService.closeBug(route.params.bugId)
          Pop.toast('bug closed', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      },
      async deleteMyTrackedBug() {
        try {
          await bugService.deleteMyTrackedBug(this.account.id)
          Pop.toast('bug untracked', 'success')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
      }
    }
  }
}

</script>

<style lang="scss">
.bg-img{
  background-image: url("https://www.xmple.com/wallpaper/blue-pink-gradient-linear-1920x1080-c2-1e90ff-ff1493-a-0-f-14.svg");
  background-size:  cover;
  background-position:  center center;
  height: 25vh;
  opacity: .9;
}
.spill{
  bottom: -100px;
}
.button-pink{
background-color: #E62D90;
border: none;
}
.button-white{
background-color: #E62D90;
color: #ffffff;
border: none;
}
.text-pink{
color: #E62D90;
}

</style>
