<template>
    <div>
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

    export default {
        name: 'OrderTable',
        components: { Icon },
        data: function () {
            return {
                faTrashAlt,
            };
        },
        props: [
            'orders'
        ],
        computed: {
            ...mapGetters([
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