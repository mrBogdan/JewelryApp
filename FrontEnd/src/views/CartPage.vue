<template>
    <div class="cart-page">
        <h2>Cart</h2>
        <table class="cart-table">
            <tr style="text-align: left">
                <th>Name</th>
                <th>Amount</th>
                <th>One item price</th>
                <th>All price</th>
                <th>Delete</th>
            </tr>
            <tr v-for="product in products">
                <td><router-link :to="{ name: 'product', params: { id: product.product.idProduct } }">{{ product.product.productName }}</router-link></td>
                <td>{{ product.count }}</td>
                <td>{{ (product.product.price).toFixed(2) }} {{ product.product.currency }}</td>
                <td>{{ (product.count * product.product.price).toFixed(2) }} {{ product.product.currency }}</td>
                <td>
                    <icon :icon="faTrashAlt" />
                </td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td>All price:</td>
                <td>{{ allPrice }} </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import Icon from '../components/BaseIcon';
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'CartPage',
        components: {
            Icon
        },
        data: function() {
          return {
              faTrashAlt,
          }
        },
        computed: {
            products: function () {
                return this.$store.getters.cartProducts;
            },
            allPrice: function () {
                let sum = 0;
                this.products.forEach( item => {
                    sum += (item.count * item.product.price);
                    return sum;
                } );
                return sum;
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"

    .cart-table
        border-collapse: collapse
        width: 100%

        tr td,
        tr th
            padding: 10px 5px

        tr:nth-child(2n + 1)
            background-color: $medium-grey

</style>