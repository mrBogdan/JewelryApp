<template>
    <div class="login-page">
        <form @submit="validate" novalidate="true" name="registerForm" enctype="multipart/form-data">
            <input type="text" name="firstName" @focus="clearError" @blur="setError" :class="[ isError && !firstName ? 'error' : '' ]" v-model="firstName"
                   placeholder="Enter your first name" required/>
            <input type="text" name="lastName" v-model="lastName" @focus="clearError" @blur="setError" :class="[ isError && !lastName ? 'error' : '' ]" placeholder="Enter your last name" required/>
            <input type="email" name="email" v-model="email" @focus="clearError" @blur="setError" :class="[ isError && !email ? 'error' : '' ]" placeholder="Enter your email" required/>
            <input type="text" name="address"  v-model="address" @focus="clearError" @blur="setError" :class="[ isError && !address ? 'error' : '' ]" placeholder="Enter your address" required/>
            <input type="tel" name="phone"  v-model="phone" @focus="clearError" @blur="setError" :class="[ isError && !phone ? 'error' : '' ]" placeholder="Enter your phone" required/>
            <input type="file" name="file" @change="setFile" />
            <input type="password" name="password"  @focus="clearError" @blur="setError" :class="[ isError && !password ? 'error' : '' ]" v-model="password" placeholder="Password" required/>
            <base-button @click-event="signup">SignUp</base-button>
        </form>
    </div>
</template>

<script>
    import { UserService } from '../services';
    import BaseButton from './BaseButton';

    export default {
        name: 'Signup',
        components: {
          BaseButton
        },
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

                const form = document.forms.namedItem('registerForm');
                const fd = new FormData(form);

                userService.registration(fd)
                    .then(() => {
                        this.$toast.success('Successfully registered')
                    })
                    .catch(err => this.$toast.error(err.response.data[0].errors[0]));

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
            },
            setFile(e) {
                this.imageFile = e.target.files[0];
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