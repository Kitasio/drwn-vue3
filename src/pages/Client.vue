<template>
	<stock-nav></stock-nav>

    <div class="md:h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
    	<div class="md:hidden">
    		<div class="font-benzin-bold text-xl">Мои акции</div>
    		<router-link :to="{ name: 'Analytics', params: { id: stock.id }}" class="border-t border-light-purple" v-for="stock in stocks" :key="stock.id">
				<div class="p-3 shadow-brand rounded-md mt-5">
					<div class="flex items-center mt-3 space-x-3">
						<div class="w-10">
							<img :src="stock.logo">
						</div>	
						<div class="font-benzin-bold text-lg">#{{stock.ticker}}</div>
					</div>
					<div class="mt-3 text-xl">{{stock.sector.name}}</div>
					<div class="flex justify-between mt-2">
						<div class="font-benzin-semibold text-sm">Тренд</div>
						<div class="flex space-x-2 items-center">
							<div class="w-4 h-4 rounded-full" :style="`background-color: ${stock.trendSum.color}`"></div>
							<div>{{ stock.trendSum.text }}</div>
						</div>
					</div>
					<div class="flex justify-between mt-2">
						<div class=	"font-benzin-semibold text-sm">Тех. анализ</div>
						<div class="flex space-x-2 items-center">
							<div class="w-4 h-4 rounded-full" :style="`background-color: ${stock.techSum.color}`"></div>
							<div>{{ stock.techSum.text }}</div>
						</div>
					</div>
					<div class="flex justify-between mt-2">
						<div class=	"font-benzin-semibold text-sm">Фундаментальный анализ</div>
						<div class="flex space-x-2 items-center">
							<div class="w-4 h-4 rounded-full" :style="`background-color: ${stock.fundSum.color}`"></div>
							<div>{{ stock.fundSum.text }}</div>
						</div>
					</div>
				</div>
    		</router-link>
            <div class="text-md my-5 font-benzin-semibold text-black">+ Предложить свою акцию</div>
			<div class="flex justify-between mb-5">
				<input v-model="suggestion.stock" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
				<div @click="addSuggestion" class="py-3 px-4 border-2 border-black rounded-md cursor-pointer">Отправить</div>
			</div>
			<div v-if="suggestionSent">Спасибо, ваше предложение отправлено</div>
			<div class="mt-20"></div>
    	</div>

		<div class="hidden md:grid grid-cols-4 h-5/6">
			<stock-links></stock-links>
			<div class="md:col-span-4 lg:col-span-3 shadow-brand overflow-scroll rounded-md px-10">
				<table class="table-auto my-5 border-b border-light-purple w-full">
						<thead class="border-b border-light-purple">
							<tr>
								<th class="pr-10 py-3 align-bottom text-left leading-4" v-for="(item, index) in info" :key="index">
									<div :class="{'lg:pl-16': (item == 'Тренд')}">{{ item }}</div>
								</th>
							</tr>
						</thead>
						<tbody>
								<tr class="border-b border-light-purple h-16" v-for="stock in stocks" :key="stock.id">
									<td class="pr-3">
										<router-link :to="{ name: 'Analytics', params: { id: stock.id }}"><img class="w-10 my-auto" :src="stock.logo" alt=""></router-link>
									</td>
									<td class="font-benzin-bold">
										<router-link :to="{ name: 'Analytics', params: { id: stock.id }}">#{{ stock.ticker }}</router-link>
									</td>
									<td>{{ stock.sector.name }}</td>
									<td>
										<div class="flex space-x-2 items-center lg:pl-16">
											<div class="w-4 h-4 rounded-full" :style="`background-color: ${stock.trendSum.color}`"></div>
											<div>{{ stock.trendSum.text }}</div>
										</div>
									</td>
									<td>
										<div class="flex space-x-2 items-center">
											<div class="w-4 h-4 rounded-full" :style="`background-color: ${stock.techSum.color}`"></div>
											<div>{{ stock.techSum.text }}</div>
										</div>
									</td>
									<td>
										<div class="flex space-x-2 items-center">
											<div class="w-4 h-4 rounded-full" :style="`background-color: ${stock.fundSum.color}`"></div>
											<div>{{ stock.fundSum.text }}</div>
										</div>
									</td>
									
								</tr>
							
							
						</tbody>
				</table>
				<div class="text-md mt-5 font-benzin-semibold text-black">+ Предложить свою акцию</div>
				<div class="flex space-x-10 mb-5 items-end">
					<input v-model="suggestion.stock" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
					<div class="align-bottom" v-if="suggestionSent">Спасибо, ваше предложение отправлено</div>
				</div>
				<div class="flex">
					<div @click="addSuggestion" class="py-3 px-4 mb-5 border-2 border-black rounded-md cursor-pointer">Отправить</div>
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

export default defineComponent({
  components: { StockLinks, StockNav },
	setup() {
        const { stocks, stock, getStocks, addSuggestion, suggestion, suggestionSent, addTgVisitor } = stockFuncs()
        getStocks()

		const info = ref(['', 'Тикер', 'Сектор', 'Тренд', 'Тех. анализ', 'Фундаментальный анализ'])

		onMounted(() => {
			addTgVisitor()
		})

        return {
        	stocks,
        	stock,
        	getStocks,
			info,
			addSuggestion,
			suggestion,
			suggestionSent,
        }
	}
})
</script>