<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar link="/" name="Add product" />
    <div class="max-w-7xl mx-auto px-4 pt-6">
      <input
        type="text"
        placeholder="Search products..."
        class="w-full md:w-96 px-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
    <div class="max-w-7xl mx-auto px-4 py-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="text-center mt-10">
        <button
          @click="handleShowMore"
          class="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium shadow"
        >
          Show More
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { $csrfFetch } = useNuxtApp()

const id = ref(1)
const products = ref<any[]>([])

async function listProduct() {
  const response = await $csrfFetch("/api/list-product", {
    method: "POST",
    body: { id: id.value }
  })
  products.value = [...products.value, ...response]

  if (response.length > 0) {
    id.value = response.at(-1).id + 1
  }
}

onMounted(listProduct)

async function handleShowMore() {
  await listProduct()
}
</script>
