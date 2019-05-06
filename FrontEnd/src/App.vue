<template>
  <div id="app">
    <Header></Header>
    <div class="page-container">
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Footer from './components/Footer';

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
    }
  }
</script>

<style lang="sass">
@import "styles/main"
@import "styles/variables"

.page-container
  padding: $header-height $side-padding 0 $side-padding

</style>
