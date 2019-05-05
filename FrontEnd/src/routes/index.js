import About from '../views/About';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ProductPage from '../views/ProductPage';

export default [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/product/:productId',
        name: 'product',
        component: ProductPage
    },
    {
        path: '*',
        component: NotFound
    }
];