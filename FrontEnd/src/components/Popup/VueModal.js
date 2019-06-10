import Bus from '../../utils/bus';
import PopupWrapper from './PopupWrapper';
import Popup from './Popup'

const VuePopup = {};

VuePopup.install = (Vue) => {
    Vue.prototype.$popups = new Vue({
        name: '$popups',

        created() {
            Bus.$on('opened', data => {
                this.$emit('popups:opened', data);
            });

            Bus.$on('closed', data => {
                this.$emit('popups:closed', data);
            });

            Bus.$on('destroyed', data => {
                this.$emit('popups:destroyed', data);
            });

            this.$on('new', options => {
                this.open(options);
            });

            this.$on('close', data => {
                this.close(data);
            });

            this.$on('dismiss', index => {
                this.dismiss(index || null);
            });
        },

        methods: {
            open(options = null) {
                Bus.$emit('new', options);
            },

            close(data = null) {
                Bus.$emit('close', data);
            },

            dismiss(index = null) {
                Bus.$emit('dismiss', index);
            }
        }
    });

    Vue.mixin({
        created() {
            this.$on('modals:new', options => {
                Bus.$emit('new', options);
            });

            this.$on('modals:close', data => {
                Bus.$emit('close', data);
            });

            this.$on('modals:dismiss', index => {
                Bus.$emit('dismiss', index);
            });
        }
    });
};

export default VuePopup;

export {
    PopupWrapper,
    Popup,
    Bus
}