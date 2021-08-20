<template>
    <stock-nav></stock-nav>
    <div class="h-screen  p-5 sm:p-10 lg:px-32 mx-auto">
        <div class="font-ttnorms relative rounded-lg shadow-brand p-5 lg:p-10 w-full h-5/6  overflow-scroll">
            <div class="flex justify-between items-center">
                <div class="text-2xl mb-5 font-benzin-semibold">Редактирование Сектора</div>
                <button class="px-5 py-2 border-2 rounded-md cursor-pointer transition duration-200 hover:bg-deep-green hover:text-white border-deep-green text-deep-green" @click="updateSector(route.params.id.toString()); router.go(-1)">Сохранить</button>
            </div>
            <tabs v-model="activeTab">
              <tab title="Основное">
                <div>
                  <div>Название сектора</div>
                  <input v-model="sector.name" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                </div>

                <div class="flex mt-5 space-x-10">
                  <div class="space-y-2">
                    <div>Цель</div>
                    <input v-model="sector.target" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                  </div>
                  <div class="space-y-2">
                    <div>Поддержка</div>
                    <input v-model="sector.support" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                  </div>
                  <div class="space-y-2">
                    <div>Ключевой фактор</div>
                    <input v-model="sector.keyFactor" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-56 border-2 rounded-md">
                  </div>
                  <div class="space-y-2">
                    <p>Общий фон</p>
                    <div class="flex space-x-3">
                        <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="sector.context.color">
                        <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="sector.context.color">
                        <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="sector.context.color">
                    </div>
                  </div>
                </div>

                <div class="mt-5">
                  <div>Trading View</div>
                  <input v-model="sector.tradingView" type="text" class=" border-light-purple focus:border-light-purple focus:ring-0 w-80 border-2 rounded-md">
                </div> 
              </tab>
              <tab title="Сценарии">
                  <div class="grid grid-cols-2 gap-5">
                    <div>
                        <h1>Название</h1>
                        <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.name" type="text"></textarea>
                    </div>
                    <div>
                        <h1>Описание</h1>
                        <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.description" type="text"></textarea>
                    </div>
                    <div>
                        <h1>Проект решения</h1>
                        <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.project" type="text"></textarea>
                    </div>
                    <div>
                        <h1>Вероятность</h1>
                        <textarea class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="scenario.probability" type="text"></textarea>
                        <div class="flex space-x-1">
                            <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="scenario.color">
                            <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="scenario.color">
                            <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="scenario.color">
                        </div>
                    </div>
                </div>
                <div class="flex cursor-pointer mt-3">
                    <div class="border-2 border-black rounded-md px-4 py-3" @click="pushScenario">Добавить сценарий</div>
                </div>
                <div class="mt-5">
                    <table v-if="sector.scenarios[0]" class="table-auto w-full">
                        <thead>
                            <tr class="border-b border-t">
                                <th class="text-left py-3">Название</th>
                                <th class="text-left">Описание</th>
                                <th class="text-left">Проект решения</th>
                                <th class="text-left">Вероятность</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b" v-for="(s, index) in sector.scenarios" :key="s.id">
                                <td class="py-3">{{ s.name }}</td>
                                <td>{{ s.description }}</td>
                                <td>{{ s.project }}</td>
                                <td class="flex items-center my-auto py-3 space-x-3">
                                    <div>{{ s.probability }}</div>
                                    <div class="w-4 h-4 rounded-full" :style="`background-color: ${s.color}`"></div>
                                </td>
                                <td @click="sector.scenarios.splice(index, 1)" class="text-base-red cursor-pointer text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
              </tab>
              <tab title="Факторы влияния">
                  <div class="grid grid-cols-4 gap-5">
                    <div>
                        <h1>Фактор</h1>
                        <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="factor.name" type="text">
                    </div>
                    <div>
                        <h1>Корреляция</h1>
                        <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="factor.corr" type="text">
                    </div>
                    <div>
                        <h1>Потенциал роста, в %</h1>
                        <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="factor.potential" type="text">
                    </div>
                    <div>
                        <h1>Продолжительность роста в неделях</h1>
                        <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="factor.longevity" type="text">
                    </div>
                </div>
                <div class="flex cursor-pointer mt-3">
                    <div class="border-2 border-black rounded-md px-4 py-3" @click="pushFactor">Добавить фактор</div>
                </div>
                <div class="mt-5">
                    <table v-if="sector.factors[0]" class="table-auto w-full">
                        <thead>
                            <tr class="border-b border-t">
                                <th class="text-left py-3">Факторы</th>
                                <th class="text-left">Корреляция</th>
                                <th class="text-left">Потенциал роста, в %</th>
                                <th class="text-left">Продолжительность роста в неделях</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-b" v-for="(s, index) in sector.factors" :key="s.id">
                                <td class="py-3">{{ s.name }}</td>
                                <td>{{ s.corr }}</td>
                                <td>{{ s.potential }}</td>
                                <td>{{ s.longevity }}</td>
                                <td @click="sector.factors.splice(index, 1)" class="text-base-red cursor-pointer text-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                    </svg>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="grid grid-cols-3 gap-3 pt-5">
                  <p>Стадия цикла загрузки производства</p>
                  <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="sector.cycle.first" type="text">
                  <div></div>
                  <p>Стадия цикла инвестиций в производство</p>
                  <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="sector.cycle.second" type="text">
                  <div></div>
                  <p>Стадия цикла инвестиций в инфраструктуру</p>
                  <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="sector.cycle.third" type="text">
                  <div></div>
                  <p>Этап шок-колебания</p>
                  <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="sector.cycle.shock" type="text">
                  <div></div>
                </div>
              </tab>
              <tab title="Новости и фон">
                  <div class="grid grid-cols-3 gap-5">
                    <div>
                        <h1>Новость</h1>
                        <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="news.text" type="text">
                    </div>
                    <div>
                        <h1>Тип</h1>
                        <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="news.type" type="text">
                    </div>
                    <div>
                        <h1>Потенциал роста</h1>
                        <input class="border-light-purple w-full focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="news.potential" type="text">
                    </div>
                    <div>
                        <p>В целом</p>
                        <div class="flex space-x-1">
                            <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="sector.contextSum.color">
                            <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="sector.contextSum.color">
                            <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="sector.contextSum.color">
                        </div> 
                    </div>
                </div>
                <div class="flex cursor-pointer mt-12">
                    <div class="border-2 border-black rounded-md px-4 py-3" @click="pushNews">Добавить новость</div>
                </div>
                <div class="mt-10">
                    <header class="grid grid-cols-3 py-3 border-b border-t border-black">
                        <h1>Новость</h1>
                        <h1>Тип</h1>
                        <h1>Потенциал роста</h1>
                    </header>
                    <main v-for="(i, index) in sector.news" :key="index" class="grid grid-cols-3 py-3 border-b border-black">
                        <p>{{ i.text }}</p>
                        <p>{{ i.type }}</p>
                        <div class="flex justify-between items-center">
                            <p>{{ i.potential }}</p>
                            <div @click="sector.news.splice(index, 1)" class="text-base-red cursor-pointer text-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </main>
                </div>
              </tab>
              <tab title="Фундаментальный анализ">
                <div class="2xl:w-2/3">
                  <header class="grid grid-cols-4 py-2 font-benzin-semibold">
                      <h1>Индикатор</h1>
                      <h1>Параметр</h1>
                      <h1>Изменение</h1>
                      <h1>Потенциал</h1>
                  </header>
                  <main v-for="(i, index) in sector.fund" :key="index" class="grid grid-cols-4 py-1">
                    <p>{{i.name}}</p>
                    <input class="border-light-purple w-32 focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="i.param" type="text">
                    <input class="border-light-purple w-32 focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="i.change" type="text">
                    <input class="border-light-purple w-32 focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="i.potential" type="text">
                  </main>
                  <div>
                    <p>В целом</p>
                    <div class="flex space-x-1">
                        <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="sector.fundSum.color">
                        <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="sector.fundSum.color">
                        <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="sector.fundSum.color">
                    </div> 
                  </div>
                </div>
              </tab>
              <tab title="Технический анализ">
                <div class="2xl:w-2/3">
                  <header class="grid grid-cols-4 py-2 font-benzin-semibold">
                      <h1>Индикатор</h1>
                      <h1>Параметр</h1>
                      <h1>Изменение</h1>
                      <h1>Потенциал</h1>
                  </header>
                  <main v-for="(i, index) in sector.tech" :key="index" class="grid grid-cols-4 py-1">
                    <p>{{i.name}}</p>
                    <input class="border-light-purple w-32 focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="i.param" type="text">
                    <input class="border-light-purple w-32 focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="i.change" type="text">
                    <input class="border-light-purple w-32 focus:border-light-purple focus:ring-0 border-2 rounded-md" v-model="i.potential" type="text">
                  </main>
                  <div>
                    <p>В целом</p>
                    <div class="flex space-x-1">
                        <input class="bg-base-green w-5 h-5 focus:ring-2 text-base-green ring-base-green" type="radio" value="#00FF4A" id="green" v-model="sector.techSum.color">
                        <input class="bg-base-red w-5 h-5 focus:ring-2 text-base-red ring-base-red" type="radio" value="#FF005C" id="red" v-model="sector.techSum.color">
                        <input class="bg-base-yellow w-5 h-5 focus:ring-2 text-base-yellow ring-base-yellow" type="radio" value="#FBBC05" id="yellow" v-model="sector.techSum.color">
                    </div> 
                  </div>
                </div>
              </tab>
            </tabs>
        </div>
    </div>
</template>

<script setup>
import StockNav from '../components/StockNav.vue';
import Tabs from '../components/Tabs.vue'
import Tab from '../components/Tab.vue'

import sectorFuncs from '../composables/sectorFuncs'
import { ref } from '@vue/reactivity';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const { sector, updateSector, getSector } = sectorFuncs()
const activeTab = ref(0)

getSector(route.params.id.toString())

const scenario = ref({
    name: '',
    description: '',
    project: '',
    probability: '',
    color: '',
})
const pushScenario = () => {
    sector.value.scenarios.push(scenario.value)
    scenario.value = {
        name: '',
        description: '',
        project: '',
        probability: '',
        color: '',
    }
}

const factor = ref({
    name: '',
    corr: '',
    potential: '',
    logevity: '',
})
const pushFactor = () => {
    sector.value.factors.push(factor.value)
    factor.value = {
      name: '',
      corr: '',
      potential: '',
      logevity: '',
    }
}

const news = ref({
  text: '',
  type: '',
  potential: '',
})
const pushNews = () => {
    sector.value.news.push(news.value)
    news.value = {
      text: '',
      type: '',
      potential: '',
    }
}
</script>
