<template>
  <div
    class="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <div class="relative overflow-hidden bg-gray-100 aspect-square">
      <img
        :src="`/uploads/${product.images}`"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
      />
      <span
        class="absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full"
        :class="
          product.stock > 0
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        "
      >
        {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
      </span>

      <button
        class="absolute top-3 right-3 bg-white/90 hover:bg-white p-2 rounded-full shadow"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v.01M12 12v.01M12 18v.01"
          />
        </svg>
      </button>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-lg text-gray-800 line-clamp-1">
        {{ product.name }}
      </h3>

      <p class="text-sm text-gray-500 mt-1 line-clamp-2">
        {{ product.description }}
      </p>

      <div class="mt-4 flex items-center justify-between">
        <div>
          <p class="text-xl font-bold text-gray-900">
            ₹{{ product.price }}
          </p>
          <p class="text-xs text-gray-400">
            {{ product.stock }} units left
          </p>
        </div>

        <NuxtLink
          :to="`/product/${product.id}`"
          class="px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          View
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  product: {
    id: number
    name: string
    description: string
    price: string
    images: string
    stock: number
  }
}>()
</script>
