<template>
    <div v-if="isAdmin">
        <h2>Admin</h2>
        <div class="tabs">
            <button :class="[currentTab === tab ? 'active' : '', 'btn']" @click="setActiveTab(tab)" v-for="(tab, idx) in tabs" :key="idx">{{ tab }}</button>
        </div>
        <component :is="currentTab"></component>
    </div>
    <div v-else>
        Forbidden
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import order from '../components/OrderTable';
    import products from './AdminProducts';
    import Bus from '../utils/bus';

    export default {
        name: 'Admin',
        components: { order, products },
        data: function () {
            return {
                tabs: [
                    'order',
                    'products',
                ],
                currentTab: 'order'
            };
        },
        computed: {
            ...mapGetters([
                'auth',
                'isAdmin'
            ])
        },
        methods: {
            setActiveTab(tab) {
                this.currentTab = tab;
            }
        },
        mounted() {
            Bus.$emit('toggle-sidebar');
        },
        destroyed() {
            Bus.$emit('toggle-sidebar');
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/button"

    .default
        display: inline
        color: $blue-shadow-color

    .tabs
        display: flex
        justify-content: center
        button
            padding: 5px
            font: 16px/24px Arial, sans-serif

</style>