<template>
  <div
    class="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative"
  >    <div class="relative overflow-hidden bg-gray-100 aspect-square">
      <img
        :src="product.images"
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
        {{ product.stock > 0 ? "In Stock" : "Out of Stock" }}
      </span>
      <button
        @click.stop="toggleMenu"
        class="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
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
      <div
        v-if="showMenu"
        class="absolute top-14 right-3 bg-white border shadow-xl rounded-xl w-40 z-20 overflow-hidden"
      >
        <button
          @click="openEdit"
          class="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center gap-2 text-sm"
        >
          Edit
        </button>

        <button
          @click="deleteProduct"
          class="w-full px-4 py-3 text-left hover:bg-red-50 flex items-center gap-2 text-sm text-red-600"
        >
          Delete
        </button>
      </div>
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
          <p class="text-xl font-bold text-gray-900">₹{{ product.price }}</p>
          <p class="text-xs text-gray-400">{{ product.stock }} units left</p>
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
  <div
    v-if="showEdit"
    class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-bold">Edit Product</h2>

        <button
          @click="showEdit = false"
          class="text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>

      <form @submit.prevent="saveEdit" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Product Name"
          class="w-full border rounded-xl px-4 py-3"
        />

        <textarea
          v-model="form.description"
          placeholder="Description"
          rows="3"
          class="w-full border rounded-xl px-4 py-3"
        />

        <input
          v-model="form.price"
          type="number"
          step="0.01"
          placeholder="Price"
          class="w-full border rounded-xl px-4 py-3"
        />

        <input
          v-model="form.stock"
          type="number"
          placeholder="Stock"
          class="w-full border rounded-xl px-4 py-3"
        />

        <input
          type="file"
          accept="image/png,image/jpeg"
          @change="handleImage"
          class="w-full border rounded-xl px-4 py-3"
        />

        <div class="flex gap-3 pt-2">
          <button
            type="button"
            @click="showEdit = false"
            class="flex-1 py-3 rounded-xl border"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="flex-1 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number;
    name: string;
    description: string;
    price: string;
    images: string;
    stock: number;
  };
}>();

const emit = defineEmits(["refresh"]);

const { $csrfFetch } = useNuxtApp();

const showMenu = ref(false);
const showEdit = ref(false);
const selectedFile = ref<File | null>(null);

const form = reactive({
  name: props.product.name,
  description: props.product.description,
  price: props.product.price,
  stock: props.product.stock,
});

function toggleMenu() {
  showMenu.value = !showMenu.value;
}

function openEdit() {
  showMenu.value = false;
  showEdit.value = true;

  form.name = props.product.name;
  form.description = props.product.description;
  form.price = props.product.price;
  form.stock = props.product.stock;
}

function handleImage(e: Event) {
  const input = e.target as HTMLInputElement;
  selectedFile.value = input.files?.[0] || null;
}

async function saveEdit() {
  const formData = new FormData();
  formData.append("id", String(props.product.id));
  formData.append("id", String(props.product.id));
  const fields= ["name", "description", "price", "stock"]  as const;
  for (const key of fields) {
    const newValue = String(form[key]);
    const oldValue = String(props.product[key]);

    if (newValue !== oldValue) {
      formData.append(key, newValue);
    }
  }

  if (selectedFile.value) {
    formData.append("image", selectedFile.value);
  }

  await $csrfFetch("/api/edit-product", {
    method: "PUT",
    body: formData,
  });

  showEdit.value = false;
  emit("refresh");
}

async function deleteProduct() {
  showMenu.value = false;

  const ok = confirm("Delete this product?");

  if (!ok) return;

  await $csrfFetch("/api/delete-product", {
    method: "DELETE",
    body: { id: props.product.id },
  });

  emit("refresh");
}
</script>
