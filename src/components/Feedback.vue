<template>
  <div>
      <div class="bg-base-purple text-white pt-20">
          <div class="max-w-screen-2xl md:mx-auto">
              <div class="font-benzin-bold text-3xl lg:text-4xl xl:text-4xl text-center md:text-left md:ml-8 lg:ml-32">Отзывы</div>
              <div class="flex flex-col md:flex-row lg:mx-24 flex-wrap">
                <div v-for="(feedback, index) in feedbacks" :key="index" class="bg-deep-purple rounded m-5 p-5 flex flex-col w-80 xl:w-96 mx-auto">
                    <div class="flex items-center">
                        <div v-if="feedback.img" class="bg-base-purple font-benzin-semibold rounded-full h-16 w-16 flex items-center justify-center"><img :src="feedback.img" alt=""></div>
                        <div v-else class="bg-base-purple font-benzin-semibold rounded-full h-16 w-16 flex items-center justify-center">{{ feedback.initials }}</div>
                        <div class="font-benzin-semibold ml-4">{{ feedback.name }}</div>
                    </div>
                    <div class="mt-5 font-ttnorms">{{ feedback.text }}</div>
                    <a :href="feedback.vid" target="_blank" v-if="feedback.vid" class="mt-5 font-ttnorms flex items-center text-red-400 cursor-pointer">
                        <div class="mr-5"><img class="w-10" src="/img/feedbacks/vid.svg" alt=""></div>
                        <div>Смотреть видео отзыв</div>
                    </a>
                    <div v-else @click="openFeedback($event)" class="mt-5 font-ttnorms text-base-green cursor-pointer">Читать отзыв полностью</div>
                    <img @click="closeFeedback($event)" class="absolute max-w-xs md:max-w-full invisible cursor-pointer shadow-lg rounded" :src="feedback.feedback" :id="feedback.name" alt="">
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props: ['feedbacks'],
    data() {
        return {}
    },
    methods: {
        closeFeedback: function(e) {
            const img = e.target
            const tl = gsap.timeline()
            img.classList.add("invisible")
            tl.to(`#${img.id}`, { scale: 0.7, duration: .7, opacity: 0, y: 700, ease: "power4.out" })
        },
        openFeedback: function(e) {
            const img = e.target.nextElementSibling
            const tl = gsap.timeline()
            tl.set(`#${img.id}`, { opacity: 0, scale: 0.7, y: 700, visibility: "visible", position: "fixed", bottom: "50%", left: "50%", xPercent: -50, yPercent: 50 })
            img.classList.remove("invisible")
            tl.to(`#${img.id}`, { scale: 1, duration: 1, opacity: 1, ease: "power4.out", y: 0})
        },
        lessWords: function(text) {
            if (text.split(' ').length > 20) {
                let newText = text.split(' ')
                newText = newText.slice([0], [20])
                return newText.join(' ') + ' ...'
            } else {
                return text
            }
        }
    }
}
</script>

<style>

</style>