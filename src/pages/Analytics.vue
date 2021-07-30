<template>
	<stock-nav></stock-nav>

    <div class="font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
		<div class="grid grid-cols-4">
			<stock-links class="hidden md:flex"></stock-links>
			<div class="col-span-4 lg:col-span-3 md:shadow-brand rounded-md md:p-7">   
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
                            <div v-if="width > 600" id="tv" class="w-full h-full"></div>
                        </tab>
                        <tab title="Признаки тренда" class="h-96">
                            <h1 class="font-benzin-bold text-xl my-5">Признаки тренда</h1>
                            <div class="font-ttnorms divide-y divide-light-purple 2xl:w-8/12">
                                <div class="flex justify-between py-3">
                                    <div>Максимумы и минимумы волн роста</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.highLows.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.highLows.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Положение относительно скользящих средних</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.smaEma.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.smaEma.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Накопление позиции инвесторами или ее снижение</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.accum.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.accum.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Сила тренда</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.adx.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.adx.text }}</div>
                                    </div>
                                </div>
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
                                        <td class="py-3">Цена к ожидаемой в 2024 году прибыли</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.fwd.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.fwd.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.fwd.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Отношение долга к собственному капиталу</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.debtEquity.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.debtEquity.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Коэффициент текущей ликвидности: покрытие текущих (до года) обязательств текущими активами</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.currentRatio.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.currentRatio.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Поведение опционов - на какой цене самые крупные ставки</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.openInterest.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.openInterest.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.openInterest.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Рейтинги аналитиков</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.analysis.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.analysis.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.analysis.comment }}</td>
                                    </tr>
                                    <tr class="w-full border-b">
                                        <td class="py-3">Доля акций, которые находятся в короткой (ставка на падение) позиции</td>
                                        <td class="flex py-3">
                                            <div :style="`background-color: ${selectedStock.shortFloat.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.shortFloat.text }}</div>
                                        </td>
                                        <td>{{ selectedStock.shortFloat.comment }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </tab>
                        <tab title="Технический анализ" class="h-96">
                            <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                            <div class="font-ttnorms divide-y divide-light-purple 2xl:w-8/12">
                                <div class="flex justify-between py-3">
                                    <div>Исторические уровни, на которых цена находила поддержку/сопротивление</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.levels.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.levels.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Уровень Фибоначчи, который выступает поддержкой или сопротивлением</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.fibo.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.fibo.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Показатели перекупленности/перепроданности по осциллятору Stochastic</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.stoch.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.stoch.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Свечной паттерн</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.pattern.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.pattern.text }}</div>
                                    </div>
                                </div>
                            </div> 
                        </tab>
                    </tabs>
                </div>
                
			    <div v-if="width < 600" id="tv" class="w-full h-64 md:hidden mt-5"></div>	

                <div v-if="selectedStock" class="md:hidden">
                    <h1 class="font-benzin-bold text-xl my-5">Признаки тренда</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="flex justify-between py-3">
                            <div>Максимумы и минимумы волн роста</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.highLows.color}`" class="w-4 h-4 rounded-full"></div>
                                <div class="whitespace-nowrap">{{ selectedStock.highLows.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Положение относительно скользящих средних</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4" :fill="selectedStock.smaEma.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div class="whitespace-nowrap">{{ selectedStock.smaEma.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Накопление позиции инвесторами или ее снижение</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.accum.color}`" class="w-4 h-4 rounded-full"></div>
                                <div class="whitespace-nowrap">{{ selectedStock.accum.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Сила тренда</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.adx.color}`" class="w-4 h-4 rounded-full"></div>
                                <div class="whitespace-nowrap">{{ selectedStock.adx.text }}</div>
                            </div>
                        </div>
                    </div>

                   <h1 class="font-benzin-bold text-xl my-5">Фундаментальные показатели</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Цена к ожидаемой в 2024 году прибыли</div>
                                <div :style="`background-color: ${selectedStock.fwd.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.fwd.text }}</div>
                            </div>
                            <div>{{ selectedStock.fwd.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Отношение долга к собственному капиталу</div>
                                <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.debtEquity.text }}</div>
                            </div>
                            <div>{{ selectedStock.debtEquity.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Коэффициент текущей ликвидности: покрытие текущих (до года) обязательств текущими активами</div>
                                <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.currentRatio.text }}</div>
                            </div>
                            <div>{{ selectedStock.currentRatio.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Поведение опционов - на какой цене самые крупные ставки</div>
                                <div :style="`background-color: ${selectedStock.openInterest.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.openInterest.text }}</div>
                            </div>
                            <div>{{ selectedStock.openInterest.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Рейтинги аналитиков</div>
                                <div :style="`background-color: ${selectedStock.analysis.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.analysis.text }}</div>
                            </div>
                            <div>{{ selectedStock.analysis.comment }}</div>
                        </div>
                        <div class="py-3">
                            <div class="flex justify-between items-center pb-3">
                                <div class="py-3">Доля акций, которые находятся в короткой (ставка на падение) позиции</div>
                                <div :style="`background-color: ${selectedStock.shortFloat.color}`" class="rounded-full py-1 px-5 text-white">{{ selectedStock.shortFloat.text }}</div>
                            </div>
                            <div>{{ selectedStock.shortFloat.comment }}</div>
                        </div>
                    </div> 

                   <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="flex justify-between py-3">
                            <div>Исторические уровни, на которых цена находила поддержку/сопротивление</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.levels.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.levels.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Уровень Фибоначчи, который выступает поддержкой или сопротивлением</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.fibo.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.fibo.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Показатели перекупленности/ перепроданности по осциллятору Stochastic</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.stoch.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.stoch.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Свечной паттерн</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <svg class="w-4 h-4 absolute -ml-5" :fill="selectedStock.pattern.color" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="50" cy="50" r="50"/>
                                </svg>
                                <div>{{ selectedStock.pattern.text }}</div>
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
                        console.log(obj.id, route.params.id)
                        return obj.id.toString() == route.params.id.toString()
                    })
                    selectedStock.value = myStock[0]
                    if (route.name == 'Analytics') {
                        getStockTV(myStock[0].id)
                        // embedChart(myStock[0].id)
                    }
                } else {
                    selectedStock.value = stocks.value[0]
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