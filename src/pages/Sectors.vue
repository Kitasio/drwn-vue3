<template>
  <stock-nav></stock-nav>

    <div class="md:hidden font-benzin-bold text-xl pl-3 mt-5">Сектора</div>
    <div class="md:hidden" v-for="s in sectors" :key="s.id">
        <div class="p-3 shadow-brand rounded-md mt-5 mx-3">
            <router-link :to="{ name: 'Sector', params: { id: s.id }}">
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
                        <div v-if="s.techSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${s.techSum.color}`">Т.А</div>
                        <div v-if="s.fundSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${s.fundSum.color}`">Ф.А</div>
                        <div v-if="s.contextSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${s.contextSum.color}`">Фон</div>
                    </div>
                </div>
                
            </router-link>
        </div>
    </div>

  <div class="md:h-screen font-ttnorms p-5 sm:p-10 lg:px-32 mx-auto">
    <div class="hidden md:grid grid-cols-12 h-5/6">
        <stock-links></stock-links>
        <div class="md:col-span-12 lg:col-span-10 pb-10">
            <div id="box" class="shadow-brand rounded-md px-10 pb-5">
                <div class="font-benzin-bold text-xl pt-5">Сектора</div>
                <header class="grid grid-cols-4 text-sm font-benzin-semibold pt-5 pb-3 border-b border-black">
                    <h1>Сектор</h1>
                    <h1>Цель / Поддержка</h1>
                    <h1>Ключевой фактор</h1>
                    <h1>Источники риска</h1>
                </header>
                <router-link :to="{ name: 'Sector', params: { id: s.id }}" v-for="(s, index) in sectors" :key="index" class="grid grid-cols-4 border-b border-black py-3 transition transform duration-200 hover:shadow-y">
                    <div class="flex space-x-2 items-center">
                        <svg class="w-4 h-4" :fill="s.context.color" style="min-width: 1rem;" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="50"/>
                        </svg>
                        <div>{{ s.name }}</div>
                    </div>
                    <div>
                        <div>Цель: <span class="text-base-green">{{ s.target }}</span></div>
                        <div>Поддержка: <span class="text-base-red">{{ s.support }}</span></div>
                    </div>
                    <p>{{s.keyFactor}}</p>
                    <div class="flex space-x-2 items-center font-benzin-semibold text-sm text-white relative">
                        <div v-if="s.techSum.color != '#00FF4A'" :id="`tech${s.id}`" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${s.techSum.color}`">Т.А<span class="tooltip">Технический Анализ</span></div>
                        <div v-if="s.fundSum.color != '#00FF4A'" :id="`fund${s.id}`" class="rounded-full py-1 px-3 has-tooltip" :style="`background-color: ${s.fundSum.color}`">Ф.А<span class="tooltip">Фундаментальный Анализ</span></div>
                        <div v-if="s.contextSum.color != '#00FF4A'" class="rounded-full py-1 px-3" :style="`background-color: ${s.contextSum.color}`">Фон</div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import StockLinks from '../components/StockLinks.vue'
import StockNav from '../components/StockNav.vue'
import sectorFuncs from '../composables/sectorFuncs'

export default defineComponent({
  components: { StockNav, StockLinks },
    setup() {
        const { getSectors, sectors } = sectorFuncs()
        getSectors()

        return {
           sectors,
        }
    },
})
</script>
