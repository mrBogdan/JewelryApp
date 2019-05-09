<template>
    <div class="product-page">
        <h2>Product</h2>
        <div>{{ $route.params.id }}</div>
    </div>
</template>

<script>
    export default {
        name: 'ProductPage'
    };
</script>

<style scoped lang="sass"></style>