<template>
    <stock-nav></stock-nav>
    <div class="font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
		<div class="grid grid-cols-4">
            <stock-links class="hidden md:flex"></stock-links>
			<div class="col-span-4 lg:col-span-3 md:shadow-brand rounded-md md:p-7">
                <div class="text-xl mb-5 font-benzin-semibold">Калькулятор сделки</div>
                <div class="space-y-5">
                    <div class="flex items-end justify-between">
                        <div class="text-lg ">Баланс аккаунта</div>
                        <div class="flex items-center">
                            <input v-model="params.balance" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
                            $
                        </div>
                    </div>
                    <div class="flex items-end justify-between">
                        <div class="text-lg align-bottom">Риск на сделку</div>
                        <div class="flex items-center">
                            <input v-model="params.risk" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
                            %
                        </div>
                    </div>
                    <div class="flex items-end justify-between">
                        <div class="text-lg align-bottom">Точка входа</div>
                        <div class="flex items-center">
                            <input v-model="params.entry" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
                        </div>
                    </div>
                    <div class="flex items-end justify-between">
                        <div class="text-lg align-bottom">Стоп лосс</div>
                        <div class="flex items-center">
                            <input v-model="params.stop" type="text" class="mt-0 block px-0.5 border-0 border-b-2 border-gray-200 focus:ring-0 focus:border-black">
                        </div>
                    </div>
                </div>
                <div class="mt-10 space-y-2">
                    <div class="font-benzin-semibold text-xl">Вход: {{ params.entry }}</div>
                    <div class="font-benzin-semibold text-xl">Стоп: {{ params.stop }}</div>
                    <div class="font-benzin-semibold text-xl">Риск: {{ risk }}$</div>
                    <div class="font-benzin-semibold text-xl">Количество акций: {{ amount }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import StockLinks from '../components/StockLinks.vue'
import StockNav from '../components/StockNav.vue'

export default defineComponent({
  components: { StockNav, StockLinks },
    setup() {
        const params = ref<any>({
            balance: null,
            risk: null,
            entry: null,
            stop: null,
        })
        
        const risk = computed(() => {
            return Math.ceil(params.value.balance * (params.value.risk * 0.01))
        })

        const amount = computed(() => {
            return Math.floor(Math.ceil(params.value.balance * (params.value.risk * 0.01)) / (params.value.entry - params.value.stop))
        })

        return {
            params,
            risk,
            amount,
        }
    },
})
</script>
