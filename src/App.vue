<template>
  <router-view/>
</template>
<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

export default Vue.extend({
  name: 'App'
})

</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}
</style>
