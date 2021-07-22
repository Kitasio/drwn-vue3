<template>
  <div>
      <input type="email" placeholder="email" v-model="email">
      <input type="password" placeholder="password" v-model="password">
      <div @click="login" class="text-white">Login</div>
      <div v-if="isLogged" class="text-base-green">Logged in</div>
  </div>
</template>

<script>
import { auth } from '../composables/fireConf'
export default {
    data() {
        return {
            email: '',
            password: '',
            user: null,
            isLogged: '',

            errorCode: null,
            errorMessage: null
        }
    },
    methods: {
        login: function() {
            auth.signInWithEmailAndPassword(this.email, this.password)
            .then(u => {
                this.user = u.user
                this.isLogged = true
                this.$router.push('/admin')
            })
            .catch((error) => {
                this.errorCode = error.code;
                this.errorMessage = error.message;
                this.isLogged = false
                console.log(this.errorCode, this.errorMessage)
            })
        },
    },
}
</script>

<style>

</style>