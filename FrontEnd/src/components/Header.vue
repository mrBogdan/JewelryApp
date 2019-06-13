<template>
    <header class="header showHeader">
        <div class="container">
            <div class="logo">
                <router-link to="/"><span class="logo-text">J</span></router-link>
            </div>
            <div>
                <div class="search">
                    <div>
                        <icon :icon="faSearch" :on-click="search" class="search-icon"/>
                    </div>
                    <input type="text" autocomplete="off" @keypress.enter="search" v-model="inputValue" class="search-field" name="search"
                           placeholder="Search ... ">
                </div>
            </div>
            <div class="actions">
                <router-link :to="{ name: 'about' }">
                    <icon :icon="faQuestionCircle" :tooltip-text="'About'"/>
                </router-link>
                <router-link to="/cart">
                    <div class="cart">
                        <icon :icon="faShoppingCart" :tooltip-text="'Your Cart'"/>
                        <span v-if="$store.getters.cartCount" class="cart-counter">{{ $store.getters.cartCount }}</span>
                    </div>
                </router-link>
                <router-link to="/login" v-if="!auth">
                    <icon :has-popup="false" :icon="faSignInAlt" :tooltip-text="'Sign in'"/>
                </router-link>
                <div v-else class="authed">
                    <div @click="logout">
                        <icon :icon="faSignOutAlt" :tooltip-text="'Sign out'"/>
                    </div>
                    <router-link to="/account">
                        <icon :icon="faUserCircle" :tooltip-text="'Account'"/>
                    </router-link>
                    <router-link to="/admin" v-if="isAdmin">
                        <icon :icon="faTools" :tooltip-text="'Admin panel'"/>
                    </router-link>
                </div><!--
                <div @click="openM">
                    <icon :icon="faTools" :tooltip-text="'Pop up'"/>
                </div>-->


            </div>
        </div>
    </header>
</template>

<script>
    import {
        faSearch,
        faShoppingCart,
        faSignInAlt,
        faSignOutAlt,
        faQuestionCircle,
        faTh,
        faUserCircle,
        faTools,
    } from '@fortawesome/free-solid-svg-icons';
    import Icon from './BaseIcon';
    import { SearchService } from '../services';
    import { ProductsMutations } from '../store/modules/products';
    import { mapGetters } from 'vuex';
    import { UserMutations } from '../store/modules/user';

    export default {
        name: 'Header',
        components: {
            Icon
        },
        data: function () {
            return {
                faSearch,
                faShoppingCart,
                faSignInAlt,
                faQuestionCircle,
                faSignOutAlt,
                faTh,
                faTools,
                faUserCircle,
                inputValue: '',
            };
        },
        computed: {
            ...mapGetters([
                'auth',
                'isAdmin'
            ])
        },
        methods: {
            search() {
                const ss = new SearchService();

                if (!this.inputValue) {
                    return;
                }

                ss.search(this.inputValue)
                    .then((products) => {
                        this.$router.push('/search');
                        
                        if (!products.data.count) {
                            return this.$toast.error('Products not found');
                        }

                        return this.$store.commit(ProductsMutations.SET_PRODUCTS, products.data.data);
                    });
            },
            logout() {
                this.$store.commit(UserMutations.LOGOUT);
            },
            openM() {
                console.log('open');
                this.$emit('new');
            }
        }
    };

    let prevScrollPos = window.pageYOffset;

    window.onscroll = function () {
        const headerElem = document.querySelector('header.header');
        let currentScrollPos = window.pageYOffset;

        if (prevScrollPos > currentScrollPos) {
            headerElem.classList.add('showHeader');
        } else {
            headerElem.classList.remove('showHeader');
        }

        prevScrollPos = currentScrollPos;
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/button"
    @import "../styles/variables"

    .header
        width: 100%
        border-bottom: 1px solid #cccccc
        background-color: $header-bgc
        height: $header-height
        box-shadow: 0 5px 5px $shadow-color
        padding: 0 $side-padding
        opacity: .8
        position: fixed
        top: -$header-height
        left: 0
        z-index: 30
        transition: top .3s

    .showHeader
        top: 0

    .container
        display: flex
        justify-content: space-between
        align-items: center
        height: 100%

    .logo-text
        display: flex
        justify-content: center
        align-items: center
        font: 20px/24px Arial, sans-serif
        font-weight: bold
        border: 3px solid $black
        width: 30px
        height: 30px
        transition: all .5s

        &:hover
            color: $white
            background-color: $black


    .search
        position: relative

    .search-icon
        position: absolute
        top: 2px
        left: 2px

    .search-field
        opacity: 1
        width: 360px
        border: 2px solid $grey
        background-color: $white
        outline: none
        height: $search-height
        padding: 5px 0 5px $icon-container-width
        border-radius: 5px
        transition: background-color .5s
        font-size: 18px

    .search-field:focus
        background-color: $grey


    .actions > *
        margin-right: 10px

    .actions > *:last-child
        margin-right: 0

    .actions
        display: flex
        justify-content: center
        align-items: center

    .cart
        position: relative

        .cart-counter
            position: absolute
            bottom: 0
            right: 0
            background-color: rgba($dark-blue-grey, 1)
            border-radius: 50%
            width: 20px
            height: 20px
            display: flex
            justify-content: center
            align-items: center
            color: $white

    .authed
        display: flex
        justify-content: center
        align-items: center
</style>