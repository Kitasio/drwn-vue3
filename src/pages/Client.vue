<template>
	<stock-nav></stock-nav>

    <div class="h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
    	<div class="rounded-md shadow-brand h-5/6 p-3 md:hidden">
    		<div class="font-benzin-bold text-xl">Мои акции</div>
    		<router-link :to="{ name: 'Analytics', params: { id: stock.id }}" class="border-t border-light-purple mt-5" v-for="stock in stocks" :key="stock.id">
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
						<div class="w-4 h-4 bg-base-green rounded-full"></div>
						<div>{{ stock.highLows.text }}</div>
					</div>
    			</div>
    			<div class="flex justify-between mt-2">
    				<div class=	"font-benzin-semibold text-sm">Тех. анализ</div>
    				<div class="flex space-x-2 items-center">
						<div class="w-4 h-4 bg-base-green rounded-full"></div>
						<div>{{ stock.highLows.text }}</div>
					</div>
    			</div>
    			<div class="flex justify-between mt-2">
    				<div class=	"font-benzin-semibold text-sm">Фундаментальный анализ</div>
    				<div class="flex space-x-2 items-center">
						<div class="w-4 h-4 bg-base-green rounded-full"></div>
						<div>{{ stock.highLows.text }}</div>
					</div>
    			</div>
    		</router-link>
    	</div>

		<div class="hidden md:grid grid-cols-4 h-5/6">
			<stock-links></stock-links>
			<div class="md:col-span-4 lg:col-span-3 shadow-brand rounded-md px-10">
				<table class="table-auto my-5 border-b border-light-purple w-full">
						<thead class="border-b border-light-purple">
							<tr>
								<th class="pr-10 py-3 align-bottom text-left leading-4" v-for="(item, index) in info" :key="index">
									<div :class="{'lg:pl-16': (item == 'Тренд')}">{{ item }}</div>
								</th>
							</tr>
						</thead>
						<tbody>
								<tr class="border-b border-light-purple" v-for="stock in stocks" :key="stock.id">
									<router-link :to="{ name: 'Analytics', params: { id: stock.id }}" >
										<td class="py-2"><img class="w-10" :src="stock.logo" alt=""></td>
									</router-link>
									<td class="font-benzin-bold">#{{ stock.ticker }}</td>
									<td>{{ stock.sector.name }}</td>
									<td>
										<div class="flex space-x-2 items-center lg:pl-16">
											<div class="w-5 h-5 rounded-full" :style="`background-color: ${stock.highLows.color}`"></div>
											<div>{{ stock.highLows.text }}</div>
										</div>
									</td>
									<td>
										<div class="flex space-x-2 items-center">
											<div class="w-5 h-5 rounded-full" :style="`background-color: ${stock.highLows.color}`"></div>
											<div>{{ stock.highLows.text }}</div>
										</div>
									</td>
									<td>
										<div class="flex space-x-2 items-center">
											<div class="w-5 h-5 rounded-full" :style="`background-color: ${stock.highLows.color}`"></div>
											<div>{{ stock.highLows.text }}</div>
										</div>
									</td>
									
								</tr>
							
							
						</tbody>
				</table>
			</div>
		</div>
    </div>
</template>

<script lang="ts">
import stockFuncs from '../composables/stockFuncs'
import { useRouter } from 'vue-router'
import { ref, defineComponent } from 'vue'
import StockLinks from '../components/StockLinks.vue'
import StockNav from '../components/StockNav.vue'

export default defineComponent({
  components: { StockLinks, StockNav },
	setup() {
        const { stocks, stock, getStocks } = stockFuncs()
        getStocks()

		const info = ref(['', 'Тикер', 'Сектор', 'Тренд', 'Тех. анализ', 'Фундаментальный анализ'])

        return {
        	stocks,
        	stock,
        	getStocks,
			info,
        }
	}
})
</script>