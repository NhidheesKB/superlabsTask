<template>
  <div>
    <Navbar link="/product" name="Available Products" />
    <div class="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">Create Product</h1>

      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div v-for="field in FormFields" :key="field.model">
          <label class="block text-sm font-medium text-gray-700 mb-1">
            {{ field.label }}
          </label>
          <input
            v-if="field.type == 'file'"
            :type="field.type"
            accept="image/png,image/jpeg"
            @input="handleFileInput"
            class="w-full border rounded-lg px-3 py-2"
          />
          <textarea v-else-if ="field.type=='textarea'"
          :type="field.type"
          v-model="form[field.model]"
            required
            :step="field.model == 'price' ? 'any' : ''"
            :placeholder="`Enter the ${field.label}`"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            v-else
            v-model="form[field.model]"
            :type="field.type"
            required
            :step="field.model == 'price' ? 'any' : ''"
            :placeholder="`Enter the ${field.label}`"
            class="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <p v-if="error[field.model]" class="text-red-500 text-sm mt-1">
            {{ error[field.model] }}
          </p>
        </div>
        <button
          type="submit"
          class="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Product
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";

const { $csrfFetch } = useNuxtApp();

const selectedFile = ref<File | null>(null);

const form: Record<string, any> = reactive({
  name: "",
  stock: 1,
  image: null,
  description: "",
  price: 1.0,
});

const error = ref<Record<string, string>>({});

const FormFields = [
  { label: "Product Name", model: "name", type: "text" },
  { label: "Product Image (JPG/PNG)", model: "image", type: "file" },
  { label: "Product Description", model: "description", type: "textarea" },
  { label: "Product Stock", model: "stock", type: "number" },
  { label: "Product Price", model: "price", type: "number" },
];

function handleFileInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  if (!["image/png", "image/jpeg"].includes(file.type)) {
    error.value.image = "Only JPG / PNG allowed";
    selectedFile.value = null;
    return;
  }

  error.value.image = "";
  selectedFile.value = file;
}

async function handleSubmit() {
  if (!selectedFile.value) {
    error.value.image = "Image is required";
    return;
  }

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("description", form.description);
  formData.append("stock", form.stock);
  formData.append("price", form.price);
  formData.append("image", selectedFile.value);

  try {
    await $csrfFetch("/api/add-product", {
      method: "POST",
      body: formData,
    });

    alert("Product created!");
    navigateTo('/product')

  } catch (err) {
    console.error(err);
  }
}
</script>
