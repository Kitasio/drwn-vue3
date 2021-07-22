<template>
  <div class="bg-deep-purple py-16">
      <div class="flex flex-col sm:mx-auto sm:max-w-screen-2xl">
          <div class="mb-3 text-white text-3xl xl:text-4xl 2xl:text-5xl xl:w-1/3 leading-10 2xl:leading-normal font-bold font-benzin-semibold text-center sm:text-left sm:whitespace-nowrap sm:mx-6 lg:ml-32">Доступные услуги</div>
          <div class="flex flex-wrap justify-center sm:justify-start sm:mx-2 lg:ml-28">
            <div v-for="tab in tabs" :key="tab.comp" @click="currentTab = tab.comp" :class="{ 'activeTab': currentTab === tab.comp }" class="font-nunito flex-initial m-3 text-light-purple font-bold border-2 rounded-full border-light-purple hover:text-white hover:border-base-green transition duration-300 text-center p-2 cursor-pointer">{{ tab.name }}</div>
          </div>
          <div>
              <component :is="currentTabComponent"></component>
          </div>
      </div>
  </div>
</template>

<script>
import All from './services/All.vue'
import Subscribers from './services/Subscribers.vue'
import Workshops from './services/Workshops.vue'
import Webinars from './services/Webinars.vue'
import Streams from './services/Streams.vue'
export default {
    components: {
        All,
        Subscribers,
        Workshops,
        Webinars,
        Streams,
    },
    data() {
        return {
            tabs: [
                { name: 'Все', comp: 'All' },
                { name: 'Подписки', comp: 'Subscribers' },
                { name: 'Воркшопы', comp: 'Workshops' },
                { name: 'Вебинары', comp: 'Webinars' },
                { name: 'Стримы', comp: 'Streams' },
            ], 
            currentTab: 'All',
        }
    },
    computed: {
        currentTabComponent() {
            return this.currentTab.toLowerCase()
        }
    }

}
</script>

<style>
.activeTab {
    border-color: #00ff4a !important;
    color: white !important;
}

</style>