import About from '../views/About';
import Home from '../views/Home';
import NotFound from '../views/NotFound';
import ProductPage from '../views/ProductPage';
import Categories from '../views/Categories';
import CategoryPage from '../views/CategoryPage';
import SignUpPage from '../views/SignUpPage';
import CartPage from '../views/CartPage';
import SearchPage from '../views/SearchPage';
import Checkout from '../views/Checkout';
import Account from '../views/Account';
import Admin from '../views/Admin';
import OrderInfo from '../views/OrderInfo';

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
        path: '/checkout',
        name: 'checkout',
        component: Checkout
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
    },
    {
        path: '/order/:id',
        name: 'order-info',
        component: OrderInfo
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

        ]
    },
    {
        path: '/categories/:id',
        name: 'category',
        component: CategoryPage
    },
    {
        path: '/cart',
        name: 'cart',
        component: CartPage
    },
    {
        path: '/page/:number',
        name: 'page',
        component: Home,
    },
    {
        path: '/search',
        name: 'search',
        component: SearchPage,
    },
    {
        path: '/login',
        name: 'login',
        component: SignUpPage

    },
    {
        path: '*',
        name: 'notFound',
        component: NotFound
    },
];