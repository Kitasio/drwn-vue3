<template>
  <StockNav />
  <div class="grad text-white relative font-ttnorms mt-10 p-5 rounded-md shadow-brand w-11/12 lg:w-10/12 mx-auto md:flex justify-between md:py-20 lg:py-32 lg:px-10 xl:pb-40 xl:px-20 2xl:pb-64 2xl:px-32">
      <div class="flex flex-col justify-between h-full">
          <h1 class="font-benzin-semibold text-2xl md:text-3xl">Система<br> аналитики<br> ваших акций</h1>
          <img class="hidden md:block absolute bottom-0 w-1/3 2xl:w-1/4" src="../assets/img/man.svg" alt="">
      </div>
      <div class="mt-8 md:mt-0">
          <div class="flex space-x-5 justify-center font-benzin-semibold">
              <button @click="toggleLogin = !toggleLogin" :class="{'text-base-green': toggleLogin}" class="text-light-purple">Вход</button>
              <button @click="toggleLogin = !toggleLogin" :class="{'text-base-green': !toggleLogin}" class="text-light-purple">Регистрация</button>
          </div>

          <div v-if="toggleLogin">
            <h1 class="font-benzin-semibold mt-5 text-center">Войдите в свой аккаунт</h1>
            <form @submit.prevent="login" class="space-y-5 mt-5 font-benzin-semibold md:w-2/3 mx-auto">
                <input v-model="email" type="email" class="rounded w-full bg-transparent border-2 border-light-purple placeholder-light-purple focus:placeholder-base-green focus:ring-0 focus:border-base-green" placeholder="Введите почту">
                <input v-model="password" type="password" class="rounded w-full bg-transparent border-2 border-light-purple placeholder-light-purple focus:placeholder-base-green focus:ring-0 focus:border-base-green" placeholder="Пароль">
                <div class="flex mt-3 justify-center">
                    <button class="px-5 py-3 rounded border-2 border-light-purple hover:border-base-green text-light-purple hover:text-base-green transition duration-200" type="submit">Войти</button>
                </div>
            </form>
          </div>
          <div v-if="!toggleLogin">
            <h1 class="font-benzin-semibold mt-5 text-center">Пройдите регистрацию</h1>
            <form @submit.prevent="register" class="space-y-5 mt-5 font-benzin-semibold md:w-2/3 mx-auto">
                <input v-model="email" type="email" class="rounded w-full bg-transparent border-2 border-light-purple placeholder-light-purple focus:placeholder-base-green focus:ring-0 focus:border-base-green" placeholder="Введите почту">
                <input v-model="password" type="password" class="rounded w-full bg-transparent border-2 border-light-purple placeholder-light-purple focus:placeholder-base-green focus:ring-0 focus:border-base-green" placeholder="Пароль">
                <div class="flex mt-3 justify-center">
                    <button class="px-5 py-3 rounded border-2 border-light-purple hover:border-base-green text-light-purple hover:text-base-green transition duration-200" type="submit">Регистрация</button>
                </div>
            </form>
          </div>

          <div v-if="errorMessage" class="text-base-red text-center mt-5">Wrong username or password</div>
          <div v-if="emailSent" class="text-base-green text-center mt-5">Мы послали вам письмо на {{ email }}</div>
      </div>
  </div>
</template>

<script>
import { auth } from '../composables/fireConf'
import StockNav from '../components/StockNav.vue'
export default {
    components: {
        StockNav,
    },
    data() {
        return {
            email: '',
            password: '',
            user: null,

            errorCode: null,
            errorMessage: null,
            toggleLogin: true,
            emailSent: false,

        }
    },
    methods: {
        login: function() {
            auth.signInWithEmailAndPassword(this.email, this.password)
            .then(u => {
                if (u.user.email == 'admin@drwn.biz') {
                    this.user = u.user
                    this.$router.push('/admin')
                } else {
                    this.user = u.user
                    this.$router.push('/client')
                }
            })
            .catch((error) => {
                this.errorCode = error.code;
                this.errorMessage = error.message;
                console.log(this.errorCode, this.errorMessage)
            })
        },
        register: function() {
            auth.createUserWithEmailAndPassword(this.email, this.password)
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            });

            var actionCodeSettings = {
                url: 'https://drwn.biz',
                handleCodeInApp: true
            };
            auth.onAuthStateChanged(user => {
                if (user) {
                    console.log(user)
                    this.user = user
                    user.sendEmailVerification(actionCodeSettings)
                    .then(() => {
                        this.emailSent = true
                    })
                } else {
                    this.user = null
                }
            })
        },
    },
}
</script>
