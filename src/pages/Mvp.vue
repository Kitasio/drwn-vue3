<template>
  <div>
    <h1 class="text-3xl text-center text-white">this is mvp</h1>

    <router-link :to="`/mvp/${doc.id}`" class="text-white" v-for="(doc, index) in docs" :key="index">
        <div :style="`color: ${doc.color}`">{{doc.ticker}}</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { db } from '../composables/fireConf'
import stockFuncs from '../composables/stockFuncs'
export default defineComponent({
    setup() {
        const { getStocks, docs } = stockFuncs()
        getStocks()

        return {docs}
    },
})
</script>

<style>

</style>