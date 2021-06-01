<template>
    <div>
        <Todo  
            v-for="todo in filteredTodos" 
            :key="todo.id" 
            :todo="todo" 
        />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Todo from './Todo'
    
    export default {
        name: "Todos",
        components: { Todo },
        computed: {
            ...mapGetters({
                todos: 'todos/getTodos',
                getDone: 'todos/getTodosDone',
                getUndone: 'todos/getTodosUndone',
                filtered: 'todos/getFilter'
            }),

            filteredTodos() {
                if(this.filtered === "Undone") {
                    return this.getUndone
                } else if (this.filtered === "Done") {
                    return this.getDone
                } else {
                    return this.todos
                }
            }
        },
        methods: {},
        created() {
            //dispatch action
            this.$store.dispatch('todos/fetchTodos')
        },
        data() {
            return {}
        }
    }
</script>


<style src="./todos.css"></style>