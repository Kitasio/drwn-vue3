<script>
import { provide, computed, ref } from "vue";
import stockFuncs from '../composables/stockFuncs'
import sectorFuncs from '../composables/sectorFuncs'

export default {
    name: "Tabs",
    props: {
        modelValue: {
            type: [String, Number],
        },
        selectedStock: {
            type: String,
        }
    },
    emits: ["update:modelValue"],
    setup(props, { slots, emit }) {
        const { embedChart, getStockTV } = stockFuncs()
        const { ideaChart } = sectorFuncs()
        const getStockForTab = (tab) => {
            if (tab == 'График' || tab == 'Обзор') {
                try {
                    embedChart(props.selectedStock)
                } catch (error) {
                    getStockTV(props.selectedStock)
                }
                ideaChart(props.selectedStock)
            }
        }
        const active = computed(() => props.modelValue);
        const tabs = ref([]);

        function selectTab(tab) {
            emit("update:modelValue", tab);
        }

        provide("tabsState", {
            active,
            tabs,
        });

        return {
            tabs,
            active,
            selectTab,
            getStockForTab,
        };
    },
};
</script>

<template>
    <ul class="flex flex-col lg:flex-row lg:space-x-10 font-ttnorms">
        <li
            v-for="(tab, i) of tabs"
            :key="i"
            :class="
                active === i
                    ? 'border-b-4 border-black box-content '
                    : 'border-light-purple text-gray-400'
            "
            class="flex items-center px-0 py-3 -mb-0.5  overflow-hidden cursor-pointer"
            @click="selectTab(i); getStockForTab(tab.props.title)"
        >
            {{ tab.props.title }}
        </li>
    </ul>
    <div class="bg-light-purple h-0.5"></div>
    <div class="mt-6">
        <slot />
    </div>
</template>