<template>
<div class="flex px-5 bg-deep-purple sm:px-10 lg:px-32 items-center mx-auto">
    <div class="flex flex-col w-full">
        <div class="flex items-center justify-between w-full">
            <router-link to="/client">
                <img class="w-32 py-10" src="../assets/img/logo.svg" alt="">
            </router-link>
            <div @click="toggleBurger = !toggleBurger" class="cursor-pointer md:hidden">
                <svg v-if="!toggleBurger" xmlns="http://www.w3.org/2000/svg" class="w-10 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
                <svg v-if="toggleBurger" xmlns="http://www.w3.org/2000/svg" class="w-10 fill-current text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </div>
            <div class="hidden md:flex align-middle">
                <a class="mr-3 md:mr-5" v-for="img in images" :key="img.img"  :href="img.link">
                    <img class="w-5 h-5" :src="img.img" alt="">
                </a>
            </div>
        </div>
        <div v-if="toggleBurger" class="mb-5 text-xl">
            <router-link to="/client">
                <div class="text-white py-3">Мои акции</div>
            </router-link>
            <router-link to="/analytics">
                <div class="text-white py-3">Аналитика</div>
            </router-link>
        </div>
    </div>
</div>    
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const toggleBurger = ref(false)
        const images = ref([
            { img: '/img/tg.svg', link: 'https://t.me/drwn_trade'},
            { img: '/img/yt.svg', link: 'https://www.youtube.com/channel/UCLbKokxJVsqfraWGYKtC7Uw'},
        ])

        return {
            toggleBurger,
            images
        }
    },
})
</script>
