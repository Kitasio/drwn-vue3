<template>
  <div>
    <div>
    <div class="bg-deep-purple">
        <div class="flex justify-center items-center mx-auto max-w-screen-2xl">
            <div class="h-32 sm:mx-10 lg:mx-32 flex align-middle justify-around">
                <nuxt-link class="w-32 flex align-middle" to="/ideas">
                    <img class="w-32" src="../assets/img/logo.svg" alt="">
                </nuxt-link>
                <!-- <svg @click="isHidden = !isHidden" xmlns="http://www.w3.org/2000/svg" class="burger w-8 cursor-pointer sm:hidden" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="isHidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg> -->
            </div>

            <!-- <div id="menu" :class="{ hidden: isHidden }" class="uppercase text-white flex flex-col sm:flex-row ml-14 font-ttnorms">
                <nuxt-link to="/review" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">обзоры</nuxt-link>
                <nuxt-link to="#" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">обучение</nuxt-link>
                <nuxt-link to="#" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">идеи</nuxt-link>
                <nuxt-link to="#" class="links mb-3 sm:mb-0 sm:p-3 cursor-pointer sm:self-center sm:mr-5">контакты</nuxt-link>
            </div> -->

            <div class="flex self-center align-middle  cursor-pointer ml-14 sm:mb-0 sm:ml-auto sm:mr-10 lg:mr-32">
                <!-- <img class="w-7 mr-2 h-5" src="@/assets/img/ru.png" alt="">
                <img class="w-7 mr-2 h-5" src="@/assets/img/en.png" alt=""> -->
            </div>
        </div>
    </div>
</div>
<div>
      <div class="bg-base-purple text-white">
          <div class="flex flex-col lg:mx-auto lg:max-w-screen-2xl pt-20 sm:mx-10 md:flex-row md:justify-center lg:justify-between lg:px-32">
              <div id="algo-text" class="ml-8 md:w-2/3 lg:ml-0 md:mt-20 md:ml-0 lg:mt-5">
                  <div id="algo" class="font-benzin-bold text-3xl lg:text-5xl xl:text-6xl ">Инвест-идеи</div>
                  <div class="font-benzin-bold text-3xl lg:text-5xl xl:text-6xl ">с поддержкой</div>
                  <div class="font-benzin-bold text-3xl lg:text-5xl xl:text-6xl ">на каждом</div>
                  <div class="font-benzin-bold text-3xl lg:text-5xl xl:text-6xl ">этапе</div>
                  <div class="font-ttnorms mt-5 sm:text-lg xl:text-2xl">Полный доступ к ключевым этапам сделки</div>
                  <div class="font-ttnorms sm:text-lg xl:text-2xl">в вашем телефоне</div>
                  <div class="flex">
                    <a :href="'http://t.me/drwntrade_bot/?start=' + utm" class="bot font-benzin-bold mt-8 py-3 px-6 text-sm border-2 border-base-green rounded cursor-pointer transition duration-300 hover:bg-base-green hover:text-deep-purple uppercase">начать</a>
                  </div>
              </div>
              <div class="relative flex justify-center items-center mt-5 md:mt-0 mr-3 lg:w-1/3 lg:mr-32">
                  <img class="z-10 macbook w-56 md:w-96" src="/img/iphone.png" alt="">
              </div>
          </div>
      </div>

      <div class="bg-deep-purple text-white">
          <div id="arrowSection" class="flex flex-col lg:mx-auto lg:max-w-screen-2xl py-10 lg:py-28 sm:mx-10 md:flex-row md:justify-center">
              <div class="ml-8 pr-4 md:w-2/3 lg:ml-20 md:mt-10 lg:mt-24 xl:pl-32 xl:mt-12 lg:pt-1 md:order-last">
                  <div id="stag" class="font-benzin-bold text-3xl lg:text-4xl xl:text-4xl">Делегируй</div>
                  <div id="stag" class="font-benzin-bold text-3xl lg:text-4xl xl:text-4xl xl:mb-5 2xl:mb-10">инфошум нам!</div>
                  <div id="stag" class="flex align-middle mt-5 mb-3">
                    <img class="w-4" src="/img/greenDot.svg" alt="">
                    <div class="font-ttnorms ml-3 text-lg xl:text-2xl">Идея и все действия по ней прилетают мгновенно через бота</div>
                  </div>
                  <div id="stag" class="flex align-middle mb-3">
                    <img class="w-4" src="/img/greenDot.svg" alt="">
                    <div class="font-ttnorms ml-3 text-lg xl:text-2xl">Мы следим за сделками 24/7</div>
                  </div>
                  <div id="stag" class="flex align-middle 2xl:mb-3">
                    <img class="w-4" src="/img/greenDot.svg" alt="">
                    <div class="font-ttnorms ml-3 text-lg xl:text-2xl">Четкий алгоритм, всегда понимаете что и почему мы делаем</div>
                  </div>
                  <div id="stag" class="flex align-middle 2xl:mb-3">
                    <img class="w-4" src="/img/greenDot.svg" alt="">
                    <div class="font-ttnorms ml-3 text-lg xl:text-2xl">Всегда на связи!</div>
                  </div>
                  <div id="stag" class="flex">
                    <a :href="'http://t.me/drwntrade_bot/?start=' + utm" class="bot font-benzin-bold mt-8 py-3 px-6 text-sm border-2 border-base-green text-white transition duration-300 hover:bg-base-green hover:text-deep-purple rounded-sm cursor-pointer uppercase">начать</a>
                  </div>
              </div>
              <div class="mt-5 md:mt-12 md:w-2/3 lg:mt-28 lg:mb-20">
                  <div class="relative mx-8">

                    <svg class="absolute -top-32 left-5 xl:-top-28 xl:-left-5 hidden lg:inline md:w-1/3" width="274" height="274" viewBox="0 0 274 274" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="arrows">
                    <path id="ar2" d="M264 12C264 10.8954 263.105 9.99999 262 9.99999L244 9.99999C242.895 9.99999 242 10.8954 242 12C242 13.1046 242.895 14 244 14L260 14L260 30C260 31.1046 260.895 32 262 32C263.105 32 264 31.1046 264 30L264 12ZM12.4142 264.414L263.414 13.4142L260.586 10.5858L9.58579 261.586L12.4142 264.414Z" fill="#00FF4A"/>
                    <path id="ar1" d="M172 49C172 47.8954 171.105 47 170 47H152C150.895 47 150 47.8954 150 49C150 50.1046 150.895 51 152 51H168V67C168 68.1046 168.895 69 170 69C171.105 69 172 68.1046 172 67V49ZM54.4142 167.414L171.414 50.4142L168.586 47.5858L51.5858 164.586L54.4142 167.414Z" fill="#00FF4A"/>
                    <path id="ar3" d="M264 69C264 67.8954 263.105 67 262 67H244C242.895 67 242 67.8954 242 69C242 70.1046 242.895 71 244 71H260V87C260 88.1046 260.895 89 262 89C263.105 89 264 88.1046 264 87V69ZM146.414 187.414L263.414 70.4142L260.586 67.5858L143.586 184.586L146.414 187.414Z" fill="#00FF4A"/>
                    </g>
                    </svg>

                    <!-- <img id="tablet" class="lg:pl-24" src="/img/tablet.png" alt=""> -->
                    <div id="tablet" class="z-10 lg:pl-24 h-64">
                        <iframe class="w-full h-full"  src="https://www.youtube.com/embed/NMxZhitCLJE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                  </div>
              </div>
          </div>
      </div>

     
  </div>

    <StockCard />

<div>
  <div class="bg-base-purple py-20">
      <div class="p-6 max-w-screen-2xl sm:mx-auto">
          <div>
        <div class="greenCard relative flex flex-col lg:flex-row border-4 md:mx-24 border-base-green rounded py-4 px-3 lg:justify-around lg:p-10 md:align-middle">
            <div>
                <div class="text-base-green uppercase font-benzin-semibold mb-3">бесплатно</div>
                <div class="text-white mb-5 lg:mb-0 font-benzin-semibold uppercase md:text-xl">Получи материалы и доступ</div>
                <div class="text-white mb-5 lg:mb-0 font-benzin-semibold uppercase md:text-xl">в закрытую группу</div>
                <div class="text-white mb-5 lg:mb-0 font-benzin-semibold uppercase md:text-xl">для участия уже сейчас!</div>
            </div>

            <div class="flex justify-center lg:justify-around lg:w-1/2 lg:pl-64">
                <div class="md:self-center">
                    <a :href="'http://t.me/drwntrade_bot/?start=' + utm" class="bot border-2 border-base-green text-white inline-block py-3 px-6 text-sm rounded transform hover:bg-base-green hover:text-deep-purple transition duration-300 cursor-pointer font-benzin-bold uppercase">Получить</a>
                </div>
            </div>

            <img class="hidden lg:inline absolute top-0 right-0 -mt-1" src="/img/topArrows.svg" alt="">
            <img class="hidden lg:inline absolute bottom-0 right-96 -mb-1" src="/img/botArrows.svg" alt="">
        </div>
        </div>
      </div>
  </div>
</div>

<div>
    <div class="bg-deep-purple">
        <div class="max-w-screen-2xl py-20 sm:mx-auto text-white">
            <div id="fullStrat" class="text-center font-benzin-bold text-3xl lg:text-4xl xl:text-4xl">Полная стратегия</div>
            <div class="flex flex-wrap justify-center md:mx-10 lg:mx-28">
                <div class="strats flex flex-col  my-10 mx-10 lg:mr-28 lg:ml-16 text-center justify-center items-center" v-for="(strat, index) in strategy" :key="index">
                    <img class="w-24 mb-5" :src="strat.img" alt="">
                    <div class="font-benzin-bold">{{ strat.text1 }}</div>
                    <div class="font-benzin-bold">{{ strat.text2 }}</div>
                </div>
            </div>
        </div>
    </div>
</div>

<Feedback id="feed" :feedbacks="feedbacks" />

<div>
  <div class="bg-base-purple py-5 md:py-16">
      <div class="flex flex-col sm:flex-row justify-between mx-auto max-w-screen-2xl">
        <div class="ml-5 md:ml-32">
            <img class="w-24 md:w-32" src="../assets/img/logo.svg" alt="">
        </div>

        <div class="flex align-middle ml-5 mt-3 sm:mx-5 md:mr-32">
            <a class="mr-3 md:mr-5" v-for="img in images" :key="img.img"  :href="img.link">
                <img class="w-5 h-5" :src="img.img" alt="">
            </a>
        </div>
      </div>
  </div>
</div>
  </div>
</template>

<script>
import StockCard from '../components/StockCard.vue'
import Feedback from '../components/Feedback.vue'

gsap.registerPlugin(ScrollTrigger);
export default {
  components: {
      StockCard,
      Feedback,
  },
  data() {
    return {
      utm: '',
      isHidden: this.menuHidden(),
      feedbacks: [
                {
                    name: 'Татьяна',
                    initials: 'TA',
                    img: '',
                    feedback: '/img/feedbacks/tatiana.png',
                    text: 'Хочу поблагодарить за вашу поддержку и торговые идеи. Я всегда уверена, что меня не оставят наедине. Я всегда уверена, что... ',
                    open: false,
                },
                {
                    name: 'Арсений',
                    initials: 'AR',
                    img: '',
                    feedback: '/img/feedbacks/arseny.png',
                    text: 'Давно хотел написать, вы, ребята, держите руку на пульсе. Вовремя выйти и не сидеть страдать — больше дело!',
                    open: false,
                },
                {
                    name: 'Анна',
                    initials: 'AA',
                    img: '/img/ayzada.png',
                    vid: 'https://www.youtube.com/watch?v=CItDrVpZbo0',
                    text: 'Действительно, кладезь полезной информации для новичков. Помогает ориентироваться на рынке!',
                    open: false,
                },
            ],
      images: [
                { img: '/img/tg.svg', link: 'https://t.me/drwn_trade'},
                { img: '/img/yt.svg', link: 'https://www.youtube.com/channel/UCLbKokxJVsqfraWGYKtC7Uw'},
            ],
      strategy: [
          {
              text1: 'Риски, управление',
              text2: 'сделкой',
              img: '/img/strategy1.svg',
          },
          {
              text1: 'Критерии выбора',
              text2: 'сделки',
              img: '/img/strategy2.svg',
          },
          {
              text1: 'Точки входа',
              text2: 'и выхода',
              img: '/img/strategy3.svg',
          },
          {
              text1: 'Правильный',
              text2: 'мониторинг сделки',
              img: '/img/strategy4.svg',
          },
          {
              text1: 'Рабочий',
              text2: 'набор индикаторов',
              img: '/img/strategy5.svg',
          },
      ]
    }
  },
  methods: {
    menuHidden: function() {
          if (window.innerWidth <= 640) {
              return true
          } else {
              return false
          }
      },
    greenCircAnim: function() {
            const tl = gsap.timeline({ delay: .3})
            const tl1 = gsap.timeline({ repeat: -1 })
            const tl2 = gsap.timeline({ delay: .3})
            const tl3 = gsap.timeline({ delay: .3})

            tl.set(".greenCirc", {scale: 0.2})
            tl.from(".greenCirc", {y: -300, duration: .7, opacity: 0,  ease: "back.out(1.2)", delay: 1.5})
            tl.to(".greenCirc", {scale: 1, duration: 1, ease: "elastic.out( 1, 0.3)"}, "-=.3")

            tl1.to(".greenCirc", { scale: 1.1, duration: .15, ease: "back.out( 1.2 )", delay: 5 })
            tl1.to(".greenCirc", { scale: 1, duration: .15, ease: "back.out( 1.2 )" })

            tl2.set(".macbook", {zIndex: 100})
            tl2.from(".macbook", {x: 200, opacity: 0, duration: 1})

            tl3.from("#algo-text", {x: -200, opacity: 0, duration: 1})
        },
        arrowAnim: function() {
            const tl = gsap.timeline({ ease: "expo.out", delay: .5, scrollTrigger: { trigger: "#arrowSection", start: "top center-=100"} })
            const tl2 = gsap.timeline({ ease: "expo.out" , scrollTrigger: { trigger: "#arrowSection", start: "top center-=100"}})
            const tl3 = gsap.timeline({ ease: "expo.out" , scrollTrigger: { trigger: "#arrowSection", start: "top center-=100"}})

            tl.from("#ar2", { x: -100, y: 100, duration: .5, opacity: 0 })
            tl.from("#ar1", { x: -100, y: 100, duration: .5, opacity: 0 }, "-=.33")
            tl.from("#ar3", { x: -100, y: 100, duration: .5, opacity: 0 }, "-=.33")

            tl2.set("#tablet", {zIndex: 100})
            tl2.from("#tablet", { scale: 0, duration: .5, opacity: 0 })

            tl3.from("#stag", { y: -20, stagger: 0.2, opacity: 0, delay: .7 })
        },
        cardAnim: function() {
            const tl = gsap.timeline({ ease: "expo.out", scrollTrigger: { trigger: "#practice", start: "top center" } })
            const tl2 = gsap.timeline({ ease: "expo.out", scrollTrigger: { trigger: "#practice", start: "top center" }})

            tl.from("#card1", { x: -200, duration: .5, opacity: 0 })
            tl.from("#card2", { x: -300, duration: .5, opacity: 0 }, "-=.3")
            tl.from("#card3", { x: -400, duration: .5, opacity: 0 }, "-=.3")

            tl2.from("#practice", { opacity: 0, duration: 1 })
        },
        stratAnim: function() {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".strats",
                    // start: "top top",
                    // markers: true
                }
            })
            tl.from(".strats", { y: 100, opacity: 0, stagger: .4, delay: 1 })
        }
  },
  mounted() {
    this.greenCircAnim()
    this.arrowAnim()
    this.cardAnim()
    this.stratAnim()
    let data = location.search;
    console.log(data)
    if (data !== '') {
      let newdata = data.split('utm_source=')[1];
      let newdata2 = newdata.replace("&utm_campaign=","-");
      this.utm = newdata2 + '-lnd6'
      console.log(newdata2)
    } else {
      let newdata2 = 'null-p1'
      this.utm = newdata2 + '-lnd6'
      console.log(newdata2)
    }
  }
}
</script>

<style>
input {
    border-bottom: solid white 2px;
}
.burger {
    color: white;
}
@media screen and (min-width: 640px) {
    .links:hover {
        border-bottom: 2px solid #00ff4a;
        /* text-decoration: underline; */
        /* text-decoration-color: #00ff4a; */
    }
}

</style>

