import About from '../views/About';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ProductPage from '../views/ProductPage';
import Categories from '../views/Categories';
import CategoryPage from '../views/CategoryPage';

export default [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/product/:id',
        name: 'product',
        component: ProductPage
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories,
        children: [
            {
                path: ':id',
                name: 'category',
                component: CategoryPage
            }
        ]
    },
    {
        path: '*',
        component: NotFound
    }
];