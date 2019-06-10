<template>
    <div class="login-page">
        <form>
            <input type="email" v-model="email" placeholder="Enter your email">
            <input type="password" v-model="password" placeholder="Password">
            <button type="submit" class="btn ripple default" @click.prevent="login">Login</button>
        </form>
    </div>
</template>

<script>
    import { UserService } from '../services';

    export default {
        name: 'Login',
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                const userService = new UserService();

                userService.login();
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"
    @import "../styles/variables"

    .login-page
        display: flex
        justify-content: center
        form
            display: flex
            flex-direction: column
            justify-content: center
            align-items: center
            width: 300px
            font: 16px / 24px Arial, sans-serif
            input
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

                &:focus
                    background-color: $grey
            & > *
                margin: 5px 0


</style>