<template>
  <div class="col-12">
    <form @submit.prevent="createNote()">
      <div class="mb-3">
        <input v-model="editable.body" type="text" class="form-control bord bg-white mb-1" id="exampleFormControlInput1" placeholder="Type note here">
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { computed } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Pop'
import { bugService } from '../services/BugService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      bug: computed(() => AppState.bug),
      async createNote() {
        try {
          editable.value.bugId = this.bug.id
          await bugService.createNote(this.bug.id, editable.value)
        } catch (error) {
          Pop.toast(error)
        }
      }

    }
  }

}
</script>

<style lang="scss">
.bord{
    border-color: #E62D90;
    border-style: dashed;
    height: 5vh;
}

</style>
