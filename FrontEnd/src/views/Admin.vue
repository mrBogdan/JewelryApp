<template>
    <div v-if="isAdmin">
        <h2>Admin</h2>
        <order-table :orders="orders"></order-table>
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
    import OrderTable from '../components/OrderTable';

    export default {
        name: 'Admin',
        components: { OrderTable, Icon },
        data: function () {
            return {
                orders: [],
                faTrashAlt,
            };
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
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"

    .default
        display: inline
        color: $blue-shadow-color
</style>