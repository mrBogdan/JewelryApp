<template>
    <div>
        <div>
            <router-link to="/product/create">
                <button class="btn ripple default">
                    Create new product
                </button>
            </router-link>
        </div>
        <div class="products">
            <table class="cart-table">
                <tr style="text-align: left">
                    <th>Name</th>
                    <th>Delete</th>
                </tr>
                <tr v-for="product in products">
                    <td>
                        <router-link class="default-link"
                                     :to="{ name: 'product', params: { id: product.idProduct } }">{{
                            product.productName }}
                        </router-link>
                    </td>
                    <td>
                        <div @click="removeProduct(product.idProduct)">
                            <icon :icon="faTrashAlt"/>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import { ProductService } from '../services';
    import Button from '../components/BaseButton';
    import icon from '../components/BaseIcon';
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

    const ps = new ProductService();

    export default {
        name: 'AdminProducts',
        components: { Button, icon },
        data: function () {
            return {
                faTrashAlt,
                products: [],
            };
        },
        created() {
            ps.getAllProducts(1000)
                .then(res => {
                    console.log(res);
                    this.products = res.data.data;
                });
        },
        methods: {
            removeProduct(id) {
                ps.getDeleteById(id)
                    .then(() => {
                        this.$toast.success('Removed');

                        this.products.forEach((item, idx) => {
                            if (+item.idProduct === +id) {
                                this.products.splice(idx, 1);
                            }
                        });
                    })
                    .catch(() => this.$toast.error('Error'))
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"

    .products
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center

</style>