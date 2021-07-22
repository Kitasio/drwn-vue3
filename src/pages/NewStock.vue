<template>
    <stock-nav></stock-nav>
    <div class="h-screen  p-5 sm:p-10 lg:px-32 mx-auto">
        <div class=" relative rounded-lg shadow-brand p-5 lg:p-10 w-full h-5/6  overflow-scroll">
            <div class="text-2xl mb-5 font-benzin-semibold">Добавление Акции</div>
            <tabs v-model="activeTab">

                <tab class="font-ttnorms" title="Основное">
                    <div>Тикер</div>
                    <input v-model="stock.ticker" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md ">

                    <div class="mt-5">
                        <div>Логотип</div>
                        <input @change="handleChange" class="mb-5" name="image" type="file" placeholder="Картинка">
                    </div>

                    <div class="mt-5">Сектор</div>
                    <Listbox v-model="selectedSector">
                        <ListboxButton>{{ selectedSector.name }}</ListboxButton>
                        <ListboxOptions>
                            <ListboxOption
                                v-for="(sector, i) in sectors"
                                :key="i"
                                :value="sector"
                            >
                                <div>{{ sector.name }}</div>
                            </ListboxOption>
                        </ListboxOptions>
                    </Listbox>

                    <div class="mt-5">Trading view</div>
                    <input v-model="stock.tradingView" type="text" class=" w-1/2 border-light-purple focus:border-light-purple focus:ring-0 border-2 rounded-md ">
                </tab>

                <tab class="font-ttnorms" title="Тренд">
                    <div class="flex space-x-10">
                        <div>
                            <div class="mb-3">Higs Lows</div>
                            <Listbox v-model="selectedHighLows">
                                <ListboxButton>
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedHighLows.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedHighLows.text }}</div>
                                    </div>
                                </ListboxButton>
                                <ListboxOptions class="space-y-2">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                            </Listbox>
                        </div>

                        <div>
                            <div class="mb-3">Sma Ema</div>
                            <Listbox v-model="selectedSmaEma">
                                <ListboxButton>
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedSmaEma.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedSmaEma.text }}</div>
                                    </div>
                                </ListboxButton>
                                <ListboxOptions class="space-y-2">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                            </Listbox>
                        </div>

                        <div>
                            <div class="mb-3">Accum/Dist</div>
                            <Listbox v-model="selectedAccum">
                                <ListboxButton>
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedAccum.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedAccum.text }}</div>
                                    </div>
                                </ListboxButton>
                                <ListboxOptions class="space-y-2">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                            </Listbox>
                        </div>

                        <div>
                            <div class="mb-3">ADX</div>
                            <Listbox v-model="selectedAdx">
                                <ListboxButton>
                                    <div class="flex items-center space-x-3">
                                        <div :style="`background-color: ${selectedAdx.color}`" class="w-5 h-5 rounded-full"></div>
                                        <div>{{ selectedAdx.text }}</div>
                                    </div>
                                </ListboxButton>
                                <ListboxOptions class="space-y-2">
                                    <ListboxOption
                                        v-for="(trend, i) in trendOptions"
                                        :key="i"
                                        :value="trend"
                                    >
                                        <div class="flex items-center space-x-3 cursor-pointer">
                                            <div :style="`background-color: ${trend.color}`" class="w-5 h-5 rounded-full"></div>
                                            <div>{{ trend.text }}</div>
                                        </div>
                                    </ListboxOption>
                                </ListboxOptions>
                            </Listbox>
                        </div>
                    </div>
                </tab>

                <tab class="font-ttnorms" title="Фундаментальные показатели">
                    <div class="flex space-x-7 2xl:space-x-14">
                        <div>
                            <div>fwd P/E24</div>
                            <div>
                                <input v-model="stock.fwd.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.fwd.color" @click="stock.fwd.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.fwd.color" @click="stock.fwd.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.fwd.color" @click="stock.fwd.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.fwd.color" @click="stock.fwd.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Debt/Equity</div>
                            <div>
                                <input v-model="stock.debtEquity.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red"  type="radio" value="#FF005C" id="red" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow"  type="radio" value="#FBBC05" id="yellow" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple"  type="radio" value="#AD92B7" id="gray" v-model="stock.debtEquity.color" @click="stock.debtEquity.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Current ratio</div>
                            <div>
                                <input v-model="stock.currentRatio.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.currentRatio.color" @click="stock.currentRatio.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Open interest</div>
                            <div>
                                <input v-model="stock.openInterest.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.openInterest.color" @click="stock.openInterest.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.openInterest.color" @click="stock.openInterest.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.openInterest.color" @click="stock.openInterest.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.openInterest.color" @click="stock.openInterest.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Analysis</div>
                            <div>
                                <input v-model="stock.analysis.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.analysis.color" @click="stock.analysis.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.analysis.color" @click="stock.analysis.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.analysis.color" @click="stock.analysis.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.analysis.color" @click="stock.analysis.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Short float</div>
                            <div>
                                <input v-model="stock.shortFloat.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.shortFloat.color" @click="stock.shortFloat.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.shortFloat.color" @click="stock.shortFloat.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.shortFloat.color" @click="stock.shortFloat.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.shortFloat.color" @click="stock.shortFloat.num = 0">
                                </div>
                            </div>
                        </div>
                    </div>
                </tab>
                <tab class="font-ttnorms" title="Тех. анализ">
                   <div class="flex space-x-7 2xl:space-x-14">
                        <div>
                            <div>Уровни</div>
                            <div>
                                <input v-model="stock.levels.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.levels.color" @click="stock.levels.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.levels.color" @click="stock.levels.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.levels.color" @click="stock.levels.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.levels.color" @click="stock.levels.num = 0">
                                </div>
                            </div>
                        </div> 

                        <div>
                            <div>Fibo</div>
                            <div>
                                <input v-model="stock.fibo.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.fibo.color" @click="stock.fibo.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.fibo.color" @click="stock.fibo.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.fibo.color" @click="stock.fibo.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.fibo.color" @click="stock.fibo.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Stoch</div>
                            <div>
                                <input v-model="stock.stoch.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.stoch.color" @click="stock.stoch.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.stoch.color" @click="stock.stoch.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.stoch.color" @click="stock.stoch.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.stoch.color" @click="stock.stoch.num = 0">
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>Pattern</div>
                            <div>
                                <input v-model="stock.pattern.text" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-40 border-2 rounded-md">
                                <div class="flex w-full justify-between px-2 mt-2">
                                    <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="stock.pattern.color" @click="stock.pattern.num = 1">
                                    <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="stock.pattern.color" @click="stock.pattern.num = 100">
                                    <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="stock.pattern.color" @click="stock.pattern.num = 10">
                                    <input class="bg-light-purple w-5 h-5 focus:ring-2 text-light-purple ring-light-purple" type="radio" value="#AD92B7" id="gray" v-model="stock.pattern.color" @click="stock.pattern.num = 0">
                                </div>
                            </div>
                        </div>
                   </div>
                </tab>
            </tabs>

        	<button class="mt-10 absolute bottom-10 right-10 hover: hover:border-white text-light-purple border-2 border-light-purple rounded-lg px-4 py-3" @click="addStock(); router.go(-1)">Сохранить</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import stockFuncs from '../composables/stockFuncs'
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'
import StockNav from '../components/StockNav.vue'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'
export default defineComponent({
  components: { Tab, Tabs, Listbox, ListboxButton, ListboxOptions, ListboxOption, StockNav },
    setup() {
        const router = useRouter()
        const route = useRoute()
        const { stock, addStock, handleChange, uploadImage, file } = stockFuncs()
        const activeTab = ref(0)

        const sectors = [
            { id: 1, name: 'Товары первой необходимости' },
            { id: 2, name: 'Технологии' },
            { id: 3, name: 'Услуги' },
        ]

        const trendOptions = [
                { color: '#00FF4A', text: 'Аптренд', num: 1 },
                { color: '#FF005C', text: 'Даунтренд', num: 100 },
                { color: '#FBBC05', text: 'Зона риска', num: 10 },
                { color: '#AD92B7', text: 'Флэт', num: 0 },
        ] 
        
        const selectedSector = ref<any>(sectors[0])
        const selectedHighLows = ref<any>(trendOptions[0])
        const selectedSmaEma = ref<any>(trendOptions[0])
        const selectedAccum = ref<any>(trendOptions[0])
        const selectedAdx = ref<any>(trendOptions[0])
        const trendParams = ref<any>([selectedHighLows, selectedSmaEma, selectedAccum, selectedAdx])

        watchEffect(() => {
            stock.value.sector = selectedSector.value
            stock.value.highLows = selectedHighLows.value
            stock.value.smaEma = selectedSmaEma.value
            stock.value.accum = selectedAccum.value
            stock.value.adx = selectedAdx.value
        })

        return {
            selectedHighLows,
            handleChange,
            selectedSmaEma,
            selectedAccum,
            selectedAdx,
            trendOptions,
            trendParams,
            sectors, 
            selectedSector, 
            router, 
            activeTab, 
            route, 
            stock, 
            addStock,
        }
    },
})
</script>