<template>
  <div class="container">
    <h1>Register</h1>

    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" v-model="user.name" />
      </div>
      <div class="form-group">
        <label for="name">E-mail</label>
        <input type="text" class="form-control" v-model="user.email" />
      </div>
      <div class="form-group">
        <label for="name">Password</label>
        <input type="password" class="form-control" v-model="user.password" />
      </div>

      <button class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    user: {
      name: '',
      email: '',
      password: ''
    }
  }),
  methods: {
    async onSubmit() {
      const { data } = await this.$http.post('auth/register', this.user);

      this.$router.push({ name: 'Login' });
    }
  }
};
</script>
