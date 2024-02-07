import { createRouter, createWebHistory } from 'vue-router'
import home_products from '../views/home_products.vue'
import product_details from '../views/product_details.vue'
import cart_cart from '../views/cart_cart.vue'
const routes = [
  {
    path: '/',
    name: 'home_products',
    component: home_products
  },
  {
    path: '/product_detail/:id',
    name: 'product_details',
    component: product_details
  },
  {
    path: '/cart',
    name: 'cart_cart',
    component: cart_cart
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router