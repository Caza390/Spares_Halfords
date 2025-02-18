<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import ListOfTools from "../components/Data/ListOfTools";

const route = useRoute();
const searchQuery = ref("");

const selectedType = computed(() => route.params.type);

const filteredTools = computed(() => {
  return ListOfTools.filter((tool) => {
    const query = searchQuery.value;

    const selectedTypeStr = typeof selectedType.value === 'string' ? selectedType.value.toLowerCase() : '';

    const typesMatch = (typeof tool.Types === 'string' && tool.Types.toLowerCase() === selectedTypeStr);

    return (
      typesMatch &&
      (
        tool.ArticleId.includes(query) ||
        tool.TypeName.includes(query) ||
        tool.Name.includes(query) ||
        tool.Boxes.some(set => set.toLowerCase().includes(query))
      )
    );
  });
});
</script>

<template>
  <div class="absolute top-8 right-6">
    <RouterLink to="/tool-type" class="bg-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-700">Return</RouterLink>
  </div>

  <main class="flex flex-col items-center p-10">
    <h1 class="text-3xl font-bold mb-5 capitalize">{{ selectedType }}</h1>

    <input v-model="searchQuery" type="text" placeholder="Search tools..."
      class="w-2/3 p-4 border border-gray-300 rounded-lg text-lg" />

    <div class="grid grid-cols-3 gap-10 mt-10">
      <div v-for="tool in filteredTools" :key="tool.ArticleId"
        class="p-6 bg-gray-100 rounded-lg shadow-md border border-gray-300">
        <h3 class="font-bold text-xl">{{ tool.Name }}</h3>
        <p><strong>Article ID:</strong> {{ tool.ArticleId }}</p>
        <p><strong>SPARES Name:</strong> {{ tool.TypeName }}</p>
        <p><strong>Status:</strong> {{ tool.Status }}</p>
      </div>
    </div>
  </main>
</template>
