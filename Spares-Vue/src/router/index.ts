import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Search from '../views/SearchView.vue'
import ToolType from '../components/ToolTypeCategory.vue'
import ToolBoxes from '../components/ToolBoxCategory.vue'
import Type from '../components/ToolsListByType.vue'
import Box from '../components/ToolsListByBox.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/search',
      name: 'search',
      component: Search,
    },
    {
      path: '/tool-type',
      name: 'tool-type',
      component: ToolType,
    },
    {
      path: '/tool-boxes',
      name: 'tool-boxes',
      component: ToolBoxes,
    },
    {
      path: '/tool-type/:type/',
      name: 'type',
      component: Type,
    },
    {
      path: '/tool-Boxes/:box/',
      name: 'box',
      component: Box,
    },
  ]
})

export default router
