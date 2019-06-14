<template>
    <div v-if="auth">
        <table>
            <tr>
                <th>Order id</th>
                <th>Delivery address</th>
                <th>Email</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Phone</th>
                <th>Price</th>
                <th v-if="isAdmin">Remove</th>
            </tr>
            <tr v-for="order in orders">
                <td>
                    <router-link :to="{ name: 'order-info', params: { id: order.idOrder } }">{{ order.idOrder }}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'order-info', params: { id: order.idOrder } }">{{ order.deliveryAddress }}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'order-info', params: { id: order.idOrder } }">{{ order.email }}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'order-info', params: { id: order.idOrder } }">{{ order.firstName }}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'order-info', params: { id: order.idOrder } }">{{ order.lastName }}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'order-info', params: { id: order.idOrder } }">{{ order.phone }}
                    </router-link>
                </td>
                <td>
                    <router-link :to="{ name: 'order-info', params: { id: order.idOrder } }">{{ order.price }}
                    </router-link>
                </td>
                <td v-if="isAdmin">
                    <div @click="removeOrder(order.idOrder)">
                        <icon :icon="faTrashAlt"></icon>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Icon from '../components/BaseIcon';
    import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
    import { LoaderMutations } from '../store/modules/loader';
    import { OrderService } from '../services';

    export default {
        name: 'OrderTable',
        components: { Icon },
        data: function () {
            return {
                faTrashAlt,
                orders: []
            };
        },
        created() {
            this.$store.commit(LoaderMutations.START_LOADING);
            const orderService = new OrderService();

            orderService.getOrders()
                .then((orders) => {
                    this.orders = orders.data;
                    this.$store.commit(LoaderMutations.STOP_LOADING);
                })
                .catch((err) => console.log(err));
        },
        methods: {
            removeOrder(id) {
                const orderService = new OrderService();

                orderService.removeOrder(id)
                    .then(() => {
                        this.orders.forEach((item, idx) => {
                            if (item.idOrder === id) {
                                this.orders.splice(idx, 1);
                            }
                        });
                        this.$toast.success('Removed');
                    })
                    .catch((err) => this.$toast.error(err.message));
            }
        },
        computed: {
            ...mapGetters([
                'auth',
                'isAdmin'
            ]),
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
</style>