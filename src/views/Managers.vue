<template>
  <div class="container">
    <h1>Managers</h1>
    <div class="row">
      <Manager v-for="manager in managers" :key="manager.number" :manager="manager" />
    </div>
  </div>
</template>

<script>
import Manager from "@/components/Manager.vue";

export default {
  components: {
    Manager
  },
  data() {
    return {
      managers: [
        {
          name: "John Doe",
          agency: 1000
        },
        {
          name: "Jane Doe",
          agency: 2000
        },
        {
          name: "Batman",
          agency: 3000
        },
        {
          name: "Coringa",
          agency: 4000
        }
      ]
    };
  }
};
</script>

<style></style>
