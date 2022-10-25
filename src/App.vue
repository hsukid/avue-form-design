<template>
  <div id="app">
    <avue-form-design
      ref="fd"
      style="height: 100vh"
      :options="options"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import msg from './utils/msg'
export default {
  name: 'app',
  data() {
    return {
      customFields: [],
      options: {}
    }
  },
  methods: {
    handleSubmit(val) {
      msg.post(val)
    }
  },
  mounted() {
    // 监听导入JSON
    msg.listener(this.$refs.fd?.importor)
  },
  beforeDestroy() {
    // 销毁时取消监听
    msg.unlisten()
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
</style>
