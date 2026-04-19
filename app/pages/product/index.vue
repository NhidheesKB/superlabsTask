<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar link="/" name="Add product" />

    <div class="max-w-7xl mx-auto px-4 pt-6">
      <input
        type="text"
        v-model="search"
        placeholder="Search products..."
        class="w-full md:w-96 px-4 py-3 border rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
    <p v-if="products.length === 0" class="text-center text-gray-500">
      No products found
    </p>
    <div v-else class="max-w-7xl mx-auto px-4 py-8">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
      <div class="text-center mt-10" v-if="!search">
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
const { $csrfFetch } = useNuxtApp();
const search = useDebouncedRef("", 1000);
const id = ref(1);
const products = ref<any[]>([]);

async function listProduct() {
  const response = await $csrfFetch("/api/list-product", {
    method: "POST",
    body: { id: id.value },
  });
  products.value = [...products.value, ...response];

  if (response.length > 0) {
    id.value = response.at(-1).id + 1;
  }
}

async function searchproduct(search: string) {
  const response = await $csrfFetch("/api/search-product", {
    method: "POST",
    body: { search },
  });
  products.value = response;
}
async function handleShowMore() {
  await listProduct();
}
onMounted(listProduct);

watch(search, async (value) => {
  if (value.length == 0) {
    id.value = 1;
    products.value = [];
    return await listProduct();
  }
  if (value.length < 2) return;
  await searchproduct(value);
});
</script>
