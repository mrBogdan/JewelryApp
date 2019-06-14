<template>
    <div class="cart-page">
        <div v-if="$store.getters.cartCount">
            <h2>Cart</h2>
            <button @click="makeOrder" class="btn ripple order">
                <icon :icon="faMoneyCheckAlt" class="no-hover no-ripple" title="Make order"/>
                <span>Make order</span>
            </button>
            <table class="cart-table">
                <tr style="text-align: left">
                    <th>Name</th>
                    <th>Amount</th>
                    <th>One item price</th>
                    <th>All price</th>
                    <th>Delete</th>
                </tr>
                <tr v-for="product in products">
                    <td>
                        <router-link class="default-link" :to="{ name: 'product', params: { id: product.product.idProduct } }">{{
                            product.product.productName }}
                        </router-link>
                    </td>
                    <td>{{ product.count }}</td>
                    <td>{{ (product.product.price).toFixed(2) }} {{ currency }}</td>
                    <td>{{ (product.count * product.product.price).toFixed(2) }} {{ currency }}</td>
                    <td>
                        <div @click="remove(product)">
                            <icon :icon="faTrashAlt"/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>All price:</td>
                    <td>{{ allPrice }} {{ currency }}</td>
                </tr>
            </table>
        </div>
        <div v-else>
            <h2>Cart is empty</h2>
        </div>
    </div>
</template>

<script>
    import Icon from '../components/BaseIcon';
    import { faTrashAlt, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
    import { mapGetters } from 'vuex';

    export default {
        name: 'CartPage',
        components: {
            Icon
        },
        data: function () {
            return {
                faTrashAlt,
                faMoneyCheckAlt
            };
        },
        computed: {
            ...mapGetters({
                products: 'cartProducts',
                allPrice: 'allPrice',
                currency: 'currency'
            }),
        },
        methods: {
            makeOrder() {
                this.$router.push('/checkout');
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/button"

    .cart-table
        margin-top: 20px
        border-collapse: collapse
        width: 100%

        tr td,
        tr th
            padding: 10px 5px

        tr:nth-child(2n + 1)
            background-color: $medium-grey

    .order
        width: 250px
        height: 50px
        background-color: $medium-grey
        font: 16px / 24px Arial, sans-serif
        display: flex
        justify-content: center
        align-items: center

    .default-link
        color: #3f6ca7
        text-decoration: underline


</style>