

export const listModule = {
  state: () => ({
    taskList: [],
    sortedBy: '',
    selectedId: '',
  }),
  getters: {
    sortArray(state) {
      if(state.sortedBy === '') {
        return state.taskList;
      }
      return state.taskList.filter(item => item.status === state.sortedBy)
    },
    findOneTask(state) {
      return state.taskList.filter(item => item.id == state.selectedId)
    }
  },
  mutations: {
    setList(state, list) {
      state.taskList = list;
    },
    setSortedBy(state, sort) {
      state.sortedBy = sort;
    },
    setId(state, id) {
      state.selectedId = id;
    },

  },

  namespaced: true,
}