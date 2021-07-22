<template>
  <div>
      <Navbar />
      <market-review></market-review>
      <FreeLesson></FreeLesson>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MarketReview from '../components/MarketReview.vue'
import FreeLesson from '../components/FreeLesson.vue'
import Navbar from '../components/Navbar.vue'
export default defineComponent({
  components: {
      MarketReview,
      FreeLesson,
      Navbar,
  },
})
</script>

<style>

</style>