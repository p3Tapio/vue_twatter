export const UserModule = {
  namespaced: true,
  state: {
    user: null
  },
  // functions that effect the state
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    }
  },
  // functions you call throughout your application that call mutations 
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    }
  },
}