<template>
		<div v-if="slideOne && $route.path != '/sectors'" class="w-full h-screen bg-base-purple z-10 bg-opacity-50 fixed flex items-center justify-center">
			<div  class="mx-5 rounded sm:w-1/2 xl:w-4/12">
				<div class="rounded-md overflow-hidden">
					<div class="bg-white px-5 py-3 space-y-3 lg:px-14 lg:py-7">
						<h1 class="text-3xl text-purple font-benzin-bold">Привет! Это DRWN!</h1>
						<p>Сервис, который помогает мгновенно и правильно отслеживать состояние Вашего портфеля акций относительно силы секторов</p>
						<div class="flex">
							<div @click="slideOne = false" class="border-2 rounded-md hover:bg-gray-900 hover:text-white transition duration-200 cursor-pointer border-black px-5 py-2 font-ttnorms">ПОНЯЛ!</div>
						</div>
					</div>
					<div class="grad flex justify-end">
						<img class="mr-7 mt-10" src="../assets/img/right-man.svg" alt="">
					</div>
				</div>
			</div>
		</div>

		<div v-else-if="!slideOne && $route.path != '/sectors'" class="w-full h-screen bg-base-purple z-10 bg-opacity-50 fixed">
			<div class="p-5 sm:p-10 lg:pl-3 lg:pr-32 mx-auto mt-20">
				<div class=" md:grid grid-cols-12 gap-5">
					<div class="col-span-3 place-self-start bg-white px-5 py-3 space-y-3 font-ttnorms lg:py-7 rounded-md overflow-hidden">
						<h1 class="text-3xl text-purple font-benzin-bold">Акции</h1>
						<p>Сервис оценивает Ваш портфель по ряду параметров</p>
						<div class="flex">
							<div @click="$router.push('/sectors')" class="border-2 rounded-md hover:bg-gray-900 hover:text-white transition duration-200 cursor-pointer border-black px-5 py-2 font-ttnorms">ПОНЯЛ!</div>
						</div>
					</div>


					<div class="md:hidden font-ttnorms">
						<div v-for="stock in stocks.slice(0,1)" :key="stock.id">
							<div class="p-3 shadow-brand rounded-md mt-5 overflow-hidden bg-white">
								<div class="flex items-center justify-between mt-3 space-x-3">
									<div class="flex space-x-3 items-center">
										<div class="w-10">
											<img :src="stock.logo">
										</div>	
										<div class="font-benzin-bold text-lg uppercase">#{{stock.ticker}}</div>
									</div>
									<div :ticker="stock.ticker" class="text-sm text-purple cursor-pointer whitespace-nowrap">+ Подписаться</div>
								</div>
								<div>
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
								</div>
							</div>
						</div>
					</div>


					<div class="md:col-span-12 lg:col-span-9 bg-white hidden md:grid font-ttnorms  rounded-md overflow-hidden">
						<div class=" shadow-brand rounded-md px-10 pb-5">
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
								<header class="grid grid-cols-4 border-b border-t border-light-purple py-3">
									<h1 class="py-3 align-bottom text-left leading-4">Тикер</h1>
									<h1 class="py-3 align-bottom text-left leading-4">Сектор</h1>
									<h1 class="py-3 align-bottom text-left leading-4">Источники риска</h1>
									<h1 class="py-3 align-bottom text-left leading-4">Рекомендации</h1>
								</header>
								<main v-for="stock in stocks.slice(0,1)" :key="stock.id" class="grid grid-cols-4 py-3 border-b border-light-purple">
									<div class="flex space-x-2">
										<div class="cursor-pointer flex items-center" @click="stock.recommendation.show = !stock.recommendation.show">
											<img v-if="stock.recommendation.show" class="w-5" src="../assets/icons/chevron-right.svg" alt="">
											<img v-else class="w-5" src="../assets/icons/chevron-down.svg" alt="">
										</div>
										<div>
											<div class="flex space-x-3 items-center">
												<img class="w-10 my-auto" :src="stock.logo" alt="">
												<div class="font-benzin-bold">#{{ stock.ticker }}</div>
											</div>
										</div>
									</div>
									<div>
										<div class="flex space-x-2">
											<svg class="w-4" style="min-width: 1rem;" viewBox="0 0 100 100" :fill="stock.sector.color" xmlns="http://www.w3.org/2000/svg">
												<circle cx="50" cy="50" r="50"/>
											</svg>
											<div>{{ stock.sector.name }}</div>
										</div>
									</div>
									<div>
										<div class="flex space-x-2 items-center font-benzin-semibold text-sm text-white relative">
											<div v-if="stock.techSum.color != '#00FF4A'" :id="`tech${stock.id}`" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${stock.techSum.color}`">Т.А<span class="tooltip">Технический Анализ</span></div>
											<div v-if="stock.fundSum.color != '#00FF4A'" :id="`fund${stock.id}`" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${stock.fundSum.color}`">Ф.А<span class="tooltip">Фундаментальный Анализ</span></div>
											<div v-if="stock.contextSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${stock.contextSum.color}`">Фон</div>
										</div>
									</div>
									<div class="flex justify-between">
										<div>
											<p>{{ stock.recommendation.text}}</p>
										</div>
									<div class="text-sm text-purple cursor-pointer whitespace-nowrap">+ Подписаться</div>
									</div>
									<p class="col-span-4 mt-2" v-if="!stock.recommendation.show">{{ stock.recommendation.comment}}</p>
								</main>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>


		<div v-else class="w-full h-screen bg-base-purple z-10 bg-opacity-50 fixed">
			<div class="p-5 sm:p-10 lg:pl-3 lg:pr-32 mx-auto mt-20">
				<div class=" md:grid grid-cols-12 gap-5">
					<div class="col-span-3 place-self-start bg-white px-5 py-3 space-y-3 font-ttnorms lg:py-7 rounded-md overflow-hidden">
						<h1 class="text-3xl text-purple font-benzin-bold">Сектора</h1>
						<p>Сервис также помогает оценить сектора по различным параметрам для формирования полной картины рынка</p>
						<div class="flex">
							<div @click="setTutClient(); $router.push('/client')" class="border-2 rounded-md hover:bg-gray-900 hover:text-white transition duration-200 cursor-pointer border-black px-5 py-2 font-ttnorms">ПОНЯЛ!</div>
						</div>
					</div>

					<div class="md:col-span-12 lg:col-span-9 hidden rounded-md overflow-hidden bg-white md:grid">
						<div class="shadow-brand rounded-md px-10 pb-5">
							<div class="font-benzin-bold text-xl pt-5">Сектора</div>
							<header class="grid grid-cols-4 text-sm font-benzin-semibold pt-5 pb-3 border-b border-black">
								<h1>Сектор</h1>
								<h1>Цель / Поддержка</h1>
								<h1>Ключевой фактор</h1>
								<h1>Источники риска</h1>
							</header>
							<div v-for="(s, index) in sectors.slice(0,2)" :key="index" class="grid grid-cols-4 border-b border-black py-3 transition transform duration-200 hover:shadow-y">
								<div class="flex space-x-2 items-center">
									<svg class="w-4 h-4" :fill="s.context.color" style="min-width: 1rem;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
										<circle cx="50" cy="50" r="50"/>
									</svg>
									<div>{{ s.name }}</div>
								</div>
								<div>
									<div>
										<div>Цель: <span class="text-base-green">{{ s.target }}</span></div>
										<div>Поддержка: <span class="text-base-red">{{ s.support }}</span></div>
									</div>
								</div>
								<p>{{s.keyFactor}}</p>
								<div class="flex space-x-2 items-center font-benzin-semibold text-sm text-white relative">
									<div>
										<div v-if="s.techSum.color !== '#00FF4A' && s.techSum.color" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${s.techSum.color}`">Т.А<span class="tooltip">Технический Анализ</span></div>
									</div>
									<div>
										<div v-if="s.fundSum.color !== '#00FF4A' && s.fundSum.color" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${s.fundSum.color}`">Ф.А<span class="tooltip">Фундаментальный Анализ</span></div>
									</div>
									<div>
										<div v-if="s.contextSum.color !== '#00FF4A' && s.contextSum.color" class="rounded-full py-1 px-3" :style="`background-color: ${s.contextSum.color}`">Фон</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="md:hidden  mx-auto" v-for="s in sectors.slice(0,2)" :key="s.id">
				<div class="p-3 shadow-brand rounded-md mt-5 mx-3 bg-white">
					<div>
						<div class="flex justify-between">
							<div>
								<div class="flex space-x-2 items-center">
									<div class="w-4 h-4 rounded-full" :style="`background-color: ${s.context.color}`"></div>
									<div class="font-benzin-semibold text-sm">{{s.name}}</div>
								</div>
							</div>
							<div class="font-ttnorms">
								<div>Цель: <span class="text-base-green">{{ s.target }}</span></div>
								<div>Поддержка: <span class="text-base-red">{{ s.support }}</span></div>
							</div>
						</div>
						<h1 class="font-benzin-semibold text-sm mt-4">Ключевой фактор</h1>
						<p class="font-ttnorms">{{s.keyFactor}}</p>
						<div class="font-benzin-semibold text-sm mt-4">Источники риска</div>
						<div class="flex justify-between mt-2">
							<div class="flex space-x-2 items-center font-benzin-semibold text-sm text-white">
								<div v-if="s.techSum.color != '#00FF4A' && s.techSum.color" class="rounded-full py-1 px-3" :style="`background-color: ${s.techSum.color}`">Т.А</div>
								<div v-if="s.fundSum.color != '#00FF4A' && s.fundSum.color" class="rounded-full py-1 px-3" :style="`background-color: ${s.fundSum.color}`">Ф.А</div>
								<div v-if="s.contextSum.color != '#00FF4A' && s.contextSum.color" class="rounded-full py-1 px-3" :style="`background-color: ${s.contextSum.color}`">Фон</div>
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
import { ref, defineComponent, onMounted } from 'vue'
import StockLinks from '../components/StockLinks.vue'
import StockNav from '../components/StockNav.vue'
import TutClient from '../components/TutClient.vue'
import { analytics } from '../composables/fireConf'
import Sub from '../components/Sub.vue'
import sectorFuncs from '../composables/sectorFuncs'

export default defineComponent({
    setup() {
        const { stocks, stock, getStocks, addSuggestion, suggestion, suggestionSent, addTgVisitor, features, getFeatures } = stockFuncs()
        getStocks()
		getFeatures()
		const { getSectors, sectors } = sectorFuncs()
        getSectors()

		const info = ref(['', 'Тикер', 'Сектор', 'Тренд', 'Тех. анализ', 'Фундаментальный анализ'])

		onMounted(() => {
			addTgVisitor()
		})

		const logTicker = (ticker: string) => {
			analytics.logEvent("select_stock", {ticker: ticker})
		}

		const setTutClient = () => {
			localStorage.setItem('tutClient', 1)
		}

		const slideOne = ref(true)
		
		const toggleFeatures = ref(false)
		const toggleRec = ref(false)

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
			setTutClient,
			sectors,
        }
	}
})
</script>
