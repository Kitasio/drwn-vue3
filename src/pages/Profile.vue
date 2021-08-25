<template>
    <stock-nav></stock-nav>

    <div class="md:h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
        <div class="grid grid-cols-12 h-5/6">
            <stock-links class="hidden sm:inline"></stock-links>
            <div class="col-span-12 lg:col-span-10 pb-10">
                    <div id="box" class=" shadow-brand rounded-md px-5 md:px-10 py-5 flex flex-col justify-between md:flex-row">

                        <div class="flex flex-col justify-between">
                            <div class="flex flex-col mt-5 space-y-2">
                                <img class="w-20" src="../assets/img/avatar.svg" alt="">
                                <input v-model="userName" type="text" placeholder="Введите имя" class="rounded bg-transparent border-2 border-light-purple placeholder-light-purple focus:ring-0 focus:border-black">
                                <div class="font-benzin-semibold">{{user.email}}</div>
                                <button class="text-purple self-start">Сменить пароль</button>
                            </div>
                            <div class="flex mb-10 md:mb-3">
                                <button @click="updateName(userName)" class="py-3 px-2 border-2 border-black rounded-md">Сохранить</button>
                            </div>
                        </div>

                        <div class="flex flex-col justify-between space-y-5">
                            <div class="grad flex justify-between text-white px-5 pt-5 rounded-xl md:w-130 md:mt-5">
                                <h1 class="font-benzin-semibold md:text-3xl">Тариф<br> “Триал”</h1>
                                <div class="flex flex-col justify-between">
                                    <p class="md:text-lg text-right">Осталось 7 дней</p>
                                    <img class="w-32 mt-10 md:w-56" src="../assets/img/right-man.svg" alt="">
                                </div>
                            </div>
                            <div class="flex mb-10 md:mb-3 md:justify-end">
                                <button @click="logout(); router.push('/login');" class="py-3 px-2 border-2 border-base-red text-base-red rounded-md">Выйти</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import authFuncs from '../composables/authFuncs'
import StockLinks from "../components/StockLinks.vue"
import StockNav from "../components/StockNav.vue"
import { useRouter } from 'vue-router' 

export default defineComponent({
    components: {
        StockLinks,
        StockNav,
    },
    setup() {
        const router = useRouter()
        const userName = ref('')
        const { user, getUser, updateName, logout } = authFuncs()
        getUser()

        watchEffect(() => {
            try {
                userName.value = user.value.displayName
            } catch (error) {
                
            }
        })

        return {
            user,
            userName,
            updateName,
            logout,
            router,
        }
    },
})
</script>
