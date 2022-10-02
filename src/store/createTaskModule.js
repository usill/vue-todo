
export const taskModule = {
  state: () => ({
    title: '',
    tags: [],
    description: '',
    date: new Date(),
  }),
  getters: {
    
  },
  mutations: {
    setTitle(state, title) {
      state.title = title;
    },
    setTags(state, tags) {
      state.tags = tags;
    },
    setDescription(state, description) {
      state.description = description;
    },
    setDate(state, date) {
      state.date = date;
    },
    
  },
  namespaced: true,
}