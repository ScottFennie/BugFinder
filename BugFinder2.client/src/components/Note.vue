<template>
  <div class="shadow-sm note-card my-2 rounded">
    <div class="col-12 pt-2 d-flex justify-content-between">
      <div class="d-flex flex-row">
        <img :src="note.creator.picture" alt="" class="prof-img" v-if="note.creator">
        <h5 class="ms-2 pt-1" v-if="note.creator">
          {{ note.creator.name }}
        </h5>
      </div>
      <div class="div">
        <i class="mdi mdi-close text-danger f-20 selectable" @click="deleteNote()" title="Remove Note"></i>
      </div>
    </div>
    <div class="col-12">
      <p class="pt-2">
        {{ note.body }}
      </p>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import { Note } from '../models/Note'
import Pop from '../utils/Pop'
import { bugService } from '../services/BugService'
export default {
  props: {
    note: {
      type: Note,
      required: true
    }
  },
  setup(props) {
    return {
      account: computed(() => AppState.account),
      async deleteNote() {
        try {
          const yes = await Pop.confirm('Are you sure you want to delete this <em>note</em>?')
          if (!yes) { return }
          await bugService.deleteNote(props.note.id)
        } catch (error) {
          Pop.toast(error, 'error')
        }
      }

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
.note-card{
 border: 1px solid #ff79c18c;
}

</style>
