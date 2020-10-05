<template>
  <div class="resource">
    <ResourceList />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResourceList from './components/list.vue'

export default Vue.extend({
  components: {
    ResourceList
  }
})
</script>

<style>

</style>
