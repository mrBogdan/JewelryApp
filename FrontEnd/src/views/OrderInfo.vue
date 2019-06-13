<template>
    <div>
        <div>
            <p>Order id: <b>{{ order.idOrder }}</b></p>
            <p>Delivery address: <b>{{ order.deliveryAddress }}</b></p>
            <p>Email: <b>{{ order.email }}</b></p>
            <p>Name: <b>{{ order.firstName }}</b></p>
            <p>Surname: <b>{{ order.lastName }}</b></p>
            <p>Phone: <b>{{ order.phone }}</b></p>
            <p>Price: <b>{{ order.price }}</b></p>
        </div>
        <products-table :is-cart="false" :products="products" ></products-table>

    </div>
</template>

<script>
    import ProductsTable from '../components/ProductsTable';
    import { OrderService, ProductService } from '../services';

    export default {
        name: 'OrderInfo',
        components: { ProductsTable },
        data: function () {
            return {
                order: [],
                products: [],
            }
        },
        created() {
            const os = new OrderService();
            const ps = new ProductService();

            const id = this.$route.params.id;

            os.getOrderById(id)
                .then((order) => {
                    this.order = order.data;
                    const { products } = JSON.parse(order.data.products);
                    const ids = products.map( item => item.idProduct);

                    ps.getProductsByIds(ids)
                        .then(res => {
                            this.products = products.map( (item, idx) => ({ ...item, product: res.data.data[idx] }) ) ;
                        })
                        .catch(err => {
                            console.error(err);
                            this.$toast.error('error while getting products')
                        });
                })
                .catch(err => {
                    console.error(err);
                    this.$toast.error('error while getting order')
                });
        }
    };
</script>

<style scoped>

</style>