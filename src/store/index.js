import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
    storeTodos(state, payload){
      state.todos = payload
    }, 
    
    storeTodo(state, payload) {
      const index = state.todos.findIndex(todo => todo.id === payload.id)

      if(index >= 0){
        state.todos.splice(index, 1, payload)
      }else{
        state.todos.unshift(payload) 
      }
    },

    deleteTodo(state, id){
      const index = state.todos.findIndex(todo => todo.id === id)
      if (index >= 0) {
        state.todos.splice(index, 1)
      }
    }
  },
  actions: {
    getTodos({commit}){
      return new Promise((resolve) => {
        setTimeout(()=>{
          return axios.get('http://localhost:3000/todos')
            .then((res) => {
              commit('storeTodos', res.data)
              resolve()
            })
        }, 1000)
      })
    },

    addTodo({ commit }, data){
      return axios.post('http://localhost:3000/todos',data).then((r) =>{
        commit('storeTodo', r.data)
      })
    },

    updateTodo({commit}, {id, data}) {
      return axios.put(`http://localhost:3000/todos/${id}`, data).then((r) => {
        commit('storeTodo', r.data)
      })
    },

    deleteTodo({commit}, id) {
      return axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
        commit('deleteTodo', id)
      })
    },
  },
  modules: {
  }
})
