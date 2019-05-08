<template>
  <div id="app">
    <Header></Header>
    <div class="page-container">
      <sidebar :title="sideBarTitle" :categories-array="categoriesList"></sidebar>
      <router-view/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Footer from './components/Footer';
  import Sidebar from './components/Sidebar';

  const mockCategories = [
    {
      id: 1,
      name: 'CategoryItem 1',
    },
    {
      id: 2,
      name: 'CategoryItem 2',
    },
    {
      id: 3,
      name: 'CategoryItem 3',
    }
  ];

  export default {
    name: 'App',
    components: {
      Header,
      Footer,
      Sidebar,
    },
    data: function() {
      return {
        sideBarTitle: 'Categories',
        categoriesList: mockCategories
      }
    }
  }
</script>

<style lang="sass">
@import "styles/main"
@import "styles/variables"

.page-container
  padding: $header-height $side-padding 0 $side-padding
  display: flex
  justify-content: space-between


</style>
