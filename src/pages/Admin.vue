<template>
    <stock-nav></stock-nav>
    <div class="h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
        <div class="rounded-lg p-5 h-5/6 lg:p-10 w-full overflow-scroll shadow-brand">
            <div class="flex justify-between">
                <div class="text-2xl font-benzin-semibold">Админ панель</div>
                <div @click="logout" class="text-lg cursor-pointer text-gray-500 transition hover:text-black font-benzin-semibold">Logout</div>
            </div>
            <tabs v-model="activeTab">
                <tab title="Акции">
                    <table class="table-auto my-5 border-b-2 border-light-purple">
                        <thead class="border-b-2 border-light-purple">
                            <tr>
                                <th class="pr-10 py-3 align-bottom leading-4" v-for="(param, index) in stockParams" :key="index">{{ param }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr class="border-b-2 border-light-purple" v-for="stock in stocks" :key="stock.id">
                                
                                <td class="py-3">{{ stock.ticker }}</td>
                                <td class="py-3">{{ stock.sector.name }}</td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.highLows.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.highLows.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.smaEma.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.smaEma.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.accum.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.accum.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.adx.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.adx.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.fwd.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.fwd.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.debtEquity.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.debtEquity.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.currentRatio.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.currentRatio.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.openInterest.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.openInterest.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.analysis.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.analysis.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.shortFloat.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.shortFloat.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.levels.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.levels.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.fibo.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.fibo.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.stoch.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.stoch.text}}</div>
                                    </div>
                                </td>
                                <td class="p-3">
                                    <div class="flex items-center">
                                        <div class="w-5 h-5 mr-1 rounded-full" :style="`background-color: ${stock.pattern.color}`"></div>
                                        <div class="whitespace-nowrap">{{ stock.pattern.text}}</div>
                                    </div>
                                </td>
                                <td>
                                    <router-link :to="`/admin/${stock.id}`">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </router-link>
                                </td>
                                <td @click="deleteStock(stock.id)" class="text-base-red cursor-pointer text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <router-link to="/admin/newStock" class="text-md font-benzin-semibold text-gray-400 hover:text-black transition duration-200">+ Добавить акцию</router-link>
                </tab>
                <tab title="Запросы">
                    <div v-for="item in suggestions" :key="item.id">
                        <div class="flex space-x-10">
                            <div>{{ item.stock }}</div>
                            <div>{{ getDate(item.createdAt.seconds) }}</div>
                        </div>
                    </div>
                </tab>
            </tabs>
            
        </div>
    </div>
</template>

<script lang="ts">
import { db, auth } from '../composables/fireConf'
import { defineComponent, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import stockFuncs from '../composables/stockFuncs'
import StockNav from '../components/StockNav.vue'
import Tab from '../components/Tab.vue'
import Tabs from '../components/Tabs.vue'
export default defineComponent({
  components: { StockNav, Tab, Tabs },
    setup() {
        const activeTab = ref(0)
        const router = useRouter()
        const { stocks, stock, getStocks, addStock, updateStock, deleteStock, getSuggestions, suggestions } = stockFuncs()
        getStocks()
        getSuggestions()

        const logout = () => {
            auth.signOut()
            router.push('/client')
        }

        const getDate = (unix: any) => {
            var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
            let date = new Date(unix * 1000).toLocaleDateString('ru-RU', options)
            return date
        }
        watchEffect(() => {
            getDate
        })

        const stockParams = ref([
            'Тикер',
            'Сектор',
            'Highs lows',
            'Sma Ema',
            'Accum/ Dist',
            'ADX',
            'fwd P/E24',
            'Debt/ Equity',
            'Current ratio',
            'Open interest',
            'Analysis',
            'Short float',
            'Уровни',
            'FIBO',
            'Stoch',
            'Pattern',
            '',
            '',
        ])

        return { router, getDate, suggestions, activeTab, stocks, stock, getStocks, updateStock, deleteStock, addStock, logout, stockParams }
    },
})
</script>

<style>

</style>