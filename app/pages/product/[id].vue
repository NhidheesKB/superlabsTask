<template>
  <div class="min-h-screen bg-gray-100">
    <Navbar link="/product" name="Available Products" />

    <div class="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div v-if="pending" class="text-center py-20 text-gray-500 text-lg">
        Loading product...
      </div>
      <div
        v-else-if="product"
        class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
      >
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 md:p-10">
          <div>
            <div
              class="sticky top-24 bg-gray-50 rounded-2xl border border-gray-200 p-4"
            >
              <div
                class="aspect-square rounded-xl overflow-hidden bg-white flex items-center justify-center"
              >
                <img
                  :src="product.images"
                  :alt="product.name"
                  class="w-full h-full object-contain hover:scale-105 transition duration-500"
                />
              </div>
            </div>
          </div>
          <div class="space-y-6">
            <div>
              <h1
                class="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug"
              >
                {{ product.name }}
              </h1>

              <p class="text-gray-600 mt-4 leading-7 whitespace-pre-line">
                {{ product.description }}
              </p>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-blue-600 cursor-pointer">
                {{ product.reviews.length }} ratings
              </span>
            </div>
            <div class="border-y py-5 space-y-2">
              <p class="text-sm text-gray-500">Limited Time Deal</p>

              <div class="flex items-end gap-2">
                <span class="text-4xl font-medium text-red-600">
                  ₹{{ product.price }}
                </span>

                <span class="text-sm text-gray-400 line-through">
                  ₹{{ Number(product.price) + 250 }}
                </span>
              </div>

              <p class="text-sm text-gray-600">Inclusive of all taxes</p>
            </div>
            <div>
              <p
                class="text-lg font-medium"
                :class="product.stock > 0 ? 'text-green-600' : 'text-red-600'"
              >
                {{ product.stock > 0 ? "In Stock" : "Out of Stock" }}
              </p>

              <p class="text-sm text-gray-500 mt-1">
                {{ product.stock }} items available
              </p>
            </div>
            <div class="space-y-3 pt-2">
              <button
                class="w-full md:w-72 bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-3 rounded-full transition"
              >
                Add to Cart
              </button>

              <button
                class="w-full md:w-72 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-full transition"
              >
                Buy Now
              </button>
            </div>

            <div class="border-t pt-5 text-sm text-gray-600 space-y-2">
              <p>✔ Cash on Delivery available</p>
              <p>✔ Secure transaction</p>
              <p>✔ Easy returns available</p>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="product"
        class="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8"
      >
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-gray-900">Customer Reviews</h2>

          <span class="text-sm text-gray-500">
            {{ product.reviews.length }} Reviews
          </span>
        </div>

        <div
          v-if="product.reviews.length === 0"
          class="text-center py-10 text-gray-400"
        >
          No reviews yet.
        </div>

        <div v-else class="space-y-5">
          <div
            v-for="review in product.reviews"
            :key="review.id"
            class="border rounded-xl p-5"
          >
            <div class="flex gap-1 text-yellow-400 text-lg mb-2">
              <span v-for="star in 5" :key="star">
                {{ star <= review.rating ? "★" : "☆" }}
              </span>
            </div>

            <p class="text-gray-700">
              {{ review.comment || "No comment provided." }}
            </p>

            <p class="text-xs text-gray-400 mt-3">
              {{ formatDate(review.created_at) }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-20 text-gray-500 text-xl">
        Product not found.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const { data: product, pending } = await useFetch(
  `/api/product/${route.params.id}`,
);

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
</script>
