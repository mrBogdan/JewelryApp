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

const mockProducts = [
  {
    id: 1,
    name: 'So cool name for item',
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71bjkdV3-RL._UY395_.jpg',
    alt: 'Alt of image',
    price: 20.22,
    currency: '$'
  },
  {
    id: 2,
    name: 'So cool name for item',
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71bjkdV3-RL._UY395_.jpg',
    alt: 'Alt of image',
    price: 20.22,
    currency: '$'
  },
  {
    id: 3,
    name: 'So cool name for item',
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71bjkdV3-RL._UY395_.jpg',
    alt: 'Alt of image',
    price: 20.22,
    currency: '$'
  },
  {
    id: 4,
    name: 'So cool name for item',
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71bjkdV3-RL._UY395_.jpg',
    alt: 'Alt of image',
    price: 20.22,
    currency: '$'
  },
  {
    id: 5,
    name: 'So cool name for item',
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71bjkdV3-RL._UY395_.jpg',
    alt: 'Alt of image',
    price: 20.22,
    currency: '$'
  },
  {
    id: 6,
    name: 'So cool name for item',
    imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71bjkdV3-RL._UY395_.jpg',
    alt: 'Alt of image',
    price: 20.22,
    currency: '$'
  }
];

export default {
  name: 'home',
  data: function() {
    return {
      categoryName: 'Product list',
      products: mockProducts,
    }
  },
  components: {
    productList,
    product,
  }
}
</script>

<style lang="sass" scoped></style>
