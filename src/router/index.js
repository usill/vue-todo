import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../pages/TaskList.vue'
import TaskCreate from '../pages/TaskCreate.vue'
import Task from '../pages/Task.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: TaskList,
    },
    {
      path: '/create',
      name: 'create',
      component: TaskCreate,
    },
    {
      path: '/task/:id',
      name: 'task',
      component: Task,
      props: true,
    }
  ]
})

export default router
