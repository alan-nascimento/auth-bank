<template>
  <div class="container">
    <h1>Managers</h1>
    <div class="row">
      <Manager
        v-for="manager in managers"
        :key="manager.number"
        :manager="manager"
      />
    </div>
  </div>
</template>

<script>
import Manager from '@/components/Manager.vue';

export default {
  components: {
    Manager
  },
  data() {
    return {
      managers: []
    };
  },
  async mounted() {
    const { data } = await this.$http.get('managers');

    this.managers = data;
  }
};
</script>

<style></style>
