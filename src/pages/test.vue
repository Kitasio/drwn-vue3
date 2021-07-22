<template>
  <div>
    <div class="bg-deep-purple">
        <div class="flex justify-center items-center mx-auto max-w-screen-2xl">
            <div class="h-32 sm:mx-10 lg:mx-32 flex align-middle justify-around">
                <nuxt-link class="w-32 flex align-middle" to="">
                    <img class="w-32" src="@/assets/img/logo.svg" alt="">
                </nuxt-link>
            </div>
            <div class="flex self-center align-middle  cursor-pointer ml-14 sm:mb-0 sm:ml-auto sm:mr-10 lg:mr-32"></div>
        </div>
    </div>

    <div class="bg-base-purple text-white">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:mx-auto lg:max-w-screen-2xl py-10 lg:px-12 sm:mx-10 md:flex-row md:justify-center">
            <div class="ml-8 sm:ml-0 lg:ml-20 md:mt-0 lg:my-10">
                  <div id="algo" class="font-benzin-bold text-2xl md:text-3xl lg:text-5xl">Персональная</div>
                  <div class="font-benzin-bold text-2xl md:text-3xl lg:text-5xl">рекомендация</div>
                  <div class="font-benzin-bold text-2xl md:text-3xl lg:text-5xl lg:whitespace-nowrap">по инвестированию</div>
                  <div class="font-ttnorms mt-5 sm:text-lg xl:text-xl">Пройди 5-минутный тест</div>
                  <div class="font-ttnorms sm:text-lg xl:text-xl">и получи персональный план</div>
                  <div class="font-ttnorms sm:text-lg xl:text-xl">с голосовой рекомендацией топ—эксперта</div>
                  <div class="font-ttnorms sm:text-lg xl:text-xl">в области инвестиций и трейдинга</div>
                  <div class="flex w-64 md:w-auto flex-col md:flex-row md:space-x-5">
                    <a href="#" class="flex items-center font-benzin-bold mt-3 md:mt-8 py-3 px-6 text-sm border-2 border-light-purple rounded cursor-pointer transition duration-300 hover:border-base-green uppercase">
                      <img class="w-5 mr-3" src="@/assets/img/tg.svg" alt="">
                      <div>пройти на боте</div>
                    </a>
                    <NuxtLink to="/testpage" class="font-benzin-bold text-center mt-3 md:mt-8 py-3 px-6 text-sm border-2 border-base-green rounded cursor-pointer transition duration-300 hover:bg-base-green hover:text-deep-purple uppercase">ПРОЙТИ НА САЙТЕ</NuxtLink>
                  </div>
            </div>
            <div class="relative mt-5 md:mt-0 px-8 lg:w-5/6 lg:place-self-end xl:justify-self-end">
                  <img class="z-10 macbook" src="/img/guys.svg" alt="">
            </div>
        </div>
    </div>

    <div class="bg-deep-purple text-white">
          <div id="arrowSection" class="flex flex-col lg:mx-auto lg:max-w-screen-2xl py-10 lg:py-16 sm:mx-10 md:flex-row md:justify-center">
              <div class="ml-8 md:w-2/3 lg:ml-20 md:mt-10 lg:mt-24 xl:mt-28 xl:pl-32 lg:pt-1 md:order-last">
                  <div id="stag" class="font-benzin-semibold text-3xl lg:text-4xl xl:text-4xl">Время понять</div>
                  <div id="stag" class="font-benzin-semibold text-3xl lg:text-4xl xl:text-4xl">свои приоритеты</div>
                  <div id="stag" class="font-benzin-semibold text-3xl lg:text-4xl xl:text-4xl xl:mb-10">в инвестициях</div>
                  <a href="#" id="stag" class="flex items-center mt-5 mb-3">
                    <img class="w-10" src="/img/feedbacks/vid.svg" alt="">
                    <div class="font-ttnorms ml-3 text-lg xl:text-2xl">Посмотреть видео</div>
                  </a>
              </div>
              <div class="mt-5 md:mt-12 md:w-2/3 lg:mt-28 lg:mb-20">
                  <div class="relative mx-8">
                    <div class="z-10 lg:pl-24 h-64">
                        <iframe class="w-full h-full"  src="https://www.youtube.com/embed/hArP4g4OSi0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                  </div>
              </div>
          </div>
      </div>

      <div>
        <div class="bg-base-purple pt-10 md:pt-32 md:pb-8">
            <div class="p-6 max-w-screen-2xl sm:mx-auto">
                <div>
              <div class="relative flex flex-col lg:flex-row border-4 md:mx-24 border-base-green rounded py-4 px-3 lg:justify-around lg:p-10 md:align-middle">
                  <div>
                      <div class="text-base-green uppercase font-benzin-semibold mb-3">бесплатно</div>
                      <div class="text-white mb-5 lg:mb-0 font-benzin-semibold uppercase md:text-xl">Получи материалы и доступ</div>
                      <div class="text-white mb-5 lg:mb-0 font-benzin-semibold uppercase md:text-xl">в закрытую группу</div>
                      <div class="text-white mb-5 lg:mb-0 font-benzin-semibold uppercase md:text-xl">для участия уже сейчас!</div>
                  </div>

                  <div class="flex justify-center lg:justify-around lg:w-1/2 lg:pl-64">
                      <div class="md:self-center">
                          <a :href="'http://t.me/drwntrade_bot/?start=' + utm" class="bot text-white font-benzin-bold mt-8 py-3 px-6 text-sm border-2 border-base-green rounded cursor-pointer transition duration-300 hover:bg-base-green hover:text-deep-purple uppercase">Получить</a>
                      </div>
                  </div>

                  <img class="hidden lg:inline absolute top-0 right-0 -mt-1" src="/img/topArrows.svg" alt="">
                  <img class="hidden lg:inline absolute bottom-0 right-96 -mb-1" src="/img/botArrows.svg" alt="">
              </div>
              </div>
            </div>
        </div>
      </div>

      <Feedback :feedbacks="feedbacks" />

      <div>
        <div class="bg-base-purple py-5 md:py-10">
            <div class="flex flex-col sm:flex-row justify-between mx-auto max-w-screen-2xl">
              <div class="ml-5 md:ml-32">
                  <img class="w-24 md:w-32" src="@/assets/img/logo.svg" alt="">
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
export default {
  data() {
    return {
      images: [
                { img: '/img/tg.svg', link: 'https://t.me/drwn_trade'},
                { img: '/img/yt.svg', link: 'https://www.youtube.com/channel/UCLbKokxJVsqfraWGYKtC7Uw'},
            ],
      feedbacks: [
                {
                    name: 'Максим',
                    initials: 'MA',
                    img: '',
                    feedback: '/img/feedbacks/maxim.png',
                    text: 'Ребята, спасибо огромное за новый формат практики! Учебные материалы на новом уровне!...',
                    open: false,
                },
                {
                    name: 'Артем',
                    initials: 'AM',
                    img: '',
                    feedback: '/img/feedbacks/artem.png',
                    text: 'Спасибо за обзор вашей методики на семинаре! DRWN умеет удивлять) Все и так разжевано было, а теперь это как...',
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
    }
  }
}
</script>

<style>

</style>