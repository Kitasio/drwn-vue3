<template>
    <stock-nav></stock-nav>
    <div class="h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
        <div class="rounded-lg p-5 h-5/6 lg:p-10 w-full overflow-scroll shadow-brand">
            <div class="flex justify-between">
                <div class="text-2xl font-benzin-semibold">Админ панель</div>
                <div class="flex space-x-10 items-center">
                    <router-link to="/admin/newStock" class="px-5 py-2 border-2 rounded-md cursor-pointer transition duration-200 hover:bg-deep-green hover:text-white border-deep-green text-deep-green">Добавить</router-link>
                    <div @click="logout" class="text-lg cursor-pointer text-gray-500 transition hover:text-black font-benzin-semibold">Logout</div>
                </div>
            </div>
            <tabs v-model="activeTab">
                <tab title="Акции">
                    <table class="table-auto my-5 border-b-2 border-light-purple w-full">
                        <thead class="border-b-2 border-light-purple">
                            <tr>
                                <th class="pr-10 py-3 align-bottom text-left leading-4">Тикер</th>
                                <th class="pr-10 py-3 align-bottom text-left leading-4">Сектор</th>
                                <th class="pr-10 py-3 align-bottom text-left leading-4">Фон</th>
                                <th class="pr-10 py-3 align-bottom text-left leading-4">Фунд. анализ</th>
                                <th class="pr-10 py-3 align-bottom text-left leading-4">Тех. анализ</th>
                                <th class="pr-10 py-3 align-bottom text-left leading-4">Рекомендация</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            <tr class="border-b-2 border-light-purple" v-for="stock in stocks" :key="stock.id">
                                
                                <td class="py-3">{{ stock.ticker }}</td>
                                <td class="py-3">
                                    <div class="flex items-center space-x-3">
                                        <svg class="w-4" style="min-width: 1rem;" viewBox="0 0 100 100" :fill="stock.sector.color" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="50"/>
                                        </svg>
                                        <div>{{ stock.sector.name }}</div>
                                    </div>
                                </td>
                                <td>
                                   <div class="flex items-center space-x-3">
                                        <svg class="w-4" style="min-width: 1rem;" viewBox="0 0 100 100" :fill="stock.contextSum.color" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="50"/>
                                        </svg>
                                        <div>{{ stock.contextSum.text }}</div>
                                    </div> 
                                </td>
                                 <td>
                                   <div class="flex items-center space-x-3">
                                        <svg class="w-4" style="min-width: 1rem;" viewBox="0 0 100 100" :fill="stock.fundSum.color" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="50"/>
                                        </svg>
                                        <div>{{ stock.fundSum.text }}</div>
                                    </div> 
                                </td>
                                 <td>
                                   <div class="flex items-center space-x-3">
                                        <svg class="w-4" style="min-width: 1rem;" viewBox="0 0 100 100" :fill="stock.techSum.color" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="50" cy="50" r="50"/>
                                        </svg>
                                        <div>{{ stock.techSum.text }}</div>
                                    </div> 
                                </td>
                                <td>{{stock.recommendation.text}}</td>
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
                </tab>
                <tab title="Характеристики">
                    <div class="flex space-x-2 items-baseline">
                        <input v-model="feature.text" type="text" class="w-1/2 mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
                        <div @click="addFeature" class="border-2 rounded-md border-black px-4 py-2 cursor-pointer">Добавить характеристику</div>
                    </div>
                    <div class="mt-5">
                        <div class="flex space-x-2 items-center" v-for="feature in features" :key="feature.id">
                            <p>{{feature.feature.text}}</p>
                            <div @click="deleteFeature(feature.id)" class="text-base-red cursor-pointer text-lg mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </tab>
                <tab title="Запросы">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left">Время</th>
                                <th class="text-left">Запрос</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in suggestions" :key="item.id">
                                <td class="pr-10">{{ getDate(item.createdAt.seconds) }}</td>
                                <td class="pr-10">{{ item.stock }}</td>
                                <td @click="deleteSuggestion(item.id)" class="text-base-red cursor-pointer text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </tab>
                <tab title="Телеграм посетители">
                    <table>
                        <thead>
                            <tr>
                                <th class="text-left">Время</th>
                                <th class="text-left">ID</th>
                                <th class="text-left">Name</th>
                                <th class="text-left">UserNik</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in tgVisitors" :key="item.id">
                                <td class="pr-10">{{ getDate(item.createdAt.seconds) }}</td>
                                <td class="pr-10">{{ item.userid }}</td>
                                <td class="pr-10">{{ item.name }}</td>
                                <td class="pr-10">{{ item.usernik }}</td>
                                <td @click="deleteTgVisitor(item.id)" class="text-base-red cursor-pointer text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
        const { stocks, stock, getStocks, addStock, updateStock, deleteStock, getSuggestions, suggestions, deleteSuggestion, tgVisitors, deleteTgVisitor, getTgVisitors, feature, features, getFeatures, addFeature, deleteFeature } = stockFuncs()
        getStocks()
        getSuggestions()
        getTgVisitors()
        getFeatures()

        const logout = () => {
            auth.signOut()
            router.push('/client')
        }

        const getDate = (unix: any) => {
            var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
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

        return { feature, features, getFeatures, addFeature, deleteFeature, tgVisitors, deleteTgVisitor, router, getDate, suggestions, deleteSuggestion, activeTab, stocks, stock, getStocks, updateStock, deleteStock, addStock, logout, stockParams }
    },
})
</script>

<style>

</style>