<script setup lang="ts">
import { ref, computed } from "vue";
import ListOfTools from "../components/Data/ListOfTools";

const searchQuery = ref("");

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
</script>

<template>
  <div class="absolute top-8 right-6">
    <RouterLink to="/" class="bg-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-700">Return</RouterLink>
  </div>

  <main class="flex flex-col items-center p-10">
    <h1 class="text-3xl font-bold mb-5">Search All</h1>

    <input v-model="searchQuery" type="text" placeholder="Search tools..."
      class="w-2/3 p-4 border border-gray-300 rounded-lg text-lg" />

    <div class="grid grid-cols-3 gap-10 mt-10">
      <div v-for="tool in filteredTools" :key="tool.ArticleId"
        class="p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300">
        <h3 class="font-bold text-xl">{{ tool.Name }}</h3>
        <p><strong>Article ID:</strong> {{ tool.ArticleId }}</p>
        <p><strong>SPARES Name:</strong> {{ tool.TypeName }}</p>
        <p><strong>Type:</strong> {{ tool.Boxes }}</p>
        <p><strong>Status:</strong> {{ tool.Status }}</p>
      </div>
    </div>
  </main>
</template>
