import { createStore } from 'vuex';
import { UserModule } from './user';

export default createStore({
  state: {},
  // functions that effect the state
  mutations: {},
  // functions you call throughout your application that call mutations 
  actions: {},
  modules: {
    User: UserModule
  }
})
