<template>
    <div v-if="isAdmin">
        <h2>Admin</h2>
        <div>
            <table>
                <tr>
                    <th>Order id</th>
                    <th>Delivery address</th>
                    <th>email</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>phone</th>
                    <th>price</th>
                    <th>products</th>
                    <th>Remove</th>
                </tr>
                <tr v-for="order in orders">
                    <td>{{ order.idOrder}}</td>
                    <td>{{ order.deliveryAddress }}</td>
                    <td>{{ order.email }}</td>
                    <td>{{ order.firstName }}</td>
                    <td>{{ order.lastName }}</td>
                    <td>{{ order.phone }}</td>
                    <td>{{ order.price }}</td>
                    <td>
                        <div v-for="product in JSON.parse(order.products).products" class="products">
                            <router-link class="default" :to="{ name: 'product', params: { id: product.idProduct } }"> {{ product.idProduct }}</router-link>
                        </div>
                    </td>
                    <td>
                        <div @click="removeOrder(order.idOrder)">
                            <icon :icon="faTrashAlt"></icon>
                        </div>
                        
                    </td>
                </tr>
            </table>
        </div>
    </div>
    <div v-else>
        Forbidden
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { OrderService } from '../services';
    import { LoaderMutations } from '../store/modules/loader';
    import Icon from '../components/BaseIcon';
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

    export default {
        name: 'Admin',
        components: { Icon },
        data: function() {
            return {
                orders: [],
                faTrashAlt,
            }
        },
        computed: {
            ...mapGetters([
                'auth',
                'isAdmin'
            ])
        },
        created() {
            this.$store.commit(LoaderMutations.START_LOADING);
            const orderService = new OrderService();

            orderService.getOrders()
                .then((orders) => {
                    console.log(orders);
                    this.orders = orders.data;
                    this.$store.commit(LoaderMutations.STOP_LOADING)
                })
                .catch((err) => console.log(err))
        },
        methods: {
            removeOrder(id) {
                const orderService = new OrderService();

                orderService.removeOrder(id)
                    .then(() => {
                        this.orders.forEach( (item, idx) => {
                            if (item.idOrder === id ) {
                                this.orders.splice(idx, 1);
                            }
                        });
                        this.$toast.success('Removed');
                    })
                    .catch((err) => this.$toast.error(err.message));
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    table
        width: 100%

        border-collapse: collapse

        th
            text-align: left

        tr td,
        tr th
            padding: 5px

        tr:nth-child(2n + 1)
            background-color: $medium-grey

    .default
        display: inline
        color: $blue-shadow-color

    .products
        display: inline
</style>