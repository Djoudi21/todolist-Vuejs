//Imports
import { 
        ADD_TODO, 
        FETCH_TODOS, 
        DELETE_TODO, 
        SET_TODOS, 
        SET_FILTER_TO_DONE, 
        SET_FILTER_TO_UNDONE, 
        SET_FILTER_TO_ALL }  from './mutation-types'
import axios from 'axios'

//State initial
export const state = () => ({
    todos: [],
    filter: 'All'
})


//Fonctions donnant accès aux éléments du state depuis les composants 
//en retournant la partie du store a exploiter
export const getters = {
    
    getTodos: (state) => {
        return state.todos
    },

    getTodosDone: (state, getters) => {
        return getters.getTodos.filter(todo => todo.done)
    },

    getTodosUndone: (state, getters) => {
        return getters.getTodos.filter(todo => !todo.done)
    },

    getFilter: (state) => {
        return state.filter
    }

}


//Mutations (fonctions) qui permettent de modifier le state
export const mutations = {

    FETCH_TODOS(state, todos) {
        state.todos = todos
    },

    ADD_TODO(state, todo) {
        state.todos = [todo,...state.todos]
    },

    DELETE_TODO(state, id) {
        state.todos = state.todos.filter(todo => todo.id != id)
    },

    SET_TODOS(state, newTodo) {
        const index = state.todos.findIndex(i => i.id === newTodo.id)
        state.todos.splice(index, 1, newTodo)
    },

    SET_FILTER_TO_DONE(state) {
        state.filter = 'Done'
    },

    SET_FILTER_TO_UNDONE(state) {
        state.filter = 'Undone'
    },

    SET_FILTER_TO_ALL(state) {
        state.filter = 'All'
    }
    
}


//Permet de créer des actions
//prend en parametre la fonction "commit"  qui permet de générer une modictaion du state dans les mutations 
//et prend en parametre le nom de la mutation ainsi que la valeur a renvoyer au mutateur pour modifier le state
export const actions = {

    //Récupération des todos et envoi du tableau récupéré vers le mutateur
    fetchTodos: async ({commit}) => {
        const result = await axios.get('http://localhost:5000/api/v1/todos')
        const todos = result.data
        commit(FETCH_TODOS, todos)
    },

    //Ajout du todo en DB et envoi du todo ajouté  et récupéré depuis le serveur, vers le mutateur
    addTodo: async({commit}, content) => {
        const result = await axios.post('http://localhost:5000/api/v1/todos', {
            content
        })
        const todo = result.data
        commit(ADD_TODO, todo)
    },

    //Suppression du todo et envoi de son id vers le mutateur
    deleteTodo: async({commit}, id) => {
        await axios.delete('http://localhost:5000/api/v1/todos', {
            data: {
                id
            }
        })
        commit(DELETE_TODO, id)
    },

    //Mise a jour de la valeur "done" du todo et envoi du todo mis a jour vers le mutateur
    setTodoIsDone: async ({commit}, todo) => {
        const id = todo.id
        const result = await axios.put(`http://localhost:5000/api/v1/todos/${id}`, {
            data: {
                content: todo.content,
                done: !todo.done
            }
        })
        const newTodo = result.data
        commit(SET_TODOS, newTodo)
    },

    //Mise a jour de la valeur "cpontent" du todo et envoi du todo mis a jour vers le mutateur
    setTodoContent: async ({commit}, {todo, newContent}) => {
        const id = todo.id
        const result = await axios.put(`http://localhost:5000/api/v1/todos/${id}`, {
            data: {
                content: newContent,
                done: todo.done
            }
        })
        const newTodo = result.data
        commit(SET_TODOS, newTodo)
    },

    //Déclenchement de l'action pour modifier la propirété filter a "undone"
    setFilterToUndone: ({commit}) => {
        commit(SET_FILTER_TO_UNDONE)
    },

    //Déclenchement de l'action pour modifier la propirété filter a "done"
    setFilterToDone: ({commit}) => {
        commit(SET_FILTER_TO_DONE)
    },

    //Déclenchement de l'action pour modifier la propirété filter a "all"
    setFilterToAll: ({commit}) => {
        commit(SET_FILTER_TO_ALL)
    }

}