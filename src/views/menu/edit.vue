<template>
  <div class="menu-create">
    <CreateOrEdit :isEdit="true"></CreateOrEdit>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  components: {
    CreateOrEdit
  },
  data () {
    return {}
  }
})
</script>

<style>

</style>
