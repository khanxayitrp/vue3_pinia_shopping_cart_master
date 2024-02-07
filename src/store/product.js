import { defineStore } from 'pinia'
import axios from 'axios'
import { ref, computed } from 'vue'

export const useProductStore = defineStore('useProductStore',() => {
    const products = ref([])

    const Input = ref('')

    const list_product = computed(() => products.value)

    const load_product = computed(() => products.value.length > 0)

    const fetch_products = async () => {
        await axios.get(`${import.meta.env.VITE_API}`)
        .then((response) => {
           
            products.value = response.data
             
          }).catch((err) => {
            console.log(err)
          })
    }

    const search_products = computed(() => {
        if (products.value.length < 3) return products.value

        return products.value.filter((prd) => {
            if (prd.title.toLowerCase().includes(Input.value.toLowerCase()) == false) {
                return false
            } else {
                return prd.title.toLowerCase().includes(Input.value.toLowerCase())
            }
        })
    })


    return { products, fetch_products, list_product, load_product, Input, search_products }
})