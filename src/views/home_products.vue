<template>
    <div class="d-flex justify-content-center" v-if="!product_store.load_product">
        <h2>ກຳລັງໂຫລດຂໍ້ມູນສິນຄ້າ...</h2>
    </div>
  <div class="row mt-2" v-else>
    <div class="col mb-2" v-for="(product, index) in search_product" :key="index">
        <div class="card" style="width: 19rem; height: 399;">
            <img :src="product.image" class="card-img-top mx-auto" alt="" style="width: 12rem; height: 12rem;">
            <div class="card-body">
                <h5 class="card-title">{{ product.title }}</h5>
                <p class="card-text">ໝວດໝູ່ {{ product.category }}</p>
                <p class="card-text">ລາຄາ {{ product.price }} ບາດ</p>
                <routerLink :to="`/product_detail/${product.id}`" class="btn btn-primary mx-2">ລາຍລະອຽດ</routerLink>
                <button class="btn btn-success" @click="cart_store.add_cart(product.id,product.price)">ເພິ້ມລົງກະຕ່າ</button>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// useProductStore
import { useProductStore } from '../store/product';
const product_store = useProductStore()

const list = computed(() => product_store.list_product )

const search_product = computed(() => product_store.search_products)

// useCartStore
import { useCartStore } from '../store/cart';
const cart_store = useCartStore()
</script>

<style lang="sass" scoped>

</style>