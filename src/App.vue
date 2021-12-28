<template>
  <div id="app">
    hello {{ $store.state.name }}
    <p>num :{{ $store.state.num }}</p>
    <p>doubleNum: {{ $store.getters.doubleNum }}</p>
    <div>
      <button @click="syncAdd">add</button>
      <button @click="asyncMinus">minus</button>
    </div>
  </div>
</template>

<style></style>
<script>
export default {
  name: "app",
  methods: {
    syncAdd() {
      this.$store.state.num++;
      // this.$store.commit("syncAdd", 2);
    },
    asyncMinus() {
      this.$store.dispatch("asyncMinus", 6);
    },
  },
};
</script>
