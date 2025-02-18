<script setup lang="ts">
</script>

<template>
  <main class="flex justify-center items-center p-20">
    <div class="grid grid-cols-3 gap-20">
      <RouterLink to="/search"
        class="bg-halfords-orange-400 w-72 h-72 p-6 rounded-lg flex flex-col items-center hover:bg-halfords-orange-500">
        <div class="w-56 h-36 bg-white border border-black flex items-center justify-center">
          <img src="/Images/Search.png" alt="search" class="w-full h-full object-contain" />
        </div>
        <p class="mt-4 font-bold text-black">Search</p>
      </RouterLink>

      <RouterLink to="/tool-type"
        class="bg-halfords-orange-400 w-72 h-72 p-6 rounded-lg flex flex-col items-center hover:bg-halfords-orange-500">
        <div class="w-56 h-36 bg-white border border-black flex items-center justify-center">
          <img src="/Images/ToolTypes.jpg" alt="tool-type" class="w-full h-full object-contain" />
        </div>
        <p class="mt-4 font-bold text-black">Tool Type</p>
      </RouterLink>

      <RouterLink to="/tool-boxes"
        class="bg-halfords-orange-400 w-72 h-72 p-6 rounded-lg flex flex-col items-center hover:bg-halfords-orange-500">
        <div class="w-56 h-36 bg-white border border-black flex items-center justify-center">
          <img src="/Images/ToolBox.jpg" alt="tool-boxes" class="w-full h-full object-contain" />
        </div>
        <p class="mt-4 font-bold text-black">By Tool Boxes</p>
      </RouterLink>
    </div>
  </main>
</template>
