<script>
import { provide, computed, ref, watchEffect, watch } from "vue";
import stockFuncs from '../composables/stockFuncs'
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from '@headlessui/vue'

export default {
    components: { 
        Listbox,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
    },
    name: "AnalTabs",
    props: {
        modelValue: {
            type: [String, Number],
        },
    },
    emits: ["update:modelValue", "selected"],
    setup(props, { slots, emit }) {
        const active = computed(() => props.modelValue);
        const tabs = ref([]);

        function selectTab(tab) {
            emit("update:modelValue", tab);
        }

        function getTVforTab(tab) {
            if (tab == 0) {
                console.log()
                getStockTV(selectedStock.value.id.toString())
            }
        }

        const { stocks, getStocks, getStockTV } = stockFuncs()
        getStocks()
        const selectedStock = ref(stocks.value)

        watch(() => {
            emit('selected', selectedStock)
        })

        watchEffect(() => {
            selectedStock.value = stocks.value[0]
        })

        provide("tabsState", {
            active,
            tabs,
        });

        return {
            tabs,
            active,
            selectTab,
            stocks,
            selectedStock,
            getStockTV,
            getTVforTab,
        };
    },
};
</script>

<template>
    <div class="flex items-center justify-between">
        <div>
            <Listbox v-if="selectedStock" v-model="selectedStock">
                <ListboxButton class="py-2 px-3 border-2 border-light-purple rounded-md">
                    <div class="flex space-x-2 items-center">
                        <img class="w-8" :src="selectedStock.logo" alt="">
                        <div class="font-benzin-semibold">#{{ selectedStock.ticker }}</div>
                        <img class="w-3" src="/img/icons/arrowDown.svg" alt="">
                    </div>
                </ListboxButton>
                <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
                >
                    <ListboxOptions class="absolute mt-2 z-10 bg-white w-40 py-2 px-3 border-2 border-light-purple rounded-md">
                        <ListboxOption
                            v-for="stock in stocks"
                            :key="stock"
                            :value="stock"
                        >
                            <!-- @click="getStockTV(stock.id.toString())" -->
                            <div v-if="stock != selectedStock" class="flex py-2 space-x-2 items-center cursor-pointer border-b border-light-purple">
                                <img class="w-8" :src="stock.logo" alt="">
                                <div class="font-benzin-semibold">#{{ stock.ticker }}</div>
                            </div>
                        </ListboxOption>
                    </ListboxOptions>
                </transition>
            </Listbox>
        </div>
        <ul class="flex flex-col lg:flex-row lg:space-x-10 font-ttnorms border-b-2 border-light-purple">
            <li
                v-for="(tab, i) of tabs"
                :key="i"
                :class="
                    active === i
                        ? 'border-b-4 border-black box-content '
                        : 'border-light-purple text-gray-400'
                "
                class="flex items-center px-0 py-3 -mb-0.5  overflow-hidden cursor-pointer"
                @click="selectTab(i); "
            >
            <!-- getTVforTab(i) -->
                {{ tab.props.title }}
            </li>
        </ul>
    </div>
    <keep-alive>
        <div class="mt-6">
            <slot />
        </div>
    </keep-alive>
</template>