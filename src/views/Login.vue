<template>
  <div class="container">
    <h1>Login</h1>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">E-mail</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label for="name">Password</label>
        <input type="password" class="form-control" v-model="user.password" />
      </div>

      <p class="alert alert-danger" v-if="error.message">{{ error.message }}</p>
      <button class="btn btn-primary">Enter</button>

      <router-link :to="{ name: 'Register' }">
        Don't have an account? Click here!
      </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {
      email: '',
      password: ''
    },
    error: {
      message: ''
    }
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('signIn', this.user);

        this.$router.push({ name: 'Managers' });
        this.error.message = '';
      } catch (err) {
        if (err.request.status == 401) {
          this.error.message = 'Email or password is wrong!';
        }
      }
    }
  }
};
</script>
