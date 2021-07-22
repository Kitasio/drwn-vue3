<template>
  <div>
      <div class="bg-base-purple">
          <div class="max-w-screen-2xl md:mx-auto text-white pb-10">
              <div class="flex flex-col md:flex-row sm:ml-16 lg:ml-24 items-center justify-center md:justify-between">
                  <div id="controlling" class="mx-7  max-w-lg">
                    <div class="font-benzin-bold text-3xl lg:text-4xl xl:text-5xl">Бот - подход</div>
                    <div class="mt-5 font-ttnorms text-lg lg:text-2xl">Наш Бот уведомляет о поступлении сигнала.</div>
                    <div class="mt-5 font-ttnorms text-lg lg:text-2xl">Вы можете подписаться на все типы сделок и всех авторов или выбрать целевые. Любое изменение отправляется как дополнительный комментарий к идее.</div>
                    <div class="mt-5 font-ttnorms text-lg lg:text-2xl">Мы публикуем только те сделки, в которые входим сами</div>
                    <div class="mt-5 font-benzin-semibold text-lg lg:text-2xl">3200 ₽</div>
                    <a href="#" class="bot mt-5 border-2 border-base-green text-white inline-block py-3 px-6 text-sm rounded transform hover:bg-base-green hover:text-deep-purple transition duration-300 cursor-pointer font-benzin-bold uppercase">Купить</a>
                  </div>
                  <div id="stockCard" class="w-64 mt-10 md:mt-0 lg:mr-32">
                      <img src="/img/fullPhone.png" alt="">
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