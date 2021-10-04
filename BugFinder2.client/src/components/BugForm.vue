<template>
  <form @submit.prevent="createBug()" class="mb-3">
    <div class="row">
      <div class="col-12">
        <h5 class="mb-2 t-color">
          New Bug
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
        <button type="submit" class="p-1 px-3 btn button-pink text-white" title="Create a Task">
          <i class="mdi mdi-plus f-16" title="Add Task" />
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { ref } from '@vue/reactivity'
import Pop from '../utils/Pop'
import { bugService } from '../services/BugService'
export default {
  setup() {
    const editable = ref({})
    return {
      editable,
      async createBug() {
        try {
          await bugService.createBug(editable.value)
          editable.value = ({})
          Pop.toast(' New Bug Reported')
        } catch (error) {
          Pop.toast(error.message, 'error')
        }
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
.high-priority{
background-color: #fd65b646;
}
</style>
