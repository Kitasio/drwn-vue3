<template>
<div class="mx-auto max-w-screen-2xl md:flex flex-wrap justify-center lg:mx-24">
  <div v-for="item in items" :key="item.id" class="text-white border-4 border-light-purple rounded m-5 hover:border-base-green transition duration-300 lg:flex-1 lg:mx-8">
    <div class="mx-5 mt-5 font-benzin-semibold">{{ item.subscription }}</div>
    <div class="mx-5 uppercase font-benzin-semibold">{{ item.title }}</div>
    <div class="m-5 ">{{ item.subtitle }}</div>
    <div>
      <img class="w-full" :src="item.img" alt="">
    </div>
    <div class="my-7 flex justify-between">
      <div class="font-benzin-semibold flex flex-col justify-center align-middle">
        <div class="mx-5">{{ item.price }}</div>
        <div class="mx-5 text-base-red text-sm">{{ item.secPrice }}</div>
      </div>
      <div class="border-2 border-light-purple hover:border-base-green mr-5 text-white inline-block py-3 px-6 text-sm rounded transform hover:bg-base-green hover:text-deep-purple transition duration-300 cursor-pointer font-benzin-bold uppercase">Купить</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          id: 1,
          subscription: 'Подписка / 1 месяц',
          title: 'Drwn',
          subtitle: 'Подписка на доступ к сообществу DRWN с бонусами для каждого подписчика',
          img: '/img/greenPic.jpg',
          price: '2000 ₽',
          secPrice: '3000 ₽',
        },
        {
          id: 2,
          subscription: 'Подписка / 1 месяц',
          title: 'Drwn',
          subtitle: 'Подписка на доступ к сообществу DRWN с бонусами для каждого подписчика',
          img: '/img/redPic.jpg',
          price: '2000 ₽',
        },
        {
          id: 3,
          subscription: 'Подписка / 1 месяц',
          title: 'Drwn',
          subtitle: 'Подписка на доступ к сообществу DRWN с бонусами для каждого подписчика',
          img: '/img/purplePic.jpg',
          price: '2000 ₽',
        },
      ]
    }
  }
}
</script>

<style>

</style>