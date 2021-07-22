<template>
  <div class="h-screen w-full flex items-center justify-center">
      <div class="p-5 shadow-brand rounded-md flex flex-col h-96 w-96 space-y-5">
        <div class="font-benzin-semibold text-xl mb-5">Login page</div>
        <input type="email" placeholder="email" v-model="email" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
        <input type="password" placeholder="password" v-model="password" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
        <div class="flex">
            <button class="py-3 px-5 rounded-md border-2 border-black" @click="login">Login</button>
        </div>
        <div v-if="errorMessage" class="text-base-red">Wrong username or password</div>
      </div>
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

            errorCode: null,
            errorMessage: null
        }
    },
    methods: {
        login: function() {
            auth.signInWithEmailAndPassword(this.email, this.password)
            .then(u => {
                this.user = u.user
                this.$router.push('/admin')
            })
            .catch((error) => {
                this.errorCode = error.code;
                this.errorMessage = error.message;
                console.log(this.errorCode, this.errorMessage)
            })
        },
    },
}
</script>

<style>

</style>