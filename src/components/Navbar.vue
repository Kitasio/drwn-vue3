<template>
<div class="bg-deep-purple">
    <div class="md:flex md:align-middle mx-auto max-w-screen-2xl">
        <div class="h-32 sm:mx-10 lg:mx-32 flex align-middle justify-around">
            <router-link class="main-logo w-32 flex align-middle" to="/">
                <img class="w-32" src="../assets/img/logo.svg" alt="">
            </router-link>
            <svg @click="isHidden = !isHidden" xmlns="http://www.w3.org/2000/svg" class="burger w-8 cursor-pointer sm:hidden" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="isHidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </div>

        <div id="menu" :class="{ hidden: isHidden }" class="uppercase text-white flex flex-col md:flex-row ml-14 font-ttnorms">
            <router-link to="/review" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">обзоры</router-link>
            <router-link to="/education" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">обучение</router-link>
            <router-link to="/ideas" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">идеи</router-link>
            <router-link to="/contacts" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">контакты</router-link>
        </div>

        <div :class="{ hidden: isHidden }" class="flex self-center pb-5 sm:pb-0 cursor-pointer ml-14 sm:mb-0 sm:ml-auto sm:mr-10 lg:mr-32">
            <!-- <img class="w-7 mr-2 h-5" src="@/assets/img/ru.png" alt="">
            <img class="w-7 mr-2 h-5" src="@/assets/img/en.png" alt=""> -->
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            isHidden: this.menuHidden(),
        }
    },
    methods: {
        menuHidden: function() {
            if (window.innerWidth <= 640) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped>
.burger {
    color: white;
}
@media screen and (min-width: 640px) {
    .links:hover {
        border-bottom: 2px solid #00ff4a;
        /* text-decoration: underline; */
        /* text-decoration-color: #00ff4a; */
    }
    .router-link-exact-active {
        border-bottom: 2px solid #00ff4a;
    }
    .main-logo {
        border-bottom: none !important;
    }
}


</style>