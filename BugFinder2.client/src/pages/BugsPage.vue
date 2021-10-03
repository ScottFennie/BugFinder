<template>
  <div class="container">
    <div class="row">
      <div class="col-12 mt-4 d-flex justify-content-between">
        <h3 class="text-pink">
          Bugs
        </h3>
        <button class="btn btn-primary text-white button-pink">
          Report Bug
        </button>
      </div>
      <div class="mt-5 col-12 border border-bottom-2 border-top-0 border-end-0 border-start-0">
        <div class="row rounded">
          <div class="col-2">
            <h6 class="">
              Title
            </h6>
          </div>
          <div class="col-3">
            <h6>Priority</h6>
          </div>
          <div class="col-3">
            <h6>Reported By</h6>
          </div>
          <div class="col-2">
            <h6>Last Updated</h6>
          </div>
          <div class="col-2">
            <h6>Closed/Open</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <Bug />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
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
