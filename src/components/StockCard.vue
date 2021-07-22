<template>
  <div>
      <div class="bg-base-purple">
          <div class="max-w-screen-2xl md:mx-auto text-white pt-10">
              <div class="md:flex sm:ml-16 lg:ml-24 items-center justify-between">
                  <div id="controlling" class="mx-5 pt-20 max-w-md">
                    <div class="font-benzin-bold text-3xl lg:text-4xl xl:text-5xl">Управление</div>
                    <div class="font-benzin-bold text-3xl lg:text-4xl xl:text-5xl">сделкой</div>
                    <div class="mt-5 font-ttnorms text-lg lg:text-2xl">Даем точные инвестиционные идеи и&nbsp;сопровождаем их&nbsp;на&nbsp;протяжении всей сделки</div>
                    <a href="#" class="bot mt-5 border-2 border-base-green text-white inline-block py-3 px-6 text-sm rounded transform hover:bg-base-green hover:text-deep-purple transition duration-300 cursor-pointer font-benzin-bold uppercase">Получить</a>
                  </div>
                  <div id="stockCard" class="bg-deep-purple border-2 border-base-green rounded mx-5 mt-10 max-w-md lg:mr-32">
                      <div class="flex justify-between">
                          <div class="ml-5 mt-3">
                              <img class="w-20 mt-3 mb-10" src="/img/intel.png" alt="">
                              <div class="font-benzin-semibold text-xs lg:text-base mt-5">Вход</div>
                              <div class="font-benzin-bold lg:text-xl">61</div>
                              <div class="profit font-benzin-semibold text-xs lg:text-base text-base-green mt-5">Take Profit</div>
                              <div class="font-benzin-bold lg:text-xl">69<span class="profit text-base-green">(+13%)</span></div>
                              <div class="stop font-benzin-semibold text-xs lg:text-base text-base-red mt-5">Stop Loss</div>
                              <div class="font-benzin-bold lg:text-xl">59<span class="stop text-base-red">(-4%)</span></div>
                          </div>
                          <div class="mt-5 mr-10">
                              <div class="font-benzin-semibold text-sm text-right">#INTC</div>
                              <div class="font-benzin-semibold text-xs lg:text-base mt-14">Направление</div>
                              <div class="font-benzin-bold lg:text-xl">LONG</div>
                              <div class="font-benzin-semibold text-xs lg:text-base mt-5">Время</div>
                              <div class="font-benzin-bold lg:text-xl">SWING</div>
                          </div>
                      </div>
                      <div class="mt-5">
                          <img src="/img/intcChart.png" alt="">
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
gsap.registerPlugin(ScrollTrigger);
export default {
    mounted() {
        const tl1 = gsap.timeline({
            scrollTrigger: {
                trigger: '#controlling',
                start: "top center",
            }
        })
        tl1.from("#controlling", { opacity: 0, x: -100, duration: .7 })

        const tl2 = gsap.timeline({
            scrollTrigger: {
                trigger: '#stockCard',
                start: "top center",
            }
        })
        tl2.from("#stockCard", { opacity: 0, x: 100, duration: .7 })
        tl2.from(".profit", { color: "white", duration: .4, delay: .5})
        tl2.from(".stop", { color: "white", duration: .4, delay: .4})
    }

}
</script>

<style>

</style>