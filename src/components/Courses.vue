<template>
  <div>
      <div v-if="!courseSelected" class="bg-base-purple">
          <div class="max-w-screen-2xl md:mx-auto text-white">
              <div class="py-20  grid sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-16 justify-center lg:justify-start mx-5  md:mx-32">
                  <div v-for="(course, index) in courses" :key="index" class="border-2 max-w-md xl:flex-initial border-light-purple transition duration-300 hover:border-base-green rounded cursor-pointer">
                      <div @click="courseSelected = true; currentCourse = course; infoTabs = course.tabs; currentInfo = course.tabs[0]" class="flex flex-col items-stretch h-full justify-between">
                        <div class="text-light-purple font-benzin-semibold ml-5 mt-5 text-sm" v-html="course.type"></div>
                        <div class="font-benzin-bold uppercase text-xl mx-5" v-html="course.title"></div>
                        <div class="font-ttnorms mt-5 mb-10 mx-5" v-html="course.subtitle"></div>
                        <img :src="course.img" alt="" class="self-end filter sm:grayscale transition duration-300 hover:grayscale-0">
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div v-else>
          <div class="bg-base-purple">
          <div class="lg:mx-auto max-w-screen-2xl py-10">
              <div class="flex flex-col">
                <div class="text-white">
                    <agile :options="myOptions" class="mx-5 mt-20 lg:mx-32 grid gap-x-16">
                                <template class="absolute top-0 right-0" slot="prevButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </template>
                                <template class="absolute" slot="nextButton">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </template>
                        <div v-for="(course, index) in courses" :key="index" class="border-2 max-w-md xl:flex-initial border-light-purple transition duration-300 hover:border-base-green rounded cursor-pointer h-132">
                            <div @click="currentCourse = course; infoTabs = course.tabs; currentInfo = course.tabs[0]" class="flex flex-col items-stretch h-full justify-between">
                                <div class="text-light-purple font-benzin-semibold ml-5 mt-5 text-sm" v-html="course.type"></div>
                                <div class="font-benzin-bold uppercase text-xl mx-5" v-html="course.title"></div>
                                <div class="font-ttnorms mt-5 mb-10 mx-5" v-html="course.subtitle"></div>
                                <img :src="course.img" alt="" class="self-end">
                            </div>
                        </div>
                    </agile>
                </div>

                <div class="order-first">
                    <div class="text-white">
                        <div class="pt-7 mb-10 text-white text-3xl xl:text-4xl 2xl:text-5xl xl:w-1/3 leading-10 2xl:leading-normal font-bold font-benzin-semibold ml-5 sm:whitespace-nowrap sm:mx-6 lg:mx-32 uppercase" v-html="currentCourse.title"></div>
                        <div class="md:flex">

                                <div class="md:w-130 lg:ml-28 lg:mr-10">
                                      <agile ref="main" :as-nav-for="asNavFor1" :options="options1" class="mx-5 mb-3">
                                            <div v-for="(slide, index) in currentCourse.images" :key="index" class="slide">
                                                <div>
                                                    <img class="object-cover w-full" :src="slide" alt="">
                                                </div>
                                            </div>
                                        </agile>
                                        <agile ref="thumbnails" :as-nav-for="asNavFor2" :options="options2" class="mx-5">
                                            <div v-for="(slide, index) in currentCourse.images" :key="index" @click="$refs.thumbnails.goTo(index)" class="slide">
                                                <img :src="slide" alt="" class="h-20">
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
                                            <p class="font-ttnorms mx-5" :class="[{ 'mb-3': line.last }, line.css]" v-html="line.data"></p>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex ml-5">
                                    <div class="font-benzin-bold py-1 px-2 mt-8 xl:py-2 xl:px-3 xl:text-lg border-2 border-base-green rounded cursor-pointer transition duration-300 hover:bg-base-green hover:text-deep-purple uppercase">купить</div>
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
    mounted() {
        this.asNavFor1.push(this.$refs.thumbnails)
		this.asNavFor2.push(this.$refs.main)
        this.infoTabs = this.currentCourse.tabs
        this.currentInfo = this.infoTabs[0]
    },
    data() {
        return {
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
            },
            courseSelected: false,
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
            currentCourse: {
                    type: 'Вебинар',
                    title: 'риск - менеджмент 2.0',
                    subtitle: 'Главный навык трейдера - управление риском.',
                    img: '/img/courses/1.png',
                    link: '#',
                    images: [
                            '/img/courses/1.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                            text: [
                                {
                                    data: 'hi hi i am text of default course',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
            courses: [
                {
                    type: 'Вебинар',
                    title: 'риск - менеджмент 2.0',
                    subtitle: 'Главный навык трейдера - управление риском.',
                    img: '/img/courses/1.png',
                    link: '#',
                    images: [
                            '/img/courses/1.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'О курсе',
                            text: [
                                {
                                    data: 'Главный навык трейдера – управление риском. Только так успешные сделки будут двигать Ваш капитал вперед, а неуспешные – не разрушать его.',
                                    last: true,
                                },
                                {
                                    data: '2200 ₽',
                                    css: 'font-benzin-bold text-xl',
                                    last: false,
                                },
                            ]
                        }
                    ]
                },
                {
                    type: 'Вебинар',
                    title: 'Введение в&nbsp;опционы',
                    subtitle: 'Позволяет овладеть базовыми понятиями и&nbsp;принципами использования опционов',
                    img: '/img/courses/2.png',
                    link: '#',
                    images: [
                            '/img/courses/2.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                            text: [
                                {
                                    data: 'hi hi i am text',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Воркшоп&nbsp;/ вебинар',
                    title: 'Опционные стратегии',
                    subtitle: 'Огромные возможности управления риском и&nbsp;доходностью',
                    img: '/img/courses/3.png',
                    link: '#',
                    images: [
                            '/img/courses/3.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                            text: [
                                {
                                    data: 'hi hi i am text',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Воркшоп',
                    title: 'Волновой анализ',
                    subtitle: 'Что стоит за&nbsp;волнами? Как их&nbsp;рассчитывать? На&nbsp;каком рынке уместны?',
                    img: '/img/courses/4.png',
                    link: '#',
                    images: [
                            '/img/courses/4.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                            text: [
                                {
                                    data: 'hi hi i am text',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Воркшоп&nbsp;/ вебинар',
                    title: 'Торговля пробоя',
                    subtitle: 'Хороший способ получить мощное, быстрое и&nbsp;большое движение в&nbsp;активах.',
                    img: '/img/courses/5.png',
                    link: '#',
                    images: [
                            '/img/courses/5.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                            text: [
                                {
                                    data: 'hi hi i am text',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Воркшоп&nbsp;/ вебинар',
                    title: 'Фундаментальный анализ',
                    subtitle: 'Описание воркшопа или вебинара максимум в&nbsp;две строчки',
                    img: '/img/courses/6.png',
                    link: '#',
                    images: [
                            '/img/courses/6.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                            text: [
                                {
                                    data: 'hi hi i am text',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Воркшоп&nbsp;/ вебинар',
                    title: 'Анализ РЕ компании',
                    subtitle: 'Вебинар откроет простой секрет показателя',
                    img: '/img/courses/7.png',
                    link: '#',
                    images: [
                            '/img/courses/7.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                           text: [
                                {
                                    data: 'hi hi i am text',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'Воркшоп&nbsp;/ вебинар',
                    title: 'Торговля на отчетах',
                    subtitle: 'Описание воркшопа или вебинара максимум в&nbsp;две строчки',
                    img: '/img/courses/8.png',
                    link: '#',
                    images: [
                            '/img/courses/8.png',
                            '/img/day1.jpg',
                            '/img/chart1.jpg',
                            '/img/chart2.jpg',
                            '/img/chart3.jpg',
                        ],
                    tabs: [
                        {
                            tab: 'tab1',
                            text: [
                                {
                                    data: 'hi hi i am text',
                                    last: false,
                                }
                            ]
                        }
                    ]
                },
            ]
        }
    }
}
</script>

<style>
.boxcard {
    min-width: 300px;
}
.white-text {
    color: white !important;
}
</style>