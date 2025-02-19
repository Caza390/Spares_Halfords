<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchQuery = ref("");
const toolBoxes = ref<any[]>([]);

const filteredToolBoxes = computed(() => {
    return toolBoxes.value.filter((tool) => {
        const query = searchQuery.value.toLowerCase();
        return (
            tool.ArticleId.toLowerCase().includes(query) ||
            tool.Box.toLowerCase().includes(query)
        );
    });
});

const loadToolBox = async () => {
    try {
        console.log("Current route name:", route.name);
        if (route.name === "tool-boxes") {
            toolBoxes.value = (await import("../components/Data/ListOfToolBox")).default;
        } else {
            toolBoxes.value = [];
        }
    } catch (error) {
        console.error("Error loading tool box:", error);
    }
};

onMounted(loadToolBox);
watch(() => route.name, loadToolBox);
</script>

<template>
    <div class="absolute top-8 right-6">
        <RouterLink to="/" class="bg-red-500 px-4 py-2 rounded-lg shadow-md hover:bg-red-700">Return</RouterLink>
    </div>

    <main class="flex flex-col items-center p-10">
        <h1 class="text-3xl font-bold mb-5">Tool Box</h1>

        <input v-model="searchQuery" type="text" placeholder="Search Tool Box..."
            class="w-2/3 p-4 border border-gray-300 rounded-lg text-lg" />

        <div v-if="filteredToolBoxes.length > 0" class="grid grid-cols-4 gap-8 mt-10">
            <RouterLink v-for="toolBox in filteredToolBoxes" :key="toolBox.ArticleId"
                :to="`/tool-boxes/${toolBox.Box.toLowerCase().replace(/\s+/g, '%20')}`"
                class="bg-halfords-orange-400 w-64 min-h-64 p-4 rounded-lg flex flex-col items-center hover:bg-halfords-orange-500">
                <div class="h-16 flex items-center justify-center">
                    <p class="font-bold text-xl text-center break-words">{{ toolBox.Box }}</p>
                </div>
                <div class="w-56 h-36 bg-white border border-black flex items-center justify-center">
                    <img :src="toolBox.Image" alt="tool-box" class="w-full h-full object-contain" />
                </div>
            </RouterLink>
        </div>

        <p v-else class="text-gray-500 mt-5">No tool box found.</p>
    </main>
</template>
