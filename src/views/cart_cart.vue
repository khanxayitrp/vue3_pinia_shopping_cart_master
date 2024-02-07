<template>
    <h1 class="mt-3">ກະຕ່າສິນຄ້າ</h1>
    <div class="d-flex justify-content-center" v-if="!product_store.load_product">
        <h2>ກຳລັງໂຫລດຂໍ້ມູນສິນຄ້າ...</h2>
    </div>
    <table class="table" v-else>
        <thead>
            <tr>
                <th>ສິນຄ້າ</th>
                <th>ລາຄາ</th>
                <th>ຈຳນວນ</th>
                <th>ລວມ</th>
                <th>ລົບສິນຄ້າ</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(cart, index) in carts" :key="index">
                <td>
                    <img :src="cart.product.image" alt="" class="img-thumbnail" width="100">
                    {{ cart.product.title }}
                </td>
                <td>{{ cart.product.price }} ບາດ</td>
                <td>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.decrease_quantity(index)">-</button>
                    <span class="mx-2">{{ cart.quantity }}</span>
                    <button class="btn btn-sm btn-secondary" @click="cart_store.increase_quantity(index)">+</button>
                </td>
                <td>{{ cart.total_price }} ບາດ</td>
                <td>
                    <button class="btn btn-danger" @click="cart_store.remove_cart(index)">ລົບ</button>
                </td>
            </tr>
        </tbody>
    </table>
    <button class="btn btn-primary mb-5" @click="cart_store.clear_cart()">ລ້າງກະຕ່າ</button>
    <button class="btn btn-success mb-5 mx-2" >ລວມມູນຄ່າ {{ cart_store.total }} ບາດ</button>
</template>
 
<script setup>
import { computed } from 'vue'

// currency
import { currencyLAK } from '../shared/currency'
//useCartStore
import { useCartStore } from '../store/cart';
const cart_store = useCartStore()

const carts = computed(() => cart_store.cart_preview )

//useProductStore
import { useProductStore } from '../store/product'
const product_store = useProductStore()
</script>
 
<style lang="scss" scoped>
 
</style>
