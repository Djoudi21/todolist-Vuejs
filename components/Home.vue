<template>
    <section class="todoapp">
        <header>
            <h1>TODOLIST</h1>
            <input 
                class="new-todo" 
                v-model="content" 
                @keyup.enter="submitTodo(content)" 
            >
        </header>
        <div class="main">
            <Todos/>
            <Footer v-show="hasTodo" />
        </div>
    </section>
</template>


<script>

    import { mapActions, mapGetters } from 'vuex'
    import Todos from "./Todos"
    import Footer from "./Footer"

    export default {
        name: 'Home',
        components: { Todos, Footer },
        data() {
            return {
                title: "",
                content: ""
            }
        },
        computed: {
            ...mapGetters({
                todos: 'todos/getTodos'
            }),
            hasTodo() {
                return this.todos.length > 0
            }
        },
        methods: {
            ...mapActions({
                fetch: 'todos/fetchTodos',
                submitTodo: 'todos/addTodo'
            })
        }
    }
    
</script>

<style scoped>

    .todoapp {
        background: #fff;
        margin: 130px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                    0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }

    .todoapp input::-webkit-input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::-moz-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp input::input-placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
    }

    .todoapp h1 {
        position: absolute;
        padding-top: 25px;
        top: -155px;
        width: 100%;
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
        -webkit-text-rendering: optimizeLegibility;
        -moz-text-rendering: optimizeLegibility;
        text-rendering: optimizeLegibility;
    }

</style>
