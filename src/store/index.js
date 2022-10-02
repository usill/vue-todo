import { createStore } from 'vuex';
import { taskModule } from './createTaskModule.js';
import { listModule } from './listModule.js';

export default createStore({
  modules: {
    task: taskModule,
    list: listModule,
  }
})