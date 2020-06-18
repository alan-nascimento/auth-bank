<template>
  <div class="container">
    <div class="jumbotron mt-2">
      <h1 class="display-4">Welcome!</h1>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { logoutMixin } from '@/mixins';

export default {
  name: 'home',
  mixins: [logoutMixin]
};
</script>
