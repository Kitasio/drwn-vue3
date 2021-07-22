<template>
  <div>
      <div class="bg-base-purple text-white pt-20">
          <div class="flex overflow-hidden -my-10">
              <div id="deals" class="flex items-center justify-start w-full py-10">
                <div v-for="(deal, index) in deals" :key="index" class="flex-none mr-20 bg-deep-purple w-64 border-2 rounded p-3 py-5 border-light-purple transition hover:border-base-green">
                    <div class="flex items-center">
                        <img class="mr-3 w-8" :src="deal.img" alt="">
                        <div class="uppercase font-benzin-bold">#{{ deal.ticker }}</div>
                    </div>
                    <div class="font-benzin-bold mt-3">Вход</div>
                    <div>{{ deal.entry }}</div>
                    <div class="font-benzin-bold text-base-green mt-3">Take Profit</div>
                    <div>{{ deal.takeProfit }}</div>
                    <div class="font-benzin-bold text-base-red mt-3">Stop loss</div>
                    <div>{{ deal.stopLoss }}</div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    methods: {
        dealsAnim: function() {
            if (window.innerWidth < 600) {
                const tl = gsap.timeline({ repeat: -1, yoyo: true, })
                tl.to("#deals", { xPercent: -100, ease: "none", duration: this.deals.length }) 
            } else {
                const tl = gsap.timeline({ repeat: -1, yoyo: true, })
                tl.to("#deals", { xPercent: -100, ease: "none", duration: this.deals.length*4 })
            }
        }
    },
    mounted() {
        this.dealsAnim()
    },
    data() {
        return {
            deals: [
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
                {
                    img: '/img/tickers/goog.svg',
                    ticker: 'googl',
                    entry: '2 050',
                    takeProfit: '2 150 (+6.3%)',
                    stopLoss: '2 000 (-2%)'
                },
            ]
        }
    }
}
</script>

<style scoped>
.stock {
    min-width: 500px;
}

</style>