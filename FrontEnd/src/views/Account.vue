<template>
    <div v-if="auth">
        <h2>Account</h2>
        <div>
            <div class="user-info">
                <div class="user-ava">
                    <img :src="user.vImageUrl" alt="User image">
                </div>
                <div>
                    <p>User name: <b>{{ user.vFirstName }} {{ user.vLastName }}</b></p>
                    <p>Email: <b>{{ user.vEmail }}</b></p>
                    <p>Phone: <b>{{ user.vPhone }}</b></p>
                </div>
            </div>
            <order-table :orders="orders"></order-table>
        </div>
    </div>
    <div v-else><h2>Unauthorized</h2></div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import OrderTable from '../components/OrderTable';

    export default {
        name: 'Account',
        components: { OrderTable },
        computed: {
            ...mapGetters([
                'user',
                'auth',
                'orders'
            ])
        },
    };
</script>

<style lang="sass" scoped>
    @import "../styles/colors"

    .user-info
        display: flex

        & > *
            margin-right: 20px

    .user-ava
        img
            width: 150px
            height: 150px
            border-radius: 50%
        border: 1px solid $light-grey

</style>