<template>
    <form name="createProduct" enctype="multipart/form-data">
        <input type="text" name="productName" v-model="productName" required placeholder="Product name">
        <textarea name="productDescr" v-model="productDescr" placeholder="Descripton"></textarea>
        <label>
            Category: <select name="idCategory">
            <option v-for="category in categories" :value="category.idCategory">{{ category.categoryName }}</option>
        </select>
        </label>
        <input type="text" name="price" v-model="price" required placeholder="Price">
        <input type="file" name="file" required>
        <button type="submit" name="submit" @click="createProduct" class="btn ripple default">Create</button>
    </form>
</template>

<script>
    import { CategoryService, ProductService } from '../services';

    export default {
        name: 'ProductCreate',
        data: function() {
          return {
              productName: '',
              productDescr: '',
              imagePath: '',
              idCategory: '',
              price: '',
              categories: []
          }

        },
        created() {
            const cs = new CategoryService();
            cs.getCategories()
                .then(res => {
                    console.log(res);
                    this.categories = res.data.data;
                })
                .catch(err => this.$toast.error(err.message));

        },
        methods: {
            createProduct(e) {
                if (!this.price && !parseFloat(this.price)) {
                    console.log('PRR',this.price);
                    this.$toast.error('Enter correct price');
                    return;
                }

                const ps = new ProductService();

                const form = document.forms.namedItem('createProduct');
                console.log('FOR', form);
                const fd = new FormData(form);

                ps.createProduct(fd)
                    .then(() => this.$toast.success('Product created'))
                    .catch(err => this.$toast.error(err.message));

                e.preventDefault();
            },
        }
    };
</script>

<style scoped lang="sass">
    @import "../styles/colors"
    @import "../styles/button"
    @import "../styles/variables"

    form
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 300px
        font: 16px / 24px Arial, sans-serif

        input[type='file']
            width: 250px

        input,
        textarea
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