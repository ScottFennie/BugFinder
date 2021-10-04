<template>
  <div class="container-fluid">
    <div class="row bg-img">
      <div class="col-12 px-0 ">
        <h1 class="text-white mt-3 ms-5">
          {{ bug.title }}
        </h1>
      </div>
      <div class="col-12">
        <div class="mx-5 mt-3 row py-3 bg-white rounded shadow-sm spill">
          <div class="col-4 d-flex flex-column">
            <h6 class="ms-2">
              reported by
            </h6>
            <div class="">
              <h3 class="ms-2">
                Creator Name
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
            <h5>Open</h5>
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
            <button class="ms-2 mt-3 btn button-pink text-white">
              Track
            </button>
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
                <h6 class="pt-2 ps-2">
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
import { computed, onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
export default {
  setup() {
    const route = useRoute()
    onMounted(async() => {
      await bugService.getBugById(route.params.bugId)
      await bugService.getNotesByBugId(route.params.bugId)
    })
    return {
      bug: computed(() => AppState.bug),
      notes: computed(() => AppState.notes)
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
.text-pink{
color: #E62D90;
}

</style>
