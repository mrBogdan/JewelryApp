<template>
  <div id="app">
    <Header></Header>
    <router-view/>
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

<style lang="scss">
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
  }
</style>
