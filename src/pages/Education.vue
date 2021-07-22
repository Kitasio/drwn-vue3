<template>
  <div>
      <Navbar />
      <div class="bg-base-purple text-white">
          <div class="flex flex-col lg:mx-auto lg:max-w-screen-2xl py-20 sm:mx-10 md:flex-row md:justify-center lg:justify-between lg:px-32">
              <div id="algo-text" class="ml-8 md:w-2/3 lg:ml-0 md:mt-20 md:ml-0 lg:mt-5">
                  <div id="algo" class="font-benzin-bold text-3xl lg:text-5xl xl:text-6xl ">Обучение</div>
                  <div class="font-benzin-bold text-3xl lg:text-5xl xl:text-6xl ">инвестициям</div>
                  <div class="font-benzin-bold text-3xl lg:text-5xl xl:text-6xl ">и трейдингу</div>
                  <div class="font-ttnorms mt-5 sm:text-lg xl:text-2xl">Регулярно, полезно, применимо. От практиков,</div>
                  <div class="font-ttnorms sm:text-lg xl:text-2xl">на живых примерах</div>
                  <div class="flex">
                    <a :href="'http://t.me/drwntrade_bot/?start=' + utm" class="bot font-benzin-bold py-1 px-2 mt-8 xl:py-2 xl:px-3 xl:text-lg border-2 border-base-green rounded cursor-pointer transition duration-300 hover:bg-base-green hover:text-deep-purple uppercase">начать</a>
                  </div>
              </div>
              <div class="relative mt-5 md:mt-0 mr-3 lg:w-1/3 lg:mr-32">
                  <img class="z-10 macbook" src="/img/laptop.svg" alt="">
              </div>
          </div>
      </div>
      <div>
        <div class="bg-deep-purple text-white">
          <div class="sm:mx-auto max-w-screen-2xl">
            <div class="pt-7 mb-3 text-white text-3xl xl:text-4xl 2xl:text-5xl xl:w-1/3 leading-10 2xl:leading-normal font-bold font-benzin-semibold text-center sm:text-left sm:whitespace-nowrap sm:mx-6 lg:mx-32">{{ heading }}</div>
            <div class="flex flex-col flex-wrap sm:flex-row items-center">
                <div v-for="card in cards" :key="card.title" class="py-16 flex flex-col justify-center sm:w-64 md:w-80 lg:ml-28 xl:mr-5 max-w-md lg:flex-auto xl:flex-initial">
                    <div class="mb-3">
                        <img :src="card.img" alt="" class="mx-auto sm:mx-5">
                    </div>
                    <div class="flex flex-col justify-start">
                        <div class="text-center sm:text-left font-benzin-bold text-lg mx-5 mb-3">{{ card.title }}</div>
                        <div class="text-center sm:text-left mx-5 font-ttnorms">{{ card.subtitle }}</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <Courses />

      <div>
          <div class="bg-deep-purple text-white py-20">
              <div class="md:mx-auto max-w-screen-2xl">
                  <div class="mb-3 text-white text-3xl xl:text-4xl 2xl:text-5xl xl:w-1/3 leading-10 2xl:leading-normal font-bold font-benzin-semibold text-center sm:text-left sm:whitespace-nowrap sm:mx-6 lg:mx-32">Возможности для&nbsp; вас:</div>
                  <div class="mx-7 mt-10 sm:flex lg:ml-32 lg:justify-between">
                      <div class="mb-10 max-w-md w-72 lg:w-80 mr-5 lg:mr-20" v-for="(opp, index) in opps" :key="index">
                          <div class="font-benzin-bold text-base-green" v-html="opp.title"></div>
                          <div class="font-ttnorms mt-2" v-html="opp.sub"></div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <FreeLesson />
      <Services />
      <Footer />
  </div>
</template>

<script>
import Courses from '../components/Courses.vue'
import FreeLesson from '../components/FreeLesson.vue'
import Services from '../components/Services.vue'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'

export default {
    components: {
        Navbar,
        Courses,
        FreeLesson,
        Services,
        Footer,
    },
    data() {
        return {
            heading: "Как мы обучаем:",
            cards: [
                {
                    img: '/img/clock.svg',
                    title: 'Регулярно',
                    subtitle: '2 раза в месяц проводим воркшопы и вебинары. Вы тратите на заняти всего 40 минут.',
                },
                {
                    img: '/img/mecha.svg',
                    title: 'Полезно',
                    subtitle: 'Только готовые стратегии, а не набор разрозненной информации. Вам не нужны все индикаторы Вам нужны работающие комбинации.',
                },
                {
                    img: '/img/people.svg',
                    title: 'Применимо',
                    subtitle: 'Отрабатываем в группах. Знания ничто без навыка. Вы в группе с пофессионалами, с постоянной и мгновенной модерацией и поддержкой.',
                },
            ],
            opps: [
                {
                    title: 'Стримы с ответами на&nbsp; вопросы',
                    sub: 'Еженедельно мы&nbsp;проводим 2&nbsp;стрима: формирование вотчлиста и&nbsp;анализ портфеля, где отвечаем на&nbsp;вопросы и&nbsp;изучаем бумаги из&nbsp;Ваших портфелей'
                },
                {
                    title: 'Чат с&nbsp;глубоким обсуждением',
                    sub: 'В&nbsp;нашем чате десятки опытных трейдеров с&nbsp;разными стилями торговли, которые ведут содержательное обсуждение текущего рынка'
                },
                {
                    title: 'Персональные консультации',
                    sub: 'Вы&nbsp;можете разобрать свой портфель или сформировать новый с&nbsp;ведущими трейдерами сообщества'
                },
            ]
        }
    }
}
</script>

<style>

</style>