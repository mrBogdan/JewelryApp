<template>
    <div class="login-page">
        <form @submit="validate" novalidate="true">
            <input type="text" @focus="clearError" @blur="setError" :class="[ isError && !firstName ? 'error' : '' ]" v-model="firstName"
                   placeholder="Enter your first name" required/>
            <input type="text" v-model="lastName" @focus="clearError" @blur="setError" :class="[ isError && !lastName ? 'error' : '' ]" placeholder="Enter your last name" required/>
            <input type="email" v-model="email" @focus="clearError" @blur="setError" :class="[ isError && !email ? 'error' : '' ]" placeholder="Enter your email" required/>
            <input type="text" v-model="address" @focus="clearError" @blur="setError" :class="[ isError && !address ? 'error' : '' ]" placeholder="Enter your address" required/>
            <input type="tel" v-model="phone" @focus="clearError" @blur="setError" :class="[ isError && !phone ? 'error' : '' ]" placeholder="Enter your phone" required/>
            <input type="file" name="imageFile"/>
            <input type="password" @focus="clearError" @blur="setError" :class="[ isError && !password ? 'error' : '' ]" v-model="password" placeholder="Password" required/>
            <button type="submit" class="btn ripple default" @click="signup">SignUp</button>
        </form>
    </div>
</template>

<script>
    import { UserService } from '../services';

    export default {
        name: 'Signup',
        data: function () {
            return {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                imageFile: '',
                address: '',
                phone: '',
                isError: false,
                done: false,
            };
        },
        methods: {
            signup(e) {
                this.validate();
                const userService = new UserService();
                console.log('111');
                userService.login();

                e.preventDefault();
            },
            validate() {
                if (!this.firstName ||
                    !this.lastName ||
                    !this.email ||
                    !this.password ||
                    !this.address ||
                    !this.phone
                ) {
                    this.$toast.error('Every fields apart from image file are required');
                    this.isError = true;
                }

                if (!this.isError) this.done = true;

            },
            validateEmail(email) {
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(String(email).toLowerCase());
            },
            clearError(e) {
                e.target.classList.remove('error');
            },
            setError(e) {
                if (e.target.hasAttribute('required') && !e.target.value)
                    e.target.classList.add('error');
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"
    @import "../styles/variables"

    .error
        border: 2px solid red !important

    .sign-up-page
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