<template>
    <div  class="sign-up-page">
        <h2>{{ currentTab }}</h2>
        <div class="tabs">
            <div>
                <button
                        v-for="tab in tabs"
                        :key="tab"
                        :class="['btn', 'tab-caption', { active: currentTab === tab }]"
                        @click="currentTab = tab"
                >
                    {{ tab }}
                </button>
            </div>
            <div>
                <component :is="currentTab"
                           class="tab"
                ></component>
            </div>
        </div>
    </div>
</template>

<script>
    import login from '../components/Login';
    import signup from '../components/Signup';
    import { mapGetters } from 'vuex';

    export default {
        name: 'SignUpPage',
        data: function () {
            return {
                currentTab: 'login',
                tabs: [
                    'login',
                    'signup'
                ]
            };
        },
        components: {
            login,
            signup
        },
        computed: {
            ...mapGetters([
                'auth'
            ])
        },
        mounted() {
            if (this.auth) this.$router.push('/');
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/button"
    @import "../styles/colors"

    .tab-caption
        width: 150px
        height: 30px
        border-radius: 5px

    .tabs
        display: flex
        justify-content: center
        align-items: center
        flex-direction: column
</style>