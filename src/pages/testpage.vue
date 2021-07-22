<template>
  <div class="h-screen">
      <div class="bg-deep-purple">
            <div class="flex justify-between px-5 sm:px-0 items-center mx-auto max-w-screen-2xl">
                <div class="h-32 sm:mx-10 lg:mx-32 flex align-middle justify-around">
                    <nuxt-link class="w-32 flex align-middle" to="/test">
                        <img class="w-32" src="@/assets/img/logo.svg" alt="">
                    </nuxt-link>
                </div>
                <div class="flex self-center align-middle  cursor-pointer ml-14 sm:mb-0 sm:ml-auto sm:mr-10 lg:mr-32"></div>
            </div>
       </div>

       <div class="bg-base-purple text-white sm:h-5/6 flex items-center">
           <div :class="{ 'hidden': started }" class="bg-deep-purple relative font-ttnorms px-5 sm:mx-5 lg:mx-32 h-5/6 w-full max-w-screen-2xl mx-auto rounded-md">
               <div class="text-xl font-benzin-bold sm:ml-6 sm:mt-10 lg:text-2xl xl:text-4xl">Привет!</div>
               <div class="mt-6 sm:ml-6 sm:mt-10 lg:text-lg lg:w-9/12 xl:text-xl">Мы сделали небольшой тест. По его итогам вы получите план развития абсолютно бесплатно. И это не какая-нибудь автоматически генерируемая ерунда: наши трейдеры оставят вам персональную голосовую рекомендацию!</div>
               <div class="mt-5 sm:ml-6 lg:text-lg lg:w-9/12 xl:text-xl">Представьтесь, пожалуйста, чтобы мы могли обратиться по имени:</div>
               <!-- TODO audio component -->
                <div class="flex items-center mt-5 md:mt-10 sm:ml-6">
                    <img class="w-10 mr-3" src="/img/audio.svg" alt="">
                    <div class="font-benzin-semibold text-sm">Прослушать аудиосообщение</div>
                </div>
                <div class="flex font-ttnorms mt-5 md:mt-10 justify-between sm:justify-start sm:mx-6 sm:mb-10 lg:mb-16">
                    <input v-model="clientName" class="lg:w-4/12 bg-deep-purple focus:outline-none focus:border-light-purple placeholder-light-purple rounded-md border-2 border-light-purple" type="text" placeholder="Введите своё имя">
                    <button @click="startTest" class="text-base-green sm:ml-16 font-benzin-semibold">Далее</button>
                </div>
                <div class="sm:ml-7 mt-3 text-base-red">{{nameError}}</div>

                <img class="hidden absolute lg:inline bottom-0 right-20 w-96" src="/img/dude.svg" alt="">
           </div>

           <div :class="{ 'hidden': !started }" class="bg-deep-purple flex flex-col justify-between relative font-ttnorms px-5 sm:mx-5 lg:mx-32 h-5/6 w-full rounded-md">
                <div>
                    <div class="text-xl font-benzin-bold sm:ml-6 sm:my-10 lg:text-2xl xl:text-4xl">{{ questions[count].question }}</div>
                    <div class="flex items-center mt-3 sm:ml-6 sm:mt-5" v-for="(answer, index) in questions[count].answers" :key="index">
                        <input v-if="questions[count].type == 'radio'" class="mr-3 cursor-pointer border-transparent w-7 h-7 focus:border-transparent text-base-green bg-deep-purple ring-2 ring-light-purple focus:ring-2 focus:ring-offset-2 focus:ring-base-green" v-model="userAnswer" :type="questions[count].type" :name="questions[count].question" :value="answer" :id="questions[count].question">
                        <input v-if="questions[count].type == 'checkbox'" class="mr-3 rounded cursor-pointer border-transparent w-7 h-7 focus:border-transparent text-base-green bg-deep-purple ring-2 ring-light-purple focus:ring-2 focus:ring-offset-2 focus:ring-base-green" v-model="multipleAnswers" :id="answer" :value="answer" :type="questions[count].type">
                        <label :for="questions[count].question">{{ answer }}</label>
                    </div>
                </div>

                <div class="flex font-ttnorms justify-between mt-5 sm:mt-0 sm:mx-6 sm:mb-10">
                    <button @click="prev" class="hover:text-deep-purple hover:bg-base-green hover:border-base-green border-2 py-2 px-4 transition duration-300 border-light-purple rounded-md font-benzin-semibold">Назад</button>
                    <button @click="next" class="hover:text-deep-purple hover:bg-base-green hover:border-base-green border-2 py-2 px-4 transition duration-300 border-light-purple rounded-md font-benzin-semibold">Далее</button>
                </div>
           </div>
       </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            clientName: '',
            nameError: '',
            started: false,
            count: 0,
            userAnswer: '',
            multipleAnswers: [],
            allAnswers: [],
            questions: [
                {
                    question: 'Как давно вы инвестируете?',
                    answers: [
                        'Менее 3 месяцев',
                        'от 3 до 12 месяцев',
                        'от 1 до 3 лет',
                        'Более 3 лет',
                    ],
                    type: 'radio',
                },
                {
                    question: 'У Вас есть финансовая цель?',
                    answers: [
                        'Нарастить капитал, в % от капитала',
                        'Накопить на большую покупку',
                        'Получать пассивный доход выше определенного уровня',
                        'Конкретной цели нет',
                    ],
                    type: 'radio',
                },
                {
                    question: 'Сколько времени вы тратите на работу на рынке?',
                    answers: [
                        'до 2 ч в неделю',
                        '2-10ч в неделю',
                        'Более 2-3 часов день',
                    ],
                    type: 'radio',
                },
                {
                    question: 'Какая у вас средняя продолжительность сделки?',
                    answers: [
                        'Внутри дня',
                        'несколько дней',
                        'от 2-3 недель до полугода',
                        'Более полугода',
                    ],
                    type: 'radio',
                },
                {
                    question: 'Отлично! Вы, конечно, знаете. что победа любит подготовку. Как вы готовитесь к покупке акции?',
                    answers: [
                        'Смотрю график индексов',
                        'Читаю новости в целом по рынку',
                        'Смотрю индекс Умных денег',
                        'Смотрю приток средств в фонды',
                    ],
                    type: 'checkbox',
                },
                {
                    question: 'Перед покупкой бумаги, смотрите ли Вы состояние сектора в целом?',
                    answers: [
                        'Да, обязательно',
                        'Только если идея связана с сектором',
                        'Нет',
                    ],
                    type: 'radio',
                },
                {
                    question: 'Представим момент покупки акции. Как Вы принимаете решение?',
                    answers: [
                        'Есть чек-лист с четкими критериями',
                        'Смотрю примерно график',
                        'Читаю новости, аналитику',
                        'Вижу сигнал в соцсетях - покупаю',
                    ],
                    type: 'radio',
                },
                {
                    question: 'Как Вы управляете сделкой?',
                    answers: [
                        'В смысле? Купил-продал',
                        'Добовляю, уменьшаю, двигаю стопы',
                        'Усредняю, если требуется, и держу до победы',
                    ],
                    type: 'radio',
                },
                {
                    question: 'Как Вы анализируете свою инвестиционную деятельность?',
                    answers: [
                        'Просто смотрю, зеленый итог или красный',
                        'Ищу закономерности, записываю их',
                        'Считаю цифры по портфелю, по отдельным акциям, сравниваю периоды',
                    ],
                    type: 'checkbox',
                },
                {
                    question: 'Как работаете с риском?',
                    answers: [
                        'Беру много мелких позиций, не больше % от портфеля',
                        'Ставлю стопы',
                        'Регулирую долю наличных в портфеле',
                        'Ничего из этого',
                    ],
                    type: 'radio',
                },
                {
                    question: 'конец',
                    answers: [],
                    type: '',
                },
            ],
        }
    },
    methods: {
        startTest: function() {
            this.nameError = ''
            if (!this.clientName.length) {
                this.nameError = 'Напишите ваше имя'
                return
            }
            console.log("test started")
            this.started = true
        },
        next: function() {
            if (this.count < this.questions.length) {
                const q = this.questions[this.count].question
                const a = this.userAnswer
                const multiA = this.multipleAnswers
                const obj = {
                    question: q,
                    answer: a || multiA,
                }

                // cleans duplicates (needed if user changed an answer)
                this.allAnswers = this.allAnswers.filter((el) => {
                    return el.question != obj.question
                })

                this.allAnswers.push(obj)
                console.log(JSON.stringify(this.allAnswers))

                // reset variables
                this.userAnswer = ''
                this.multipleAnswers = []

                this.count ++
            } else {
                console.log("end of questions")
            }
        },
        prev: function() {
            if (this.count > 0){
                this.count --
                return
            }
            this.started = false
        },
    }
}
</script>

<style>

</style>