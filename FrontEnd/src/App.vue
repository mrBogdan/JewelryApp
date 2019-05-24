<template>
  <div id="app">
    <div class="page-wrapper">
      <Header></Header>
      <div class="page-container">
        <sidebar :title="sideBarTitle" class="side-bar" :categories-array="categoriesList"></sidebar>
        <router-view/>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header';
  import Footer from './components/Footer';
  import Sidebar from './components/Sidebar';
  import { CategoryService } from './services'

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
    },
    beforeCreate() {

    }
  }
</script>

<style lang="sass">
@import "styles/main"
@import "styles/variables"

.page-container
  padding: $header-height $side-padding ($footer-height * 2) $side-padding
  display: grid
  grid-template-columns: 20% 75%
  grid-column-gap: 5%
  height: 100%
  width: 100%

@media screen and (max-width: 768px)
  .page-container
    padding: $header-height 0
    grid-template-columns: 100%
    grid-column-gap: 0

  .page-container .side-bar
    display: none

  .header
    padding: 0

</style>
