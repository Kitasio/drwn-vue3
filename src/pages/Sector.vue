<template>
	<stock-nav></stock-nav>
    <div class="font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
		<div class="grid grid-cols-12">
			<stock-links class="hidden md:flex"></stock-links>
			<div id="box" class="col-span-12 lg:col-span-10 md:shadow-brand rounded-md md:p-7">
                <div>
                    <Listbox v-if="selectedSector" v-model="selectedSector">
                        <ListboxButton class="py-2 px-3 border-2 border-black rounded-md">
                            <div class="flex space-x-2 items-center">
                                <div class="font-benzin-semibold">#{{ selectedSector.name }}</div>
                                <img class="w-3" src="/img/icons/arrowDown.svg" alt="">
                            </div>
                        </ListboxButton>
                        <transition
                        enter-active-class="transition duration-100 ease-out"
                        enter-from-class="transform scale-95 opacity-0"
                        enter-to-class="transform scale-100 opacity-100"
                        leave-active-class="transition duration-75 ease-out"
                        leave-from-class="transform scale-100 opacity-100"
                        leave-to-class="transform scale-95 opacity-0"
                        >
                            <ListboxOptions class="absolute mt-2 z-10 bg-white py-2 px-3 border-2 border-black rounded-md">
                                <ListboxOption
                                    v-for="sector in sectors"
                                    :key="sector"
                                    :value="sector"
                                >
                                    <div @click="logSector(sector.name)" v-if="sector != selectedSector" class="flex py-2 space-x-2 items-center cursor-pointer border-b border-black">
                                        <div class="font-benzin-semibold">{{ sector.name }}</div>
                                    </div>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                </div>
                
                <div class="hidden md:block">
                    <tabs v-if="selectedSector" v-model="activeTab" :selectedStock="selectedSector.id">
                        <tab title="Обзор">
                            <div>
                                <h1 v-if="selectedSector.scenarios.length" class="font-benzin-bold text-xl my-5">Сценарии</h1> 
                                <div @click="s.show = !s.show" class="border-b py-3" v-for="(s, index) in selectedSector.scenarios" :key="index">
                                    <div class="flex justify-between">
                                        <div class="flex space-x-2 cursor-pointer">
                                            <img v-if="!s.show" class="w-4" src="../assets/icons/chevron-right.svg" alt="">
                                            <img v-else class="w-4" src="../assets/icons/chevron-down.svg" alt="">
                                            <div>{{s.name}}</div>
                                        </div>
                                        <div class="flex space-x-2 items-center">
                                            <div>{{s.probability}}</div>
                                            <div class="w-4 h-4 rounded-full" :style="`background-color: ${s.color}`"></div>
                                        </div>
                                    </div>

                                    <div v-if="s.show">
                                        <div class="mt-2">
                                            <h1 class="font-semibold">Описание</h1>
                                            <div class="mt-1">{{s.description}}</div>
                                        </div>

                                        <div class="mt-2">
                                            <h1 class="font-semibold">Проект решения</h1>
                                            <div class="mt-1">{{s.project}}</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="h-140 mt-5">
                                    <div v-if="width > 600" id="tv" class="w-full h-full"></div>
                                </div>
                            </div>
                        </tab>
                        <tab title="Факторы влияния">
                            <h1 v-if="selectedSector.factors.length" class="font-benzin-bold text-xl my-5">Факторы влияния</h1> 
                            <header class="grid grid-cols-3 gap-5 border-b py-3 border-black text-sm font-benzin-semibold">
                                <h1>Факторы</h1>
                                <h1>Корреляция</h1>
                                <h1>Потенциал роста<br> сектора, в %</h1>
                            </header>
                            <main class="grid grid-cols-3 gap-5 border-black border-b py-3 transition duration-200 hover:shadow-y" v-for="(i, index) in selectedSector.factors" :key="index">
                                <p v-if="hasAccess() || index == 0 || index == 1">{{i.name}}</p>
                                <Star v-else class="has-tooltip text-sm">Подпишитесь на тариф “Трейдер” чтобы открыть</Star>
                                <p v-if="hasAccess() || index == 0">{{i.corr}}</p>
                                <Star v-else class="has-tooltip text-sm">Подпишитесь на тариф “Трейдер” чтобы открыть</Star>
                                <p v-if="hasAccess() || index == 0">{{i.potential}}</p>
                                <Star v-else class="has-tooltip text-sm">Подпишитесь на тариф “Трейдер” чтобы открыть</Star>
                            </main>

                            <header class="mt-5 grid grid-cols-2 border-b py-3 border-black text-sm font-benzin-semibold">
                                <h1>Циклы экономики</h1>
                                <h1>Комментарий</h1>
                            </header>
                            <main class="grid grid-cols-2 border-black border-b py-3 transition duration-200 hover:shadow-y">
                                <p>Стадия цикла загрузки производства</p>
                                <p>{{selectedSector.cycle.first}}</p>
                            </main>
                            <main class="grid grid-cols-2 border-black border-b py-3 transition duration-200 hover:shadow-y">
                                <p>Стадия цикла инвестиций в производство</p>
                                <p>{{selectedSector.cycle.second}}</p>
                            </main>
                            <main class="grid grid-cols-2 border-black border-b py-3 transition duration-200 hover:shadow-y">
                                <p>Стадия цикла инвестиций в инфраструктуру</p>
                                <p>{{selectedSector.cycle.third}}</p>
                            </main>
                            <main class="grid grid-cols-2 border-black border-b py-3 transition duration-200 hover:shadow-y">
                                <p>Этап шок-колебания</p>
                                <p>{{selectedSector.cycle.shock}}</p>
                            </main>
                        </tab>
                        <tab title="Новости и фон">
                            <h1 v-if="selectedSector.news.length" class="font-benzin-bold text-xl my-5">Новости и фон</h1> 
                            <header class="mt-5 grid grid-cols-4 border-b py-3 border-black text-sm font-benzin-semibold">
                                <h1 class="col-span-2">Новость</h1>
                                <h1>Тип</h1>
                                <h1>Потенциал роста, в %</h1>
                            </header>
                            <main class="grid grid-cols-4 border-black border-b py-3 transition duration-200 hover:shadow-y" v-for="(i, index) in selectedSector.news" :key="index">
                                <p class="col-span-2">{{i.text}}</p>
                                <p>{{i.type}}</p>
                                <p>{{i.potential}}</p>
                            </main>
                        </tab>
                        <tab title="Фундаментальный анализ">
                            <h1 v-if="selectedSector.fund.length" class="font-benzin-bold text-xl my-5">Фундаментальный анализ</h1> 
                            <header class="mt-5 grid grid-cols-4 gap-5 border-b py-3 border-black text-sm font-benzin-semibold">
                                <h1>Индикатор</h1>
                                <div>
                                    
                                    <h1>Параметр</h1>
                                </div>
                                <h1 class="col-span-2">Комментарий</h1>
                            </header>
                            <main class="grid grid-cols-4 border-black border-b py-3 gap-5 transition duration-200 hover:shadow-y" v-for="(i, index) in selectedSector.fund" :key="index">
                                <p class="has-tooltip">{{i.nameRu}}<span v-if="i.tooltip" class="tooltip text-white">{{i.tooltip}}</span></p>
                                <div v-if="hasAccess() || index == 0 || index == 1 || index == 2 || index == 4 || index == 5 || index == 6" class="flex space-x-2 items-center">
                                    <svg v-if="i.paramColor" class="w-4 h-4" :fill="i.paramColor" style="min-width: 1rem;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <p>{{i.param}}</p>
                                </div>
                                <Star v-else></Star>
                                
                                <p v-if="hasAccess() || index == 0 || index == 2" class="col-span-2">{{i.change}}</p>
                                <Star v-else>Подпишитесь на тариф “Трейдер” чтобы открыть</Star>
                            </main>
                        </tab>
                        <tab title="Тех, анализ">
                            <h1 v-if="selectedSector.tech.length" class="font-benzin-bold text-xl my-5">Технический анализ</h1> 
                            <header class="mt-5 grid grid-cols-4 gap-5 border-b py-3 border-black text-sm font-benzin-semibold">
                                <h1>Индикатор</h1>
                                <h1>Параметр</h1>
                                <h1 class="col-span-2">Комментарий</h1>
                            </header>
                            <main class="grid grid-cols-4 border-black border-b py-3 gap-5 transition duration-200 hover:shadow-y" v-for="(i, index) in selectedSector.tech.slice(0, 4)" :key="index">
                                <p class="has-tooltip">{{i.nameRu}}<span v-if="i.tooltip" class="tooltip text-white">{{i.tooltip}}</span></p>
                                <div v-if="hasAccess() || index != 3" class="flex space-x-2 items-center">
                                    <svg v-if="i.paramColor" class="w-4 h-4" :fill="i.paramColor" style="min-width: 1rem;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <p>{{i.param}}</p>
                                </div>
                                <Star v-else />
                                <p v-if="hasAccess() || index != 3" class="col-span-2">{{i.change}}</p>
                                <Star v-else />
                            </main>

                            <header class="mt-5 grid grid-cols-4 gap-5 border-b py-3 border-black text-sm font-benzin-semibold">
                                <h1 class="col-span-2">Тренд</h1>
                            </header>
                            <main class="grid grid-cols-4 border-black border-b py-3 gap-5 transition duration-200 hover:shadow-y" v-for="(i, index) in selectedSector.tech.slice(4)" :key="index">
                                <p class="has-tooltip">{{i.nameRu}}<span v-if="i.tooltip" class="tooltip text-white">{{i.tooltip}}</span></p>
                                <div v-if="hasAccess() || index == 0" class="flex space-x-2 items-center">
                                    <svg v-if="i.paramColor" class="w-4 h-4" :fill="i.paramColor" style="min-width: 1rem;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="50" cy="50" r="50"/>
                                    </svg>
                                    <p>{{i.param}}</p>
                                </div>
                                <Star v-else />
                                <p v-if="hasAccess() || index == 0" class="col-span-2">{{i.change}}</p>
                                <Star v-else />
                            </main>
                        </tab>
                    </tabs>
                </div>

                <!-- MOBILE -->
                <div class="md:hidden">
                    <h1 v-if="selectedSector.scenarios.length" class="font-benzin-bold text-xl mb-5 mt-12">Сценарии</h1> 
                    <div @click="s.show = !s.show" class="border-b py-3" v-for="(s, index) in selectedSector.scenarios" :key="index">
                        <div class="flex justify-between">
                            <div class="flex space-x-2 cursor-pointer">
                                <img v-if="!s.show" class="w-4" src="../assets/icons/chevron-right.svg" alt="">
                                <img v-else class="w-4" src="../assets/icons/chevron-down.svg" alt="">
                                <div>{{s.name}}</div>
                            </div>
                            <div class="flex space-x-2 items-center">
                                <div>{{s.probability}}</div>
                                <div class="w-4 h-4 rounded-full" :style="`background-color: ${s.color}`"></div>
                            </div>
                        </div>

                        <div v-if="s.show">
                            <div class="mt-2">
                                <h1 class="font-semibold">Описание</h1>
                                <div class="mt-1">{{s.description}}</div>
                            </div>

                            <div class="mt-2">
                                <h1 class="font-semibold">Проект решения</h1>
                                <div class="mt-1">{{s.project}}</div>
                            </div>
                        </div>
                    </div>

                    <div v-if="width < 600" id="tv" class="w-full h-80 md:hidden mt-5"></div>	

                    <h1 v-if="selectedSector.factors.length" class="font-benzin-bold text-xl mb-5 mt-12">Факторы влияния</h1> 
                    <div v-if="selectedSector.factors.length">
                        <div v-for="(i, index) in selectedSector.factors" :key="index" class="py-5 border-black border-b">
                            <h1 class="mb-3 font-benzin-semibold ">{{i.name}}</h1>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <p class="text-sm ">Корреляция</p>
                                    <p v-if="hasAccess() || index == 0">{{i.corr}}</p>
                                    <Star v-else />
                                </div>
                                <div class="flex justify-between">
                                    <p class="text-sm ">Потенциал роста</p>
                                    <p v-if="hasAccess() || index == 0">{{i.potential}}</p>
                                    <Star v-else />
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 v-if="selectedSector.cycle" class="font-benzin-bold text-xl mb-5 mt-12">Циклы экономики</h1> 
                    <div v-if="selectedSector.cycle">
                        <div class="py-5 border-black border-b">
                            <div class="space-y-3">
                                <h1 class="font-benzin-semibold text-sm">Стадия цикла загрузки производства:</h1>
                                <p>{{selectedSector.cycle.first}}</p>
                            </div>
                        </div>
                        <div class="py-5 border-black border-b">
                            <div class="space-y-3">
                                <h1 class="font-benzin-semibold text-sm">Стадия цикла инвестиций в производство:</h1>
                                <p>{{selectedSector.cycle.second}}</p>
                            </div>
                        </div>
                        <div class="py-5 border-black border-b">
                            <div class="space-y-3">
                                <h1 class="font-benzin-semibold text-sm">Стадия цикла инвестиций в инфраструктуру:</h1>
                                <p>{{selectedSector.cycle.third}}</p>
                            </div>
                        </div>
                        <div class="py-5 border-black border-b">
                            <div class="space-y-3">
                                <h1 class="font-benzin-semibold text-sm">Этап шок-колебания:</h1>
                                <p>{{selectedSector.cycle.shock}}</p>
                            </div>
                        </div>
                    </div>

                    <h1 v-if="selectedSector.news.length" class="font-benzin-bold text-xl mb-5 mt-12">Новости и фон</h1> 
                    <div v-if="selectedSector.news.length">
                        <div v-for="(i, index) in selectedSector.news" :key="index" class="py-5 border-black border-b">
                            <h1 class="font-benzin-semibold text-sm">Новость:</h1>
                            <p class="mt-3">{{i.text}}</p>
                            <div class="space-y-3 mt-5">
                                <div class="flex justify-between">
                                    <p class="font-benzin-semibold text-sm">Тип</p>
                                    <p>{{i.type}}</p>
                                </div>
                                <div class="flex justify-between">
                                    <p class="font-benzin-semibold text-sm">Потенциал роста</p>
                                    <p>{{i.potential}}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 v-if="selectedSector.fund.length" class="font-benzin-bold text-xl mb-5 mt-12">Фундаментальный анализ</h1> 
                    <div v-if="selectedSector.fund.length">
                        <div v-for="(i, index) in selectedSector.fund" :key="index" class="py-5 border-black border-b">
                            <h1 class="mb-3 font-benzin-semibold  text-sm">{{i.nameRu}}</h1>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <p class="text-sm">Параметр</p>
                                    <div v-if="hasAccess() || index == 0 || index == 1 || index == 2 || index == 4 || index == 5 || index == 6" class="flex space-x-2 items-center">
                                        <svg v-if="i.paramColor" class="w-4 h-4" :fill="i.paramColor" style="min-width: 1rem;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="50"/>
                                        </svg>
                                        <p>{{i.param}}</p>
                                    </div>
                                    <Star v-else></Star>
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm">Комментарий: </p>
                                    <p v-if="hasAccess() || index == 0 || index == 2">{{i.change}}</p>
                                    <Star v-else>Подпишитесь на тариф “Трейдер” чтобы открыть</Star>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h1 v-if="selectedSector.tech.length" class="font-benzin-bold text-xl mb-5 mt-12">Технический анализ</h1> 
                    <div v-if="selectedSector.tech.length">
                        <div v-for="(i, index) in selectedSector.tech" :key="index" class="py-5 border-black border-b">
                            <h1 class="mb-3 font-benzin-semibold  text-sm">{{i.nameRu}}</h1>
                            <div class="space-y-3">
                                <div class="flex justify-between">
                                    <p class="text-sm">Параметр</p>
                                    <div v-if="hasAccess() || index != 3 && index != 5 && index != 6 && index != 7" class="flex space-x-2 items-center">
                                        <svg v-if="i.paramColor" class="w-4 h-4" :fill="i.paramColor" style="min-width: 1rem;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="50"/>
                                        </svg>
                                        <p>{{i.param}}</p>
                                    </div>
                                    <Star v-else />
                                </div>
                                <div class="space-y-2">
                                    <p class="text-sm">Комментарий: </p>
                                    <p v-if="hasAccess() || index != 3 && index != 5 && index != 6 && index != 7">{{i.change}}</p>
                                    <Star v-else />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import StockNav from '../components/StockNav.vue'
import StockLinks from '../components/StockLinks.vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import Tab from '../components/Tab.vue'
import Tabs from '../components/Tabs.vue'
import useBreakpoints from '../composables/useBreakpoints'
import { useRouter, useRoute } from 'vue-router'
import { ref, defineComponent, onMounted, watchEffect, watch } from 'vue'
import sectorFuncs from '../composables/sectorFuncs'
import { analytics } from '../composables/fireConf'
import authFuncs from '../composables/authFuncs'
import Star from '../components/Star.vue'

export default defineComponent({
    components: {
        StockNav,
        StockLinks,
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        Tab,
        Tabs,
        Star,
    },
    setup() {
        const { width, type } = useBreakpoints()
        const route = useRoute()
        const { sector, sectors, getSector, getSectors, ideaChart } = sectorFuncs()
        getSectors()

        const { dbUser, getUser, user, hasAccess } = authFuncs()
        getUser()

        const activeTab = ref(0)

		const logSector = (name: string) => {
			analytics.logEvent("select_sector_dropdown", {name: name})
		}

        const selectedSector = ref<any>('')
        watchEffect(() => {
            try {
                if (route.params.id) {
                    let mySector = sectors.value.filter(obj => {
                        console.log(obj.id, route.params.id, route.name)
                        return obj.id.toString() == route.params.id.toString()
                    })
                    selectedSector.value = mySector[0]
                    if (route.name == 'Sector') {
                        // getStockTV(mySector[0].id)
                        ideaChart(mySector[0].id)
                    }
                } else {
                    selectedSector.value = sectors.value[0]
                    if (route.name == 'Sector') {
                        // getStockTV(stocks.value[0].id)
                        ideaChart(sectors.value[0].id)
                    }
                }
            } catch (error) {}
        }) 

        watch(selectedSector, () => {
            console.log(document.getElementById('tv'))
            if (!!document.getElementById('tv')) {
                if (route.name == 'Sector') {
                    // getStockTV(selectedSector.value.id)
                    ideaChart(selectedSector.value.id)
                }
            }
        })

        return {
            selectedSector,
            sector,
            sectors,
            route,
            activeTab,
            width,
            type,
            logSector,
            dbUser,
            hasAccess,
        }
    },
})
</script>
