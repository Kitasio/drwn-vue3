<template>
  <div>
    <Navbar />
    <Landing />
    <FreeLesson />
    <Services />
    <Trading />
    <Footer />
  </div>
</template>

<script>
import Landing from '../components/Landing.vue'
import FreeLesson from '../components/FreeLesson.vue'
import Services from '../components/Services.vue'
import Trading from '../components/Trading.vue'
import Footer from '../components/Footer.vue'
import Navbar from '../components/Navbar.vue'

export default {
  components: {
    Navbar,
    Landing,
    FreeLesson,
    Services,
    Trading,
    Footer,
  }
}
</script>

<style>

</style>
