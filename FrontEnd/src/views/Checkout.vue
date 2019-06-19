<template>
    <div class="checkout-page">
        <form @submit="validate" novalidate="true">
            <input type="text" @focus="clearError" @blur="setError" :class="[ isError && !firstName ? 'error' : '' ]"
                   v-model="firstName"
                   placeholder="Enter your first name" required/>
            <input type="text" v-model="lastName" @focus="clearError" @blur="setError"
                   :class="[ isError && !lastName ? 'error' : '' ]" placeholder="Enter your last name" required/>
            <input type="email" v-model="email" @focus="clearError" @blur="setError"
                   :class="[ isError && !email ? 'error' : '' ]" placeholder="Enter your email" required/>
            <input type="text" v-model="address" @focus="clearError" @blur="setError"
                   :class="[ isError && !address ? 'error' : '' ]" placeholder="Enter your address" required/>
            <input type="tel" v-model="phone" @focus="clearError" @blur="setError"
                   :class="[ isError && !phone ? 'error' : '' ]" placeholder="Enter your phone" required/>
            <base-button @click-event="makeOrder" :disabled="!allPrice">Make order {{
                allPrice ? allPrice : 0 }} {{ currency }}
            </base-button>
        </form>
    </div>
</template>

<script>
    import { OrderService } from '../services';
    import { mapGetters } from 'vuex';
    import { CartMutations } from '../store/modules/cart';
    import BaseButton from '../components/BaseButton';

    export default {
        name: 'Checkout',
        components: {
            BaseButton
        },
        data: function () {
            const user = this.user;

            return {
                firstName: user ? user.vFirstName : '',
                lastName: user ? user.vLastName : '',
                email: user ? user.vEmail : '',
                address: user ? user.vAddress : '',
                phone: user ? user.vPhone : '',
                isError: false,
            };
        },
        methods: {
            makeOrder(e) {
                e.preventDefault();
                this.validate();
                const orderService = new OrderService();

                if (!this.isError) {
                    const user = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        email: this.email,
                        address: this.address,
                        phone: this.phone
                    };

                    orderService.makeOrder(user, this.allPrice)
                        .then(() => {
                            this.$toast.success('Ordered');
                            this.$router.push('/');
                            this.$store.commit(CartMutations.CLEAR_CART);
                        })
                        .catch((err) => {
                            this.$toast.error(err.message);
                        });
                }
            },
            validate() {
                if (!this.firstName ||
                    !this.lastName ||
                    !this.email ||
                    !this.address ||
                    !this.phone
                ) {
                    this.$toast.error('Every fields are required');
                    this.isError = true;
                } else {
                    this.isError = false;
                }

            },
            clearError(e) {
                e.target.classList.remove('error');
            },
            setError(e) {
                if (e.target.hasAttribute('required') && !e.target.value)
                    e.target.classList.add('error');
            }
        },
        computed: {
            ...mapGetters([
                'allPrice',
                'currency',
                'cartProducts',
                'user'
            ])
        },
        created() {
            if (this.user) {
                this.firstName = this.user.vFirstName;
                this.lastName = this.user.vLastName;
                this.email = this.user.vEmail;
                this.address = this.user.vAddress;
                this.phone = this.user.vPhone;
            }
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"
    @import "../styles/variables"

    .error
        border: 2px solid red !important

    .checkout-page
        display: flex
        justify-content: space-around

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