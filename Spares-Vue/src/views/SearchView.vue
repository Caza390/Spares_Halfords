<script setup lang="ts">
import { ref, computed } from "vue";
import ListOfTools from "../components/Data/ListOfTools";

const searchQuery = ref("");
const selectedImage = ref<string | null>(null);

const filteredTools = computed(() => {
  return ListOfTools.filter((tool) => {
    const query = searchQuery.value.toLowerCase();
    return (
      tool.ArticleId.toLowerCase().includes(query) ||
      tool.TypeName.toLowerCase().includes(query) ||
      tool.Name.toLowerCase().includes(query) ||
      tool.Types.toLowerCase().includes(query) ||
      tool.Boxes.some(set => set.toLowerCase().includes(query))
    );
  });
});

const openImage = (imageSrc: string) => {
  selectedImage.value = imageSrc;
};

const closeImage = () => {
  selectedImage.value = null;
};
</script>

<template>
  <div class="absolute top-8 right-6">
    <RouterLink to="/" class="bg-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-700">Return</RouterLink>
  </div>

  <transition name="fade">
  <div v-if="selectedImage" class="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" @click="closeImage">
    <div class="relative p-4">
      <img :src="selectedImage" class="max-w-4xl max-h-[80vh] rounded-lg shadow-lg" />
      <button @click="closeImage" class="absolute top-2 right-2 text-white text-2xl font-bold bg-red-600 px-3 py-1 rounded-lg hover:bg-red-800">X</button>
    </div>
  </div>
</transition>

  <main class="flex flex-col items-center p-10">
    <h1 class="text-3xl font-bold mb-5">Search All</h1>

    <input v-model="searchQuery" type="text" placeholder="Search tools..."
      class="w-2/3 p-4 border border-gray-300 rounded-lg text-lg" />

    <div class="grid grid-cols-4 gap-8 mt-10">
      <div v-for="tool in filteredTools" :key="tool.ArticleId"
        class="bg-halfords-orange-400 w-64 min-h-64 p-4 rounded-lg flex flex-col items-center hover:bg-halfords-orange-500">
        <div class="h-16 flex items-center justify-center">
          <h3 class="font-bold text-xl text-center break-words">{{ tool.Name }}</h3>
        </div>
        <div class="w-56 h-36 bg-white border border-black flex items-center justify-center">
          <img :src="tool.Image" alt="tool-boxes" @click="openImage(tool.Image)" class="w-full h-full object-contain" />
        </div>
        <p><strong>Article ID:</strong> {{ tool.ArticleId }}</p>
        <p><strong>Part:</strong> {{ tool.Part }}</p>
        <p class="text-center"><strong>SPARE Name:</strong> {{ tool.TypeName }}</p>
        <p><strong>Type:</strong> {{ tool.Types }}</p>
        <p :class="{
          'bg-halfords-status-50 text-white mt-2 px-2 py-1 rounded-lg': tool.Status === 'Available',
          'bg-halfords-status-100 text-white mt-2 px-2 py-1 rounded-lg': tool.Status === 'Discontinued'
          }"><strong>Status:</strong> {{ tool.Status }}
        </p>
      </div>
    </div>
  </main>
</template>
