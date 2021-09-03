<template>
	<TutClient v-if="haventSeenTut() && !user" />
	<stock-nav></stock-nav>
    <div class="md:h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
		<!-- MOBILE -->
    	<div class="md:hidden">
    		<div class="font-benzin-bold text-xl">Портфель</div>
    		<div @click="toggleFeatures = !toggleFeatures" class="font-benzin-semibold text-md mt-3 flex items-center space-x-2 cursor-pointer">
				<div>Характеристики</div>
				<img v-if="toggleFeatures" class="w-5 pt-0.5 cursor-pointer" src="../assets/icons/chevron-down.svg" alt="">
				<img v-else class="w-5 pt-0.5 cursor-pointer" src="../assets/icons/chevron-right.svg" alt="">
			</div>
			<div v-if="toggleFeatures" class="space-y-2 mt-3">
				<div v-for="feature in features" :key="feature.id">
					<p>{{ feature.feature.text }}</p>
				</div>
			</div>
    		<div v-for="stock in stocks" :key="stock.id">
				<div class="p-3 shadow-brand rounded-md mt-5">
					<div class="flex items-center justify-between mt-3 space-x-3">
						<div class="flex space-x-3 items-center">
							<div class="w-10">
								<img :src="stock.logo">
							</div>	
							<div class="font-benzin-bold text-lg uppercase">#{{stock.ticker}}</div>
						</div>
						<Sub :ticker="stock.ticker" class="text-sm text-purple cursor-pointer whitespace-nowrap">+ Подписаться</Sub>
					</div>
					<router-link @click="logTicker(stock.ticker)" :to="{ name: 'Analytics', params: { id: stock.id }}">
						<div class="font-benzin-semibold text-sm mt-4">Сектор</div>
						<div class="flex space-x-2 items-center">
							<div class="w-4 h-4 rounded-full" :style="`background-color: ${stock.sector.color}`"></div>
							<div class="">{{stock.sector.name}}</div>
						</div>
						<div class="font-benzin-semibold text-sm mt-4">Источники риска</div>
						<div class="flex justify-between mt-2">
							<div class="flex space-x-2 items-center font-benzin-semibold text-sm text-white">
								<div v-if="stock.techSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${stock.techSum.color}`">Т.А</div>
								<div v-if="stock.fundSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${stock.fundSum.color}`">Ф.А</div>
								<div v-if="stock.contextSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${stock.contextSum.color}`">Фон</div>
							</div>
						</div>
						<div class="font-benzin-semibold text-sm mt-4">Рекомендации</div>
						<div>
							<div>{{ stock.recommendation.text }}</div>
							<div>{{ stock.recommendation.comment }}</div>
						</div>
					</router-link>
				</div>
    		</div>
    	</div>
		<div class="shadow-brand md:hidden p-3 rounded-md mt-5">
			<div class="text-md my-5 font-benzin-semibold text-black">+ Предложить свою акцию</div>
			<div class="flex justify-between mb-5">
				<input v-model="suggestion.stock" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
				<div @click="addSuggestion" class="py-3 px-4 border-2 border-black rounded-md cursor-pointer">Отправить</div>
			</div>
			<div v-if="suggestionSent">Спасибо, ваше предложение отправлено</div>
			<div class="flex justify-center">
				<Sub ticker="рассылку" class="flex space-x-4 cursor-pointer py-2 px-4 w-42 bg-purple rounded-md self-center">
					<img class="w-5" src="../assets/icons/mail.svg" alt="">
					<p class="text-white leading-5">Подписаться <br>на рассылку</p>
				</Sub>
			</div>
		</div>

		<!-- DESKTOP -->
		<div class="hidden md:grid grid-cols-12 h-5/6">
			<stock-links></stock-links>
			<div class="md:col-span-12 lg:col-span-10 pb-10">
				<div id="box" class=" shadow-brand rounded-md px-10 pb-5">
					<div class="font-benzin-bold text-xl pt-5">Портфель</div>
					<div @click="toggleFeatures = !toggleFeatures" class="font-benzin-semibold text-md mt-3 flex items-center space-x-2 cursor-pointer">
						<div>Характеристики</div>
						<img v-if="toggleFeatures" class="w-5 pt-0.5 cursor-pointer" src="../assets/icons/chevron-down.svg" alt="">
						<img v-else class="w-5 pt-0.5 cursor-pointer" src="../assets/icons/chevron-right.svg" alt="">
					</div>
					<div v-if="toggleFeatures" class="space-y-2 mt-3">
						<div v-for="feature in features" :key="feature.id">
							<p>{{ feature.feature.text }}</p>
						</div>
					</div>
					<div class="mt-5">
						<header class="grid grid-cols-4 border-b border-t border-black py-3">
							<h1 class="py-3 align-bottom text-left leading-4">Тикер</h1>
							<h1 class="py-3 align-bottom text-left leading-4">Сектор</h1>
							<h1 class="py-3 align-bottom text-left leading-4">Источники риска</h1>
							<h1 class="py-3 align-bottom text-left leading-4">Рекомендации</h1>
						</header>
						<main v-for="(stock, index) in stocks" :key="index" class="grid grid-cols-4 py-3 border-b border-black transition transform duration-200 hover:shadow-y">
							<div class="flex space-x-2">
								<div class="cursor-pointer flex items-center" @click="stock.recommendation.show = !stock.recommendation.show">
									<img v-if="!stock.recommendation.show" class="w-5" src="../assets/icons/chevron-right.svg" alt="">
									<img v-else class="w-5" src="../assets/icons/chevron-down.svg" alt="">
								</div>

								<router-link @click="logTicker(stock.ticker)" class="flex items-center" :to="{ name: 'Analytics', params: { id: stock.id }}">
									<div class="flex space-x-3 items-center">
										<img class="w-10 my-auto" :src="stock.logo" alt="">
										<div class="font-benzin-bold">#{{ stock.ticker }}</div>
									</div>
								</router-link>
							</div>
							<router-link class="flex items-center" @click="logTicker(stock.ticker)" :to="{ name: 'Analytics', params: { id: stock.id }}">
								<div class="flex space-x-2">
									<svg class="w-4" style="min-width: 1rem;" viewBox="0 0 100 100" :fill="stock.sector.color" xmlns="http://www.w3.org/2000/svg">
										<circle cx="50" cy="50" r="50"/>
									</svg>
									<div>{{ stock.sector.name }}</div>
								</div>
							</router-link>
							<router-link class="flex items-center" @click="logTicker(stock.ticker)" :to="{ name: 'Analytics', params: { id: stock.id }}">
								<div class="flex space-x-2 items-center font-benzin-semibold text-sm text-white relative">
									<div v-if="stock.techSum.color != '#00FF4A'" :id="`tech${stock.id}`" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${stock.techSum.color}`">Т.А<span class="tooltip">Технический Анализ</span></div>
									<div v-if="stock.fundSum.color != '#00FF4A'" :id="`fund${stock.id}`" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${stock.fundSum.color}`">Ф.А<span class="tooltip">Фундаментальный Анализ</span></div>
									<div v-if="stock.contextSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${stock.contextSum.color}`">Фон</div>
								</div>
							</router-link>
							<div class="flex justify-between">
								<div>
									<p>{{ stock.recommendation.text}}</p>
								</div>
							<Sub :ticker="stock.ticker" class="text-sm text-purple cursor-pointer whitespace-nowrap">+ Подписаться</Sub>
							</div>
							<p class="col-span-4 mt-2" v-if="stock.recommendation.show">{{ stock.recommendation.comment}}</p>
						</main>
					</div>
				</div>

				<div class="mt-5 md:col-span-12 lg:col-span-10 shadow-brand overflow-scroll rounded-md px-10">
					<div class="text-md mt-5 font-benzin-semibold text-black">+ Предложить свою акцию</div>
					<div class="flex space-x-10 justify-between items-center">
						<div class="mt-2">
							<div class="flex items-center space-x-5">
								<input v-model="suggestion.stock" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
								<div @click="addSuggestion" class="py-3 px-4 mb-5 border-2 border-black rounded-md cursor-pointer">Отправить</div>
							</div>
							<div class="align-bottom" v-if="suggestionSent">Спасибо, ваше предложение отправлено</div>
						</div>
						<div class="flex justify-center">
							<Sub ticker="рассылку" class="flex space-x-4 cursor-pointer py-2 px-4 w-42 bg-purple rounded-md self-center">
								<img class="w-5" src="../assets/icons/mail.svg" alt="">
								<p class="text-white leading-5">Подписаться <br>на рассылку</p>
							</Sub>
						</div>
					</div>
				</div>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import stockFuncs from '../composables/stockFuncs'
import { useRouter } from 'vue-router'
import { ref, defineComponent, onMounted, watchEffect } from 'vue'
import StockLinks from '../components/StockLinks.vue'
import StockNav from '../components/StockNav.vue'
import TutClient from '../components/TutClient.vue'
import { analytics } from '../composables/fireConf'
import Sub from '../components/Sub.vue'
import authFuncs from '../composables/authFuncs'

export default defineComponent({
  components: { StockLinks, StockNav, Sub, TutClient, },
	setup() {
        const { stocks, stock, getStocks, addSuggestion, suggestion, suggestionSent, addTgVisitor, features, getFeatures } = stockFuncs()
		const { user, getUser } = authFuncs()
		getUser()
        getStocks()
		getFeatures()

		const info = ref(['', 'Тикер', 'Сектор', 'Тренд', 'Тех. анализ', 'Фундаментальный анализ'])

		onMounted(() => {
			addTgVisitor()
		})

		const logTicker = (ticker: string) => {
			analytics.logEvent("select_stock", {ticker: ticker})
		}

		const slideOne = ref(true)
		
		const toggleFeatures = ref(false)
		const toggleRec = ref(false)

		watchEffect(() => {
			try {
				stocks.value[0].recommendation.show = true
			} catch (error) {
				
			}
		})
		
		const haventSeenTut = () => {
			const tut = localStorage.getItem('tutClient')
			if (!tut) {
				return true
			} 
		}

        return {
        	stocks,
        	stock,
        	getStocks,
			info,
			addSuggestion,
			suggestion,
			suggestionSent,
			logTicker,
			features,
			toggleFeatures,
			toggleRec,
			slideOne,
			haventSeenTut,
			user,
        }
	}
})
</script>