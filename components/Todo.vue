<template>
    <ul class="todo-list">
        <li 
            class="todo" 
            :class="{editing: todo === editing}"
        >
            <div class="todo-action">
                <div  
                    class="todo-input" 
                    v-if="done"
                >
                    <input 
                        type="checkbox" 
                        @change="setTodoIsDone(todo)" 
                        checked 
                    />
                </div>
                <div  
                    class="todo-input-checked" 
                    v-else
                >
                    <input 
                        type="checkbox" 
                        @change="setTodoIsDone(todo)" 
                    />
                </div>
            </div>
            <div v-if="editing && this.done === false">
                <input 
                    class="new-todo" 
                    type="text" 
                    v-model="newContent"
                    @keydown.enter="setTodoContent({todo, newContent})"
                    @keyup.enter="handleEscape()"
                    @keyup.esc="handleEscape()"
                />
            </div>
            <div v-else>
                <label 
                    :class="{completed: todo.done}"
                    @dblclick="handleDbclick()"
                >
                    {{todo.content}}
                </label>
            </div>
            <div class="delete-btn">
                <img 
                    @click="deleteTodo(todo.id)" 
                    src="https://img.icons8.com/offices/25/000000/delete-sign.png"
                />
            </div>
        </li>
    </ul>
</template>


<script>
    import { mapActions, mapGetters } from 'vuex'

    export default {
        
        //Name of the component
        name: "Todo",

        //Props of the compoennt (todo obj) passed from the parent compoennt which is Todos
        props: ["todo"],

        //Local state of the component
        data() {
            return {
                done: this.todo.done,
                clicked: false,
                editing: false,
                content: this.todo.content,
                newContent: ""
            }
        },

        methods: {
            //Call the actions from the store and make them available inside the component
            ...mapActions({
                deleteTodo: 'todos/deleteTodo',
                setTodoIsDone: 'todos/setTodoIsDone',
                setTodoContent: 'todos/setTodoContent'
            }),

            //Get editing mode to show the input that allows to update the content
            handleDbclick() {
                this.editing = true
            },

            //Reset editing to false to quit the editing mode of the input
            handleEscape() {
                this.editing = false
            }
        }
    }
</script>


<style scoped>
    .todo-list {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .todo-list li {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }
    
    .completed {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    .todo {
        display: flex;
        align-items: baseline;
        justify-content: space-between;
    }

    .todo-action {
        display: flex;
    }

    .todo label {
        padding: 19px
    }

    .todo button {
        padding: 20px
    }

    .todo-input {
        opacity: 1;
        padding: 20px
    }

    .todo-input-checked {
        opacity: 0.3;
        padding: 20px
    }

    .todo-list li.editing {
        border-bottom: none;
        padding: 0;
    }

    .todo-list li.editing .edit {
        display: block;
        width: 506px;
        padding: 12px 16px;
        margin: 0 0 0 43px;
    }

    .todo-list li.editing .view {
        display: none;
    }

    .delete-btn {
        opacity: 0.1;
        padding-right: 12px;
        padding-top: 12px;
    }

    .delete-btn:hover {
        opacity: 1;
        cursor: pointer;
        padding-right: 12px;
        padding-top: 12px;
    }

    .new-todo {
        padding: 16px 16px 16px 60px;
        border: 1px solid blue;
        background: rgba(0, 0, 0, 0.003);
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
        }
</style>