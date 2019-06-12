import Bus from './bus';
import Modal from './modal'

const VueModal = {};
VueModal.install = (Vue, opts) => {
    Vue.prototype.$modals = new Vue({
        name: '$modals',
        component: Modal,
        created() {
            Bus.$on('open', opts => {
                this.open(opts);
            });

            this.$on('new', options => {
                console.log('NEW EVENT');
                this.open(options);
            });

            this.$on('close', data => {
                this.close(data);
            });

            this.$on('dismiss', index => {
                this.dismiss(index || null);
            });
        },
        render: h => h(Modal),
        methods: {
            open(option = null) {

                document.body.appendChild(document.createElement('div').appendChild(this.$el));

            }
        }
    })
        .$mount();

    Vue.mixin({
        created() {
            this.$on('new', opts => {
                Bus.$emit('open');
                console.log('OPS', opts);
            })
        }
    });
    
    

};

export default VueModal;

export {
    Modal,
    Bus
}