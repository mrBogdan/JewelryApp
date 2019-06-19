<template>
    <div class="login-page">
        <form>
            <input type="email" v-model="email" placeholder="Enter your email">
            <input type="password" v-model="password" placeholder="Password">
            <base-button @click-event="login">Login</base-button>
        </form>
    </div>
</template>

<script>
    import { UserService } from '../services';
    import { UserMutations } from '../store/modules/user';
    import BaseButton from './BaseButton';

    export default {
        name: 'Login',
        components: {
            BaseButton
        },
        data: function () {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login(e) {
                const userService = new UserService();

                userService.login(this.email, this.password)
                    .then((user) => {
                        this.$toast.success('Login');
                        this.$store.commit(UserMutations.SET_USER, user);
                        this.$router.push('/');
                    })
                    .catch(err => this.$toast.error('Incorrect email or password'));
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