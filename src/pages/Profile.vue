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
                                <div @click="toggleName = !toggleName" class="text-lg">{{userName}}</div>
                                <div v-if="toggleName">
                                    <input v-model="userName" type="text" placeholder="Введите имя" class="rounded bg-transparent border-2 border-light-purple placeholder-light-purple focus:ring-0 focus:border-black">
                                </div>

                                <div class="font-benzin-semibold">{{user.email}}</div>
                                <button @click="togglePassword = !togglePassword" class="text-purple self-start">Сменить пароль</button>
                                <button v-if="user.diplayName == ''" @click="toggleName = !toggleName" class="text-purple self-start">Добавит имя</button>

                                <a target="_blank" class="text-purple self-start" href="https://my.cloudpayments.ru/unsubscribe">Отменить подписку</a>

                                <div v-if="togglePassword" class="space-y-3">
                                    <input v-model="pass1" type="password" class="rounded bg-transparent border-2 border-light-purple placeholder-light-purple focus:ring-0 focus:border-black" placeholder="Введите новый пароль">
                                    <input v-model="pass2" type="password" class="rounded bg-transparent border-2 border-light-purple placeholder-light-purple focus:ring-0 focus:border-black" placeholder="Повторите пароль">
                                    <div v-if="passwordUpdated" class="mt-5">Вы успешно сменили пароль</div>
                                    <div v-if="passwordUpdatedError" class="mt-5 text-base-red">Что-то пошло не так</div>
                                </div>
                            </div>
                            <div class="flex mb-10 md:mb-0">
                                <button @click="updateName(userName); updatePass(); toggleName = false;" class="py-3 px-2 border-2 border-black rounded-md">Сохранить</button>
                            </div>
                        </div>

                        <div class="flex flex-col justify-between space-y-5">

                            <div v-if="hasAccess()" class="grad flex justify-between text-white px-5 pt-5 rounded-xl md:w-130 md:mt-5">
                                <div class="flex flex-col justify-between">
                                    <h1 class="font-benzin-semibold md:text-3xl">Тариф<br> “Трейдер”</h1>
                                    <router-link to="/tariffs" class="border-2 mb-5 cursor-pointer border-white px-4 py-3 rounded text-center text-lg">Тарифы</router-link>
                                </div>
                                <div class="flex flex-col justify-between">
                                    <p class="md:text-lg text-right">{{days}}</p>
                                    <img class="w-5/6 self-end mt-24 md:w-full" src="../assets/img/right-man.svg" alt="">
                                </div>
                            </div>

                            <div v-else class="grad-pink flex justify-between text-white px-5 pt-5 rounded-xl md:w-130 md:mt-5">
                                <div class="flex flex-col justify-between">
                                    <h1 class="font-benzin-semibold md:text-3xl">Тариф<br> “Старт”</h1>
                                    <router-link to="/tariffs" class="border-2 mb-5 cursor-pointer border-white px-4 py-3 rounded text-center text-lg">Тарифы</router-link>
                                </div>
                                <div class="flex flex-col justify-between">
                                    <p class="md:text-lg text-right">Бесплатно</p>
                                    <svg width="158" height="244" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path d="M127.595 112.949c.547 1.439 8.636-.297 18.073-3.874 9.438-3.578 12.184-6.301 11.637-7.737-.547-1.436-4.179-1.05-13.617 2.53s-16.648 7.646-16.093 9.081z" fill="#370522"/><path d="M128.784 153.845c-3.037.47-7.873.406-7.873.406s9.904-39.819 12.008-51.15c.673-3.62 18.073-9.98 18.472 5.61.307 12.302-19.881 31.165-20.834 41.271-.181 1.929-1.193 3.774-1.773 3.863z" fill="url(#paint0_linear)"/><path d="M130.112 152.712s1.033 13.879-3.332 11.389c-4.704-2.687-14.189-1.095-14.189-1.095s.842-8.462 4.647-9.596c9.014-2.686 9.381-8.945 9.381-8.945l3.493 8.247z" fill="url(#paint1_linear)"/><path d="M94.62 71.456c2.578-4.598 11.535-9.53 21.899-5.128 10.364 4.402 24.986 13.914 40.7 34.872 0 0-17.43.374-29.586 11.832 0 0-19.997-11.423-27.058-19.39-7.061-7.968-8.797-17.116-5.955-22.186z" fill="url(#paint2_linear)"/><path d="M120.579 211.429c6.004 6.299 8.606 6.95 17.083 25.434 2.401 5.239 11.686 48.754 11.686 48.754-2.895 4.456-26.88-3.174-40.237-.495 0 0-17.99-44.449-17.99-75.466.005-8.462 18.98-9.219 29.458 1.773z" fill="url(#paint3_linear)"/><path d="M129.254 160.111c1.698 7.15 2.515 54.599-1.191 62.165-2.642 5.39-32.389 18.754-35.144 3.736-2.422-13.191-9.611-57.266-8.987-65.114.601-7.566 40.212-22.268 45.322-.787z" fill="url(#paint4_linear)"/><path d="M130.946 223.979l.523-.394c-5.531-7.341-15.405-4.043-15.504-4.008l.213.619c.094-.02 9.525-3.174 14.768 3.783zM82.766 145.268c.336-5.039 17.855-13.429 31.15-12.211l3.838 46.716c-1.149 1.344-4.858 6.932-5.551 8.452-5.276 11.575-10.069 19.631-21.978 22.827-3.32-22.933-7.863-59.781-7.46-65.784z" fill="#370522"/><path d="M82.157 218.514c2.924 8.195 17.163 46.221 5.534 72.358-4.457 2.889-25.405-4.704-38.705-6.834 0 0-5.637-48.899 5.987-84.94 2.595-8.046 22.08 5.11 27.184 19.416z" fill="url(#paint5_linear)"/><path d="M115.668 154.098c-1.084 7.269-24.23 67.146-30.49 72.789-4.456 4.02-20.935 4.979-29.318-7.784-8.383-12.763 13.951-74.099 17.455-81.15 3.382-6.811 45.614-5.694 42.353 16.145z" fill="url(#paint6_linear)"/><path d="M75.217 67.172c-10.421 6.348-14.464 22.02-15.214 48.947-.75 26.927-5.556 44.458-2.6 51.445 0 0 31.091 28.313 76.367 10.25 0 0-1.379-7.702-4.457-41.079-3.077-33.376-3.001-42.43-7.442-55.458-4.442-13.028-25.526-24.902-31.218-21.77-5.692 3.132-7.393 2.76-15.436 7.665z" fill="url(#paint7_linear)"/><path d="M19.284 20.523c3.489 8.153 13.602 20.78 17.472 29.819 4.103 9.581-13.565 26.078-19.895 8.819-4.242-11.567-7.346-37.799-7.346-37.799s8.819-3.06 9.77-.839z" fill="url(#paint8_linear)"/><path d="M10.26 4.504c-2.257-.448-7.867-1.04-9.1 1.387-1.233 2.426 4.077 1.317 4.077 1.317s-3.585.95-3.164 1.876c.421.926 2.867 1.587 4.984 1.008 2.117-.58 6.073-.42 6.734-1.448.661-1.028.391-3.37-3.53-4.14z" fill="url(#paint9_linear)"/><path d="M15.719 52.663c-2.852-10.398-4.748-27.1-6.732-32.945 0 0 4.845-6.64 6.15-5.291 2.956 3.063 18.143 30.056 18.445 30.906-1.131 2.263-16.214 6.754-17.863 7.33z" fill="url(#paint10_linear)"/><path d="M17.047 22.54A33.92 33.92 0 0017.66 9.25c-1.154-7.125-3.412-7.79-9.066-8.977-5.655-1.186-2.61 1.812-1.394 2.582 1.215.77 5.585 1.924 5.268 3.865 0 0-6.437 3.976-3.713 9.475.264.532.247 1.592.247 3.385-.017 2.01 8.046 2.958 8.046 2.958z" fill="url(#paint11_linear)"/><path d="M55.978 56.804S38.815 48.1 35.28 47.128c-7.811-2.146-21.225 7.544-17.618 14.333 3.607 6.788 16.078 17.18 28.74 21.787 12.66 4.607 23.752-18.093 9.576-26.444z" fill="url(#paint12_linear)"/><path d="M54.085 55.195l.263-.584c-.139-.065-13.93-6.23-19.084-8.047l-11.158-18.63-.55.329 11.28 18.828.109.04c5.038 1.755 19.002 8 19.14 8.064z" fill="#370522"/><path d="M86.856 86.86c-1.294 4.187-4.352 8.618-14.998 8.349-10.646-.27-29.534-7.859-42.74-16.435 0 0 4.093-23.755 20.403-28.192 0 0 23.411 14.147 30.537 19.393 7.125 5.246 8.224 12.273 6.798 16.885z" fill="url(#paint13_linear)"/><path d="M45.863 75.909c0 .101.495 10.173 11.2 13.174l.18-.63c-10.246-2.868-10.724-12.47-10.726-12.566l-.654.022z" fill="#370522"/><path d="M31.642 68.565a48.075 48.075 0 00-3.08 10.03l-.027.165.118.12c.151.148 15.251 14.914 32.367 17.622l.101-.646c-16.093-2.548-30.42-15.92-31.886-17.33.228-1.239 1.82-9.198 6.338-15.898l-.542-.366a38.455 38.455 0 00-3.39 6.303zM80.864 218.809c3.882-4.395 10.465-2.62 10.53-2.602l.274.076 11.285-25.54-.597-.263-11.061 25.031c-1.342-.297-7.237-1.305-10.921 2.864l.49.434zM104.523 153.044c7.922 0 12.844-4.342 12.918-4.409l-.438-.495c-.109.099-11.035 9.72-26.652-.367l-.354.55c5.484 3.55 10.411 4.721 14.526 4.721zM91.395 279.469c.037-.121 3.76-12.52-2.476-39.199l-.636.148c6.19 26.491 2.535 38.734 2.498 38.855l.614.196z" fill="#370522"/><path d="M99.453 48.781l.379 12.585s-8.202 5.53-14.243.792l.822-12.107 13.042-1.27z" fill="url(#paint14_linear)"/><path d="M85.805 59.046s2.288-2.451 4.937-7.276l-4.52 1.109-.417 6.167z" fill="#750B3B"/><path d="M82.844 55.781c2.498.52 12.943-3.203 14.934-6.56.708-1.196.888-4.576.572-6.257-.99-5.271.351-11.077-3.427-12.941-1.592-.78-8.774-1.538-10.322-1.812-6.053-1.085-5.823 6.783-6.466 11.923-.726 5.756.307 14.714 4.709 15.647z" fill="url(#paint15_linear)"/><path d="M80.641 30.958c.552.267 2.255.968 2.255.968s.352 4.355.963 5.989c.612 1.634-1.638 7.281-4.661 7.76-3.023.477-1.204 3.745-.973 5.141.329 1.996-1.573 4.058 2.154 5.487 2.475.953 8.808-.305 7.266-4.308-1.542-4.004-4.239-9.022-1.327-13.303 2.912-4.28-.611 5.313 4.729 8.913 5.34 3.6 6.734 4.987 6.734 4.987s.792-2.229 2.352-2.741c1.56-.513 6.11-5.742 6.437-12.627.327-6.885-2.746-9.294-8.821-10.656-6.076-1.362-3.84-3.887-7.633-4.704-3.793-.817-8.512-5.509-8.512-5.509S75.58 28.5 80.641 30.959z" fill="url(#paint16_linear)"/><path d="M92.613 42.66c-1.114 2.186-3.535 3.184-5.41 2.228-1.874-.956-2.488-3.5-1.374-5.694 1.114-2.194 3.538-3.184 5.41-2.229 1.872.956 2.488 3.514 1.374 5.695z" fill="url(#paint17_linear)"/><path d="M86.992 43.264c.088.1.194.184.312.247a.91.91 0 00.815.028c.609-.248.643-.726.673-1.107a1.331 1.331 0 01.51-1.1 2.766 2.766 0 011.094-.494c.594-.169 1.266-.36 1.134-1.53a1.352 1.352 0 00-.527-.936c-.874-.686-2.55-.483-2.62-.473l.082.648c.409-.051 1.59-.091 2.134.337a.723.723 0 01.28.495c.072.62-.084.661-.66.827-.487.11-.943.326-1.335.634a1.957 1.957 0 00-.743 1.552c-.027.362-.045.458-.273.553a.265.265 0 01-.247 0c-.248-.134-.421-.662-.465-.897l-.644.122c.074.396.239.77.48 1.094z" fill="#750B3B"/><path d="M126.929 112.768h.548c-.35-17.392-5.588-32.198-5.64-32.346l-.515.183c.052.139 5.258 14.867 5.607 32.163z" fill="#370522"/></g><defs><linearGradient id="paint0_linear" x1="143.459" y1="102.333" x2="130.748" y2="147.727" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint1_linear" x1="-34187.4" y1="29457.3" x2="-35442.5" y2="29457.3" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint2_linear" x1="93.318" y1="88.824" x2="157.221" y2="88.824" gradientUnits="userSpaceOnUse"><stop stop-color="#3A0122"/><stop offset="1" stop-color="#82004A"/></linearGradient><linearGradient id="paint3_linear" x1="114.119" y1="159.261" x2="122.421" y2="281.175" gradientUnits="userSpaceOnUse"><stop stop-color="#DD5700"/><stop offset="1" stop-color="#F8AA02"/></linearGradient><linearGradient id="paint4_linear" x1="-89835.8" y1="125476" x2="-94838.8" y2="166419" gradientUnits="userSpaceOnUse"><stop stop-color="#DD5700"/><stop offset="1" stop-color="#F8AA02"/></linearGradient><linearGradient id="paint5_linear" x1="-84856.6" y1="138873" x2="-58324.1" y2="176123" gradientUnits="userSpaceOnUse"><stop stop-color="#DD5700"/><stop offset="1" stop-color="#F8AA02"/></linearGradient><linearGradient id="paint6_linear" x1="-115459" y1="138249" x2="-92484.7" y2="182808" gradientUnits="userSpaceOnUse"><stop stop-color="#DD5700"/><stop offset="1" stop-color="#F8AA02"/></linearGradient><linearGradient id="paint7_linear" x1="-153934" y1="193181" x2="-110708" y2="154444" gradientUnits="userSpaceOnUse"><stop stop-color="#3A0122"/><stop offset="1" stop-color="#82004A"/></linearGradient><linearGradient id="paint8_linear" x1="-45123.6" y1="52623.9" x2="-38221.9" y2="42589.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint9_linear" x1="-21230.6" y1="6957.96" x2="-20866.2" y2="5073.86" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint10_linear" x1="-39862" y1="43021.7" x2="-34384.8" y2="34422.4" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint11_linear" x1="-20819.9" y1="25134.6" x2="-17457.1" y2="20464.5" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint12_linear" x1="-75333.1" y1="41006.5" x2="-71852.5" y2="30507.6" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint13_linear" x1="-116005" y1="69125.6" x2="-103147" y2="44833.8" gradientUnits="userSpaceOnUse"><stop stop-color="#3A0122"/><stop offset="1" stop-color="#82004A"/></linearGradient><linearGradient id="paint14_linear" x1="-26606" y1="16883.7" x2="-25881.5" y2="14696.1" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint15_linear" x1="-38461.6" y1="30548.2" x2="-36902.7" y2="26795.9" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><linearGradient id="paint16_linear" x1="-52457.1" y1="40026.3" x2="-55882.4" y2="40026.3" gradientUnits="userSpaceOnUse"><stop stop-color="#3A0122"/><stop offset="1" stop-color="#82004A"/></linearGradient><linearGradient id="paint17_linear" x1="-14742.4" y1="9544.73" x2="-14326.1" y2="8312.66" gradientUnits="userSpaceOnUse"><stop stop-color="#FFAB48"/><stop offset="1" stop-color="#F8CFA3"/></linearGradient><clipPath id="clip0"><path fill="#fff" transform="matrix(-1 0 0 1 157.355 0)" d="M0 0h156.382v293H0z"/></clipPath></defs></svg>
                                </div>
                            </div>

                        </div>
                    </div>
                    <!-- <div @click="log">click to log date + day</div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue'
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

        const toggleName = ref(false)

        const togglePassword = ref(false)
        const pass1 = ref('')
        const pass2 = ref('')

        const { user, dbUser, getUser, updateName, logout, newPassword, passwordUpdated, passwordUpdatedError, hasAccess } = authFuncs()
        getUser()
        const log = () => {
            console.log(hasAccess())
        }

        const updatePass = () => {
            if (pass1.value && pass1.value === pass2.value) {
                newPassword(pass1.value)
            }
        }

        const days = computed(() => {
            const oneDay = 24 * 60 * 60 * 1000;
            let expiration = new Date(dbUser.value.subscriptionUpdated.seconds * 1000)
            expiration.setMonth(expiration.getMonth() + 1)
            let today = new Date();

            const diffDays = Math.round(Math.abs((today - expiration) / oneDay));
            const days = diffDays.toString()
            let d = diffDays.toString().slice(-1)
            if (d == '1') {
                return `Остался ${days} день`
            } else if (d == '2' || d == '3' || d == '4') {
                return `Осталось ${days} дня`
            } else {
                return `Осталось ${days} дней`
            }
        })

        watchEffect(() => {
            try {
                userName.value = user.value.displayName
            } catch (error) {
                
            }
        })

        return {
            user,
            dbUser,
            userName,
            updateName,
            logout,
            router,
            togglePassword,
            pass1,
            pass2,
            updatePass,
            passwordUpdated,
            passwordUpdatedError,
            toggleName,
            hasAccess,
            log,
            days,
        }
    },
})
</script>
