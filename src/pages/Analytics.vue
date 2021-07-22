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
                
                <div class="hidden md:block">
                    <tabs v-if="selectedStock" v-model="activeTab" :selectedStock="selectedStock.id">
                        <tab title="График" class="h-96">
                            <div v-if="width > 600" id="tv" class="w-full h-full"></div>
                        </tab>
                        <tab title="Тренд" class="h-96">
                            <h1 class="font-benzin-bold text-xl my-5">Признаки тренда</h1>
                            <div class="font-ttnorms divide-y divide-light-purple">
                                <div class="flex justify-between py-3">
                                    <div>Максимум и минимум</div>
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
                                    <div>Накопление</div>
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
                            <div class="font-ttnorms divide-y divide-light-purple">
                                <div class="flex justify-between py-3">
                                    <div>fwd P/E</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.fwd.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.fwd.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Debt/equity</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.debtEquity.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Накопление</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.accum.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.accum.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Current ratio</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.currentRatio.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Open interest</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.openInterest.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.openInterest.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Analysis</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.analysis.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.analysis.text }}</div>
                                    </div>
                                </div>
                                <div class="flex justify-between py-3">
                                    <div>Short float</div>
                                    <div class="flex space-x-1 items-center font-ttnorms">
                                        <div :style="`background-color: ${selectedStock.shortFloat.color}`" class="w-4 h-4 rounded-full"></div>
                                        <div>{{ selectedStock.shortFloat.text }}</div>
                                    </div>
                                </div>
                            </div> 
                        </tab>
                        <tab title="Тех. анализ" class="h-96">
                            <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                            <div class="font-ttnorms divide-y divide-light-purple">
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
                        </tab>
                    </tabs>
                </div>
                
			    <div v-if="width < 600" id="tv" class="w-full h-64 md:hidden mt-5"></div>	

                <div v-if="selectedStock" class="md:hidden">
                    <h1 class="font-benzin-bold text-xl my-5">Признаки тренда</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="flex justify-between py-3">
                            <div>Максимум и минимум</div>
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
                            <div>Накопление</div>
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

                   <h1 class="font-benzin-bold text-xl my-5">Фундаментальные показатели</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
                        <div class="flex justify-between py-3">
                            <div>fwd P/E</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.fwd.color}`" class="w-4 h-4 rounded-full"></div>
                                <div>{{ selectedStock.fwd.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Debt/equity</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.debtEquity.color}`" class="w-4 h-4 rounded-full"></div>
                                <div>{{ selectedStock.debtEquity.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Накопление</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.accum.color}`" class="w-4 h-4 rounded-full"></div>
                                <div>{{ selectedStock.accum.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Current ratio</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.currentRatio.color}`" class="w-4 h-4 rounded-full"></div>
                                <div>{{ selectedStock.currentRatio.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Open interest</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.openInterest.color}`" class="w-4 h-4 rounded-full"></div>
                                <div>{{ selectedStock.openInterest.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Analysis</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.analysis.color}`" class="w-4 h-4 rounded-full"></div>
                                <div>{{ selectedStock.analysis.text }}</div>
                            </div>
                        </div>
                        <div class="flex justify-between py-3">
                            <div>Short float</div>
                            <div class="flex space-x-1 items-center font-ttnorms">
                                <div :style="`background-color: ${selectedStock.shortFloat.color}`" class="w-4 h-4 rounded-full"></div>
                                <div>{{ selectedStock.shortFloat.text }}</div>
                            </div>
                        </div>
                    </div> 

                   <h1 class="font-benzin-bold text-xl my-5">Технический анализ</h1>
                    <div class="font-ttnorms divide-y divide-light-purple">
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
        const { stocks, stock, getStocks, getStockTV } = stockFuncs()
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
                    }
                } else {
                    selectedStock.value = stocks.value[0]
                    if (route.name == 'Analytics') {
                        getStockTV(stocks.value[0].id)
                    }
                }
            } catch (error) {}
        })

        watch(selectedStock, () => {
            console.log(document.getElementById('tv'))
            if (!!document.getElementById('tv')) {
                getStockTV(selectedStock.value.id)
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
        }
	},
})
</script>