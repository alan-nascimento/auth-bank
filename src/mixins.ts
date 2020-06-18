export const logoutMixin = {
  methods: {
    logout() {
      this.$store.commit('SIGN_OUT_USER');
      this.$router.push({ name: 'Login' });
    }
  },
}