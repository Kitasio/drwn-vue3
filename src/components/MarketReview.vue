<template>
  <div>
      <div class="bg-base-purple">
          <div class="lg:mx-auto max-w-screen-2xl py-10">
              <div class="flex flex-col">
                <div class="text-white">
                    <agile :options="myOptions" class="mx-10 mt-20 lg:mx-32">
                                <template slot="prevButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 -mt-28 lg:-mt-32 -ml-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </template>
                                <template slot="nextButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 -mt-28 lg:-mt-32 -mr-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </template>
                        <div v-for="day in days" :key="day.date" @click="currentDay = day; infoTabs = day.tabs; currentInfo = day.tabs[0]" class="slide space-x-5 space-x-reverse">
                            <div class="font-benzin-semibold text-2xl text-light-purple mb-4">{{ day.date }}</div>
                            <div class="relative cursor-pointer">
                                <img class="object-cover" :src="day.images[0]" alt="">
                                <div class="absolute top-0 w-full h-full font-benzin-bold bg-black bg-opacity-0 hover:bg-opacity-30 transition duration-300 hover:border-base-green">
                                    <div class="flex justify-center h-full opacity-0 hover:opacity-100">
                                        <div class="self-center uppercase border-4 border-white transition duration-300 hover:border-base-green rounded text-sm p-2">Посмотреть</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </agile>
                </div>

                <div class="order-first">
                    <div class="text-white">
                        <div class="pt-7 mb-10 text-white text-3xl xl:text-4xl 2xl:text-5xl xl:w-1/3 leading-10 2xl:leading-normal font-bold font-benzin-semibold ml-5 sm:whitespace-nowrap sm:mx-6 lg:mx-32">Обзор рынка {{ currentDay.date }}</div>
                        <div class="md:flex">

                                <div class="md:w-130 lg:ml-28 lg:mr-10">
                                      <agile ref="main" :as-nav-for="asNavFor1" :options="options1" class="mx-5 mb-3">
                                            <div v-for="(slide, index) in currentDay.images" :key="index" class="slide">
                                                <div class="mr-2 md:mr-4">
                                                    <img class="object-cover w-full" :src="slide" alt="">
                                                </div>
                                            </div>
                                        </agile>
                                        <agile ref="thumbnails" :as-nav-for="asNavFor2" :options="options2" class="mx-5">
                                            <div v-for="(slide, index) in currentDay.images" :key="index" @click="$refs.thumbnails.goTo(index)" class="slide">
                                                <div class="w-32 h-20 cursor-pointer flex space-x-10 space-x-reverse">
                                                    <img :src="slide" alt="" class="object-cover">
                                                </div>
                                            </div>
                                        </agile>
                                        <div class="flex mt-5">
                                            <a href="https://t.me/drwn_trade" class="flex border-4 border-light-purple rounded ml-5 p-2 align-middle transition duration-300 hover:border-base-green">
                                                <div class="mr-2 uppercase font-benzin-bold text-sm">Подписаться</div>
                                                <img src="/img/tg.svg" alt="">
                                            </a>
                                            <a href="#" class="flex align-middle ml-4 p-1 border-4 border-red-600 rounded">
                                                <img src="/img/yt-red.svg" alt="">
                                            </a>
                                        </div>
                                </div>
                              
                            <div class="mt-16 md:mt-0 lg:max-w-xl">
                                <div class="flex ml-5">
                                    <div v-for="(data, index) in infoTabs" :key="index" @click="currentInfo = data" class="font-ttnorms cursor-pointer mr-5 p-2 text-light-purple rounded" :class="{'white-text bg-deep-purple': data.tab === currentInfo.tab}">{{ data.tab }}</div>
                                </div>
                                <div>
                                    <div class="mt-5">
                                        <div v-for="(line, index) in currentInfo.text" :key="index">
                                            <p class="font-ttnorms mx-5" :class="{ 'mb-3': line.last }">{{ line.data }}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        test: function() {
            console.log(this.$refs.thumbnails)
        }
    },
    mounted () {
		this.asNavFor1.push(this.$refs.thumbnails)
		this.asNavFor2.push(this.$refs.main)
        this.infoTabs = this.currentDay.tabs
        this.currentInfo = this.infoTabs[0]
        console.log(this.currentInfo)
	},
    data() {
        return {
            currentInfo: {},
            infoTabs: [],
            asNavFor1: [],
			asNavFor2: [],
			options1: {
				fade: true,
				navButtons: false,
                slidesToShow: 1,
			},
			
			options2: {
				autoplay: false,
                navButtons: false,
				slidesToShow: 3,
			},
            currentDay: {
                    date: "19.3.2021",
                    images: [
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: "Тема дня",
                            text: [
                                {
                                    data: 'Фьючерсы на SP500 растут на 0,5%',
                                    last: true,
                                },
                                {
                                    data: '— поддержка в SP500 на уровне 3888 - 20 sma',
                                    last: false,
                                },
                                {
                                    data: '— ️поддержка на уровне 3865 - хай февраля',
                                    last: false,
                                },
                                {
                                    data: '— сопротивление на уровне 3902 - уровень фибоначчи, где шла консолидация весь февраль',
                                    last: false,
                                },
                                {
                                    data: '— сопротивление на уровне 3959 - исторический максимум',
                                    last: true,
                                },
                                {
                                    data: '✅ Пробой 3935 — смена тренда на дневном графике',
                                    last: false,
                                },
                                {
                                    data: '✅ Цель: 4000-4020 — верхняя граница канала',
                                    last: false,
                                },
                                {
                                    data: '✅ Nasdaq все еще вне канала, ближайшая поддержка 12 898 — уровень Фибоначчи — сопротивление на уровне 13 330 - нижняя граница канала',
                                    last: true,
                                },
                            ],
                        },
                        {
                            tab: "Индексы",
                            text: [
                                {
                                    data: "index",
                                    last: false
                                },
                            ]
                        },
                        {
                            tab: "Сектора",
                            text: [
                                {
                                    data: "Sector",
                                    last: false
                                },
                            ]
                        },
                        {
                            tab: "Макро",
                            text: [
                                {
                                    data: "Macro",
                                    last: false
                                },
                            ]
                        },
                    ],
                },
            days: [
                {
                    date: "19.3.2021",
                    images: [
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: "Тема дня",
                            text: [
                                {
                                    data: 'Фьючерсы на SP500 растут на 0,5%',
                                    last: true,
                                },
                                {
                                    data: '— поддержка в SP500 на уровне 3888 - 20 sma',
                                    last: false,
                                },
                                {
                                    data: '— ️поддержка на уровне 3865 - хай февраля',
                                    last: false,
                                },
                                {
                                    data: '— сопротивление на уровне 3902 - уровень фибоначчи, где шла консолидация весь февраль',
                                    last: false,
                                },
                                {
                                    data: '— сопротивление на уровне 3959 - исторический максимум',
                                    last: true,
                                },
                                {
                                    data: '✅ Пробой 3935 — смена тренда на дневном графике',
                                    last: false,
                                },
                                {
                                    data: '✅ Цель: 4000-4020 — верхняя граница канала',
                                    last: false,
                                },
                                {
                                    data: '✅ Nasdaq все еще вне канала, ближайшая поддержка 12 898 — уровень Фибоначчи — сопротивление на уровне 13 330 - нижняя граница канала',
                                    last: true,
                                },
                            ],
                        },
                        {
                            tab: "Индексы",
                            text: [
                                {
                                    data: "index",
                                    last: false
                                },
                            ]
                        },
                        {
                            tab: "Сектора",
                            text: [
                                {
                                    data: "Sector",
                                    last: false
                                },
                            ]
                        },
                        {
                            tab: "Макро",
                            text: [
                                {
                                    data: "Macro",
                                    last: false
                                },
                            ]
                        },
                    ],
                },
                {
                    date: "18.3.2021",
                    images: [
                            '/img/day2.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: "Индексы",
                            text: [
                                {
                                    data: "Index",
                                    last: false
                                },
                            ]
                        }
                    ],
                    
                },
                {
                    date: "17.3.2021",
                    images: [
                            '/img/day3.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: "Секторы",
                            text: [
                                {
                                    data: "Sector",
                                    last: false
                                },
                            ]
                        }
                    ],
                },
            ],
            myOptions: {
                responsive: [
                    {
                        breakpoint: 640,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                        }
                    },
                ],
            }
        }
    }
}
</script>

<style scoped>
.white-text {
    color: white !important;
}
.thumbnails {
	margin: 0 -5px;
	width: calc(100% + 10px);
}
</style>