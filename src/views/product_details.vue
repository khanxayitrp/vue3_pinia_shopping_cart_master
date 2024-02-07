<template>
    <div class="row mt-3">
        <div class="col-md-6">
            <img :src="product.image" alt="" class="img-fluid">
        </div>
            <div class="col-md-6">
                <h1>{{ product.title }}</h1>
                <p>
                    {{ product.description }}</p>
            
            <h4>ລາຄາ {{ product.price }} ບາດ</h4>
            <div class="d-flex mt-3">
                <div class="btn-group me-auto">
                    <button class="btn btn-outline-primary" @click="increase_quantity()">ເພີ່ມສິນຄ້າ</button>
                    <button class="btn btn-outline-primary">{{ quantity }}</button>
                    <button class="btn btn-outline-primary" @click="decrease_quantity()" :disabled="quantity == 0">ລົບສິນຄ້າ</button>
                </div>
                <button class="btn btn-primary" @click="cart_store.add_cart_detail(product.id,product.price,quantity)">ເພີ່ມສິນຄ້າ</button>
            </div>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'

  import { useRoute } from 'vue-router'

  import axios from 'axios'

  //useCartStore
  import { useCartStore } from '../store/cart'
  const cart_store = useCartStore()

  const product = ref({})

  const quantity = ref(1)

  const increase_quantity = () => quantity.value++
  const decrease_quantity = () => quantity.value--
  
  const route = useRoute()

  const product_detail = async () => {
    await axios.get(`${import.meta.env.VITE_API}/${route.params.id}`)
    .then((response) => {
        
        product.value = response.data
    }).catch((err) => {
            console.log(err)
    })
  }

  onMounted(() => product_detail())

  //console.log(route.params.id)
  </script>
  
  <style lang="sass" scoped>
  
  </style>