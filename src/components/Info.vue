<template>
  <div>
      <div class="bg-deep-purple text-white">
          <div class="sm:mx-auto max-w-screen-2xl">
            <div class="pt-7 mb-3 text-white text-3xl xl:text-4xl 2xl:text-5xl xl:w-1/3 leading-10 2xl:leading-normal font-bold font-benzin-semibold text-center sm:text-left sm:whitespace-nowrap sm:mx-6 lg:mx-32">{{ heading }}</div>
            <div class="flex flex-col flex-wrap sm:flex-row">
                <div v-for="card in cards" :key="card.title" class="py-16 flex flex-col justify-center align-middle sm:w-64 md:w-80 lg:ml-28 lg:flex-auto xl:flex-initial">
                    <div class="mb-3">
                        <img :src="card.img" alt="" class="mx-auto sm:mx-5">
                    </div>
                    <div class="text-center sm:text-left font-benzin-bold text-lg mx-5 mb-3">{{ card.title }}</div>
                    <div class="text-center sm:text-left mx-5 font-ttnorms">{{ card.subtitle }}</div>
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
            heading: "Как мы это делаем:",
            cards: [
                {
                    img: '/img/stack.svg',
                    title: 'Анализируем ежедневно более 20 источников',
                    subtitle: 'Среди которых обзоры профеесионалов с Wall-street, макроэкономическая статистика и основные новости.',
                },
                {
                    img: '/img/stock.svg',
                    title: 'Применяем Фундаментальный и Технический анализ',
                    subtitle: 'Индикаторы теханализа и объемы в акциях, данные по перетоку капитала между секторами.',
                },
                {
                    img: '/img/ppl.svg',
                    title: 'Коллегиально прорабатываем стратегии',
                    subtitle: 'Системный подход к полному ежедневному обзору американского рынка',
                },
            ]
        }
    }
}
</script>

<style>

</style>