import { defineStore } from 'pinia'

import { ref, computed } from 'vue'

import Swal from 'sweetalert2/dist/sweetalert2.js'

import 'sweetalert2/src/sweetalert2.scss'
//useProductStore
import { useProductStore } from './product'

export const useCartStore = defineStore('useCartStore',() => {
    const cart = ref([])

    const add_cart = (id, price, quantity = 1) => {
        const data = {
            id,
            price, 
            quantity
        }

        const findId = cart.value.find(e => e.id === data.id)

        //console.log(findId)

        if (findId) {
            alert_add_cart_fails()
        } else {
            cart.value.push(data)
            SaveToLocalStorage()
            alert_add_cart()
        }
        
        console.log(cart.value)
    }
    const add_cart_detail = (id, price, quantity) => {
        const data = {
            id,
            price,
            quantity
        }
        const findId = cart.value.find(e => e.id == data.id)
        if (findId) {
            const findIndexProduct = cart.value.findIndex(e => e.id == data.id)
            cart.value[findIndexProduct].quantity += quantity
            SaveToLocalStorage()
            alert_add_cart()
        } else {
            cart.value.push(data)
            SaveToLocalStorage()
            alert_add_cart()
        }
    }
    const SaveToLocalStorage = () => {
        localStorage.setItem('cart', JSON.stringify(cart.value))
    }
    const loadFromLocalStorage = () => {
        if (localStorage.getItem('cart')){
            cart.value = JSON.parse(localStorage.getItem('cart'))
        }
    }

    const cart_preview = computed(() => {
        const product_store = useProductStore()

        

        return cart.value.map((prd, i) => {
            const findIndexProduct = product_store.products.findIndex(e => e.id == prd.id)
            console.log(product_store.products[findIndexProduct])
            return {
                product : product_store.products[findIndexProduct],
                quantity : cart.value[i].quantity,
                total_price : cart.value[i].price * cart.value[i].quantity
            }
        })
    })
    const total = computed(() => {
        return cart.value.reduce((sum, prd) => sum + prd.price * prd.quantity, 0)
    })
    const alert_add_cart = () => {
        Swal.fire({
            //position: 'top-center',
            icon:'success',
            title: 'ເພີ້ມຂໍ້ມູນສິນຄ້າສຳເລັດ',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const alert_add_cart_fails = () => {
        Swal.fire({
            //position: 'top-center',
            icon:'error',
            title: 'ສິນຄ້ານີ້ໄດ້ເພີ້ມແລ້ວ',
            showConfirmButton: false,
            timer: 1500
        })
    }
    const increase_quantity = (i) => {
        cart.value[i].quantity += 1
        SaveToLocalStorage()
    }
    const decrease_quantity = (i) => {
        cart.value[i].quantity -= 1
        SaveToLocalStorage()

        if (cart.value[i].quantity <= 0) {
            remove_cart(i)
        }
    }
    const remove_cart = (i) => {
        cart.value.splice(i, 1)
        SaveToLocalStorage()
    }
    const clear_cart = () => {
        cart.value = []
        SaveToLocalStorage()
    }

    return { cart, add_cart,add_cart_detail, loadFromLocalStorage, cart_preview, increase_quantity, decrease_quantity, remove_cart, clear_cart, total }
})