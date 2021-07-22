<template>
<div class="bg-base-purple py-10">
  <div class="mx-auto max-w-screen-2xl">
      <div class="md:flex flex-wrap justify-center lg:mx-24">
            <div class="transition duration-300 lg:flex-1 lg:mx-8 m-5">
                <div class="tradingview-widget-container">
                    <div id="tradingview_f640f" style="height: 270px;"></div>
                    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AAPL/" rel="noopener" target="_blank"><span class="blue-text">AAPL Chart</span></a> by TradingView</div>
                </div>
            </div>
            <div class="transition duration-300 lg:flex-1 lg:mx-8 m-5">
                <div class="tradingview-widget-container">
                    <div id="tradingview_e58f3" style="height: 270px;"></div>
                    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-TSLA/" rel="noopener" target="_blank"><span class="blue-text">TSLA Chart</span></a> by TradingView</div>
                </div>
            </div>
            <div class="transition duration-300 lg:flex-1 lg:mx-8 m-5">
                <div class="tradingview-widget-container">
                    <div id="tradingview_c8983" style="height: 270px;"></div>
                    <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/NASDAQ-AMZN/" rel="noopener" target="_blank"><span class="blue-text">AMZN Chart</span></a> by TradingView</div>
                </div>
            </div>
        </div>
  </div>
</div>
</template>

<script>
export default {
    mounted() {
        new TradingView.widget(
                {
                    "autosize": true,
                    "symbol": "NASDAQ:AAPL",
                    "interval": "D",
                    "timezone": "Etc/UTC",
                    "theme": "dark",
                    "style": "1",
                    "locale": "en",
                    "toolbar_bg": "#f1f3f6",
                    "enable_publishing": false,
                    "hide_top_toolbar": true,
                    "save_image": false,
                    "container_id": "tradingview_f640f"
                },
            )
        new TradingView.widget(
            {
                "autosize": true,
                "symbol": "NASDAQ:TSLA",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_top_toolbar": true,
                "save_image": false,
                "container_id": "tradingview_e58f3"
            }
        )
        new TradingView.widget(
            {
                "autosize": true,
                "symbol": "NASDAQ:AMZN",
                "interval": "D",
                "timezone": "Etc/UTC",
                "theme": "dark",
                "style": "1",
                "locale": "en",
                "toolbar_bg": "#f1f3f6",
                "enable_publishing": false,
                "hide_top_toolbar": true,
                "save_image": false,
                "container_id": "tradingview_c8983"
            }
        )
    }
}
</script>

<style>

</style>