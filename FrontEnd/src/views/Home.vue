<template>
  <div class="home">
      <product-list :title="categoryName">
        <product v-for="(product, index) in products" :key="index" :product-item="product"></product>
      </product-list>
  </div>
</template>

<script>
import product from '../components/Product';
import productList from '../components/ProductList';
import products from '../mockData'

export default {
  name: 'home',
  data: function() {
    return {
      categoryName: 'Product list',
      products: products.products,
    }
  },
  components: {
    productList,
    product,
  }
}
</script>

<style lang="sass" scoped></style>
