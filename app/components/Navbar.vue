<template>
    <nav class="bg-white shadow-md">
        <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="text-xl font-bold text-gray-800">
                    SuperLabs E-Commerce
                </div>

                <div class="hidden md:flex items-center space-x-6">
                    <NuxtLink :to="link" class="text-gray-700 hover:text-blue-600 font-medium transition">
                        {{name}}
                    </NuxtLink>
                </div>

                <div class="md:hidden">
                    <button @click="isOpen = !isOpen">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>

            </div>
        </div>

        <div v-if="isOpen" class="md:hidden px-4 pb-4">
            <NuxtLink :to="link" class="block py-2 text-gray-700 hover:text-blue-600">
                {{name}}
            </NuxtLink>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isOpen = ref(false)
defineProps<{
    link:string,
    name:string
}>()
</script>
