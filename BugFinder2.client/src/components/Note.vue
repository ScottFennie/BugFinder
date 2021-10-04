<template>
  <div class="shadow-sm my-2 rounded">
    <div class="col-12 d-flex justify-content-between">
      <h5 class="pt-2">
        Creator Name
      </h5>
      <div class="div">
        <i class="mdi mdi-close text-danger f-20 selectable" @click="deleteNote()" title="Remove Note"></i>
      </div>
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

<style>

</style>
