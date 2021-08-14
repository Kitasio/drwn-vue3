<template>
	<stock-nav></stock-nav>

    <div class="font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
		<div class="grid grid-cols-12">
			<stock-links class="hidden md:flex"></stock-links>
			<div class="col-span-12 lg:col-span-10 md:shadow-brand rounded-md md:p-7">   
                <div class="">
                    <Listbox v-if="selectedStock" v-model="selectedStock">
                        <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md">
                            <div class="flex space-x-2 items-center">
                                <img class="w-8" :src="selectedStock.logo" alt="">
                                <div class="font-benzin-semibold">#{{ selectedStock.ticker }}</div>
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
                            <ListboxOptions class="absolute mt-2 z-10 bg-white w-40 py-2 px-3 border-2 border-light-purple rounded-md">
                                <ListboxOption
                                    v-for="stock in stocks"
                                    :key="stock"
                                    :value="stock"
                                >
                                    <div v-if="stock != selectedStock" class="flex py-2 space-x-2 items-center cursor-pointer border-b border-light-purple">
                                        <img class="w-8" :src="stock.logo" alt="">
                                        <div class="font-benzin-semibold">#{{ stock.ticker }}</div>
                                    </div>
                                </ListboxOption>
                            </ListboxOptions>
                        </transition>
                    </Listbox>
                </div>
                
                <div class="hidden md:block overflow-scroll">
                    <tabs v-if="selectedStock" v-model="activeTab" :selectedStock="selectedStock.id" class="">
                        <tab title="График" class="h-96 2xl:h-135">
                            <h1 class="font-benzin-bold text-xl my-5">Сценарии</h1> 
                            <div @click="s.show = !s.show" class="border-b py-3" v-for="(s, index) in selectedStock.scenarios" :key="index">
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
                            <div v-if="width > 600" id="tv" class="w-full h-full"></div>
                        </tab>
                        <tab title="Новости и фон" class="h-96">
                            <h1 class="font-benzin-bold text-xl my-5">Новости и фон</h1>
                            <div class="mt-10">
                                <header class="grid grid-cols-12 py-3 border-b border-t border-black">
                                    <h1 class="col-span-8">Новость</h1>
                                    <h1 class="col-span-2">Тип</h1>
                                    <h1 class="col-span-2">Потенциал роста</h1>
                                </header>
                                <main v-for="(i, index) in selectedStock.news" :key="index" class="grid grid-cols-12 py-3 border-b border-black">
                                    <p class="col-span-8">{{ i.text }}</p>
                                    <p class="col-span-2">{{ i.type }}</p>
                                    <p class="col-span-2">{{ i.potential }}</p>
                                </main>
                            </div>
                        </tab>
                        <tab title="Фундаментальные показатели" class="h-96">
                            <h1 class="font-benzin-bold text-xl my-5">Фундаментальные показатели</h1>
                            <table class="table-fixed w-full">
                                <thead>
                                    <tr>
                                        <th class="w-1/3 text-left">Наименование</th>
                                        <th class="w-1/3 text-left">Показатель</th>
                                        <th class="w-1/3 text-left">Комментарий</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="w-full border-b">
                                        <td class="py-3">PEG (vs peers, sector, market)</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.peg.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.peg.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.peg.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">fwd P/E 2024</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.fwd.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.fwd.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.fwd.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Debt/equity</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.debtEquity.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.debtEquity.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Current ratio</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.currentRatio.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.currentRatio.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Темпы роста рынка</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.growth.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.growth.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.growth.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Конкурентное положение</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.competition.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.competition.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.competition.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Рост цены акций/рост прибыли</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.priceGrowth.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.priceGrowth.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.priceGrowth.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Поведение на отчетах</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.report.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.report.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.report.comment }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </tab>
                        <tab title="Технический анализ" class="h-96">
                            <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                            <h2 class="font-benzin-semibold">Индикаторы</h2>
                            <div class="font-ttnorms divide-y divide-light-purple 2xl:w-8/12">
                                <div class="flex justify-between py-3">
                                    <div>Уровни</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.levels.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.levels.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Fibo</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.fibo.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.fibo.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Stoch</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.stoch.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.stoch.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Pattern</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.pattern.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.pattern.text }}</div>
                                    </div>
                                </div>
                            </div> 

                            <h2 class="font-benzin-semibold mt-5">Признаки тренда</h2>
                            <div class="font-ttnorms divide-y divide-light-purple 2xl:w-8/12">
                                <div class="flex justify-between py-3">
                                    <div>Highs-lows</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.highLows.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.highLows.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Sma-Ema</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.smaEma.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.smaEma.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Accum/Dist</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.accum.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.accum.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>ADX</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.adx.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.adx.text }}</div>
                                    </div>
                                </div>
                            </div> 
                        </tab>
                    </tabs>
                </div>
                
                <!-- MOBILE -->
                <h1 class="font-benzin-bold text-xl my-5 md:hidden">Сценарии</h1> 
                <div @click="s.show = !s.show" class="border-b py-3 md:hidden" v-for="(s, index) in selectedStock.scenarios" :key="index">
                    <div class="flex justify-between">
                        <div class="flex space-x-2">
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

			    <div v-if="width < 600" id="tv" class="w-full h-64 md:hidden mt-5"></div>	

                <div v-if="selectedStock" class="md:hidden">
                    <h1 class="font-benzin-bold text-xl my-5">События и фон</h1>
                    <div class="flex justify-between py-3 border-b border-black font-semibold">
                        <p>Тип</p>
                        <p>Потенциал</p>
                    </div>
                    <div v-for="(i, index) in selectedStock.news" :key="index" class="font-ttnorms py-3 border-b border-black">
                        <div class="flex justify-between">
                            <p>{{i.type}}</p>
                            <p>{{i.potential}}</p>
                        </div>
                        <div>{{i.text}}</div>
                    </div>

                   <h1 class="font-benzin-bold text-xl my-5">Фундаментальные показатели</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">PEG (vs peers, sector, market)		</div>
                                <div :style="`background-color: ${selectedStock.peg.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.peg.text }}</div>
                            </div>
                            <div>{{ selectedStock.peg.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">fwd P/E 2024</div>
                                <div :style="`background-color: ${selectedStock.fwd.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.fwd.text }}</div>
                            </div>
                            <div>{{ selectedStock.fwd.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Debt/equity</div>
                                <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.debtEquity.text }}</div>
                            </div>
                            <div>{{ selectedStock.debtEquity.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Current ratio</div>
                                <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.currentRatio.text }}</div>
                            </div>
                            <div>{{ selectedStock.currentRatio.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Темпы роста рынка</div>
                                <div :style="`background-color: ${selectedStock.growth.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.growth.text }}</div>
                            </div>
                            <div>{{ selectedStock.growth.comment }}</div>
                        </div> 
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Конкурентное положение</div>
                                <div :style="`background-color: ${selectedStock.competition.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.competition.text }}</div>
                            </div>
                            <div>{{ selectedStock.competition.comment }}</div>
                        </div> 
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Рост цены акций/ рост прибыли</div>
                                <div :style="`background-color: ${selectedStock.priceGrowth.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.priceGrowth.text }}</div>
                            </div>
                            <div>{{ selectedStock.priceGrowth.comment }}</div>
                        </div> 
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Поведение на отчетах</div>
                                <div :style="`background-color: ${selectedStock.report.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.report.text }}</div>
                            </div>
                            <div>{{ selectedStock.report.comment }}</div>
                        </div> 
                    </div> 

                   <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                    <h2 class="font-benzin-semibold">Индикаторы</h2>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="flex justify-between py-3">
                            <div>Уровни</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.levels.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.levels.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Fibo</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.fibo.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.fibo.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Stoch</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.stoch.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.stoch.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Pattern</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.pattern.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.pattern.text }}</div>
                            </div>
                        </div>
                    </div> 
                    <h2 class="font-benzin-semibold mt-3">Признаки тренда</h2>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="flex justify-between py-3">
                            <div>Higs Lows</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.highLows.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.highLows.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Sma Ema</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.smaEma.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.smaEma.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Accum/Dist</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.accum.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.accum.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>ADX</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.adx.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.adx.text }}</div>
                            </div>
                        </div>
                    </div> 
                </div>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import stockFuncs from '../composables/stockFuncs'
import { useRouter, useRoute } from 'vue-router'
import { ref, defineComponent, onMounted, watchEffect, watch } from 'vue'
import StockLinks from '../components/StockLinks.vue'
import StockNav from '../components/StockNav.vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
import Tab from '../components/Tab.vue'
import Tabs from '../components/Tabs.vue'
import useBreakpoints from '../composables/useBreakpoints'

export default defineComponent({
  components: { 
        StockLinks,
        StockNav,
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
        Tab,
        Tabs,
    },
	setup() {
        const { width, type } = useBreakpoints()
        const route = useRoute()
        const { stocks, stock, getStocks, getStockTV, embedChart } = stockFuncs()
        getStocks()
        const activeTab = ref(0)

        const selectedStock = ref<any>('')
        watchEffect(() => {
            try {
                if (route.params.id) {
                    let myStock = stocks.value.filter(obj => {
                        console.log(obj.id, route.params.id, route.name)
                        return obj.id.toString() == route.params.id.toString()
                    })
                    selectedStock.value = myStock[0]
                    if (route.name == 'Analytics') {
                        getStockTV(myStock[0].id)
                        // embedChart(myStock[0].id)
                    }
                } else {
                    selectedStock.value = stocks.value[0]
                    console.log('hello there', route.name)
                    if (route.name == 'Analytics') {
                        getStockTV(stocks.value[0].id)
                        // embedChart(stocks.value[0].id)
                    }
                }
            } catch (error) {}
        })

        watch(selectedStock, () => {
            console.log(document.getElementById('tv'))
            if (!!document.getElementById('tv')) {
                if (route.name == 'Analytics') {
                    getStockTV(selectedStock.value.id)
                    // embedChart(selectedStock.value.id)
                }
            }
        })


		const info = ref(['', 'Тикер', 'Сектор', 'Тренд', 'Тех. анализ', 'Фундаментальный анализ'])

        return {
        	stocks,
        	stock,
        	getStocks,
            getStockTV,
			info,
            route,
            selectedStock,
            activeTab,
            width,
            type,
            embedChart,
        }
	},
})
</script>