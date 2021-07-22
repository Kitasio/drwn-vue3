<template>
  <div>
      <Navbar />
      <FreeLesson />
      <Services />
      <Footer />
  </div>
</template>

<script>
import FreeLesson from '../components/FreeLesson.vue'
import Services from '../components/Services.vue'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'
export default {
  components: {
    Navbar,
    FreeLesson,
    Services,
    Footer,
  },
}
</script>

<style>

</style>