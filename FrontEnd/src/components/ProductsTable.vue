<template>
    <div>
        <table class="cart-table">
            <tr style="text-align: left">
                <th>Name</th>
                <th>Amount</th>
                <th>One item price</th>
                <th>All price</th>
                <th v-if="isCart">Delete</th>
            </tr>
            <tr v-for="product in products">
                <td>
                    <router-link class="default-link"
                                 :to="{ name: 'product', params: { id: product.product.idProduct } }">{{
                        product.product.productName }}
                    </router-link>
                </td>
                <td>{{ product.count }}</td>
                <td>{{ (product.product.price).toFixed(2) }} {{ currency }}</td>
                <td>{{ (product.count * product.product.price).toFixed(2) }} {{ currency }}</td>
                <td v-if="isCart">
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
</template>

<script>
    import Icon from '../components/BaseIcon';
    import { faTrashAlt, faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons';
    import { mapGetters } from 'vuex';
    import { CartActions } from '../store/modules/cart';

    export default {
        name: 'ProductsTable',
        components: {
            Icon
        },
        data: function () {
            return {
                faTrashAlt,
                faMoneyCheckAlt
            };
        },
        props: [
            'products',
            'isCart'
        ],
        computed: {
            ...mapGetters([
                'currency'
            ]),
            allPrice: function () {
                let sum = 0;
                this.products.forEach(item => {
                    sum += (item.count * item.product.price);
                    return sum;
                });
                return sum.toFixed(2);
            },
        },
        methods: {
            remove(product) {
                return this.$store.dispatch(CartActions.REMOVE_PRODUCT_FROM_CART, product);
            },
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

</style>