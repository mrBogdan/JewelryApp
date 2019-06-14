<template>
    <div id="app">
        <div class="page-wrapper">
            <Header></Header>
            <div class="page-container">
                <sidebar :is-show="isShowSidebar" :title="sideBarTitle" class="side-bar" :categories-array="categories"></sidebar>
                <router-view/>
            </div>
            <Footer></Footer>
        </div>
        <loader :is-loading="$store.getters.isLoading"/>
    </div>
</template>

<script>
    import Header from './components/Header';
    import Footer from './components/Footer';
    import Sidebar from './components/Sidebar';
    import { CategoriesActions } from './store/modules/categories';
    import { mapGetters } from 'vuex';
    import { LoaderMutations } from './store/modules/loader';
    import { CartActions } from './store/modules/cart';
    import Loader from './components/Loader';
    import { OrderService, UserService } from './services';
    import { UserActions } from './store/modules/user';
    import { OrderActions } from './store/modules/order';
    import Bus from './utils/bus';

    export default {
        name: 'App',
        components: {
            Loader,
            Header,
            Footer,
            Sidebar,
        },
        data: function () {
            return {
                isShowSidebar: true,
            };
        },
        computed: {
            sideBarTitle: function () {
                return 'Categories';
            },
            ...mapGetters([
                'categories',
                'user'
            ])
        },
        methods: {
          toggleSidebar() {
              this.isShowSidebar = !this.isShowSidebar;
              
              document.body.getElementsByClassName('page-container')[0].classList.toggle('one-column');
          }
        },
        created() {
            const orderService = new OrderService();
            const userService = new UserService();

            if (userService.getUserToken()) {
                this.$store.dispatch(UserActions.SET_USER)
                    .then(() => {
                        return this.$store.dispatch(OrderActions.LOAD_ORDERS_BY_EMAIL, this.user.vEmail)
                    })
                    .catch(err => console.error(err));
            }

            this.$store.commit(LoaderMutations.START_LOADING);
            this.$store.dispatch(CartActions.SET_CART_PRODUCTS, orderService.getProducts());
            this.$store.dispatch(CategoriesActions.SET_ALL_CATEGORIES);

            Bus.$on('toggle-sidebar', () => this.toggleSidebar());
        },
        mounted() {
            this.$store.commit(LoaderMutations.STOP_LOADING);
        }
    };
</script>

<style lang="sass">
    @import "styles/main"
    @import "styles/variables"

    .page-container
        padding: $header-height $side-padding ($footer-height * 2) $side-padding
        display: grid
        grid-template-columns: 20% 75%
        grid-column-gap: 5%
        height: 100%
        width: 100%

    .one-column
        grid-template-columns: 100% !important

    @media screen and (max-width: 768px)
        .page-container
            padding: $header-height 0
            grid-template-columns: 100%
            grid-column-gap: 0

        .page-container .side-bar
            display: none

        .header
            padding: 0

</style>
