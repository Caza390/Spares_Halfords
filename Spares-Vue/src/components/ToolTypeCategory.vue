<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchQuery = ref("");
const toolTypes = ref<any[]>([]);

const filteredToolTypes = computed(() => {
    return toolTypes.value.filter((tool) => {
        const query = searchQuery.value.toLowerCase();
        return (
            tool.ArticleId.toLowerCase().includes(query) ||
            tool.Type.toLowerCase().includes(query)
        );
    });
});

const loadToolType = async () => {
    try {
        console.log("Current route name:", route.name);
        if (route.name === "tool-type") {
            toolTypes.value = (await import("../components/Data/ListOfToolTypes")).default;
        } else {
            toolTypes.value = [];
        }
    } catch (error) {
        console.error("Error loading tool types:", error);
    }
};

onMounted(loadToolType);
watch(() => route.name, loadToolType);
</script>

<template>
    <div class="absolute top-8 right-6">
        <RouterLink to="/" class="bg-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-700">Return</RouterLink>
    </div>

    <main class="flex flex-col items-center p-10">
        <h1 class="text-3xl font-bold mb-5">Tool Type</h1>

        <input v-model="searchQuery" type="text" placeholder="Search Tool Type..."
            class="w-2/3 p-4 border border-gray-300 rounded-lg text-lg" />

        <div v-if="filteredToolTypes.length > 0" class="grid grid-cols-4 gap-8 mt-10">
            <RouterLink v-for="toolType in filteredToolTypes" :key="toolType.ArticleId"
                :to="`/tool-type/${toolType.Type.toLowerCase().replace(/\s+/g, '%20')}`"
                class="bg-halfords-orange-400 w-64 h-64 p-4 rounded-lg flex flex-col items-center hover:bg-halfords-orange-500">
                <p class="mt-3 font-bold text-black">{{ toolType.Type }}</p>
            </RouterLink>
        </div>

        <p v-else class="text-gray-500 mt-5">No tool types found.</p>
    </main>
</template>
