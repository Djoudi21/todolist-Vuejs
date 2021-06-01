<template>
    <div class="footer">
        <div class="tasks">
            <div v-if="undone.length < 2">{{undone.length}} tache a faire</div>
            <div v-else>{{undone.length}} taches a faire</div>
        </div>
        <ul class="filters">
            <li><a 
                href="#" 
                :class="{selected: getFilter === 'All'}" 
                :value="All" 
                @click.prevent="handleClickAllFilter"
                >All</a>
            </li>
            <li><a 
                href="#" 
                :class="{selected: getFilter === 'Done'}" 
                :value="Done" 
                @click.prevent="handleClickDoneFilter"
                >Done</a>
            </li>
            <li><a 
                href="#" 
                :class="{selected: getFilter === 'Undone'}" 
                :value="Undone" 
                @click.prevent="handleClickUndoneFilter"
                >Undone</a>
            </li>
        </ul>
    </div>
</template>

<script>

    import { mapActions, mapGetters } from 'vuex'

    export default {
        name: "Footer",
        components: {},
        computed: {
            ...mapGetters({
                getFilter: 'todos/getFilter',
                done: 'todos/getTodosDone',
                undone: 'todos/getTodosUndone'
            })
        },
        methods: {
            handleClickDoneFilter() {
                this.$store.dispatch('todos/setFilterToDone')
            },

            handleClickUndoneFilter() {
                this.$store.dispatch('todos/setFilterToUndone')
            },
            
            handleClickAllFilter() {
                this.$store.dispatch('todos/setFilterToAll')
            },

            // emitGetTodos() {
            //     // this.getFilter = "all"
            //     console.log('EMIT GET TODOS')
            //     this.$emit('getTodos')
            // },
            // emitGetTodosDone() {
            //     // this.getFilter = "done"
            //     console.log('EMIT GET DONE')
            //     this.$emit('getTodosDone')
            // },
            // emitGetTodosUndone() {
            //     // this.getFilter = "undone"
            //     console.log('EMIT GET UNDONE')
            //     this.$emit('getTodosUndone')
            // }
        }
        
    }

</script>



<style scoped>

    .filters {
        margin: 0;
        padding: 0;
        list-style: none;
        position: absolute;
        right: 0;
        left: 0;
    }

    .filters li {
        display: inline;
    }

    .filters li a {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
    }

    .filters li a:hover {
        border-color: rgba(175, 47, 47, 0.1);
    }

    .selected {
        border-color: rgba(175, 47, 47, 0.2);
    }

    .footer {
        color: #777;
        height: 70px;
        text-align: center;
        border-top: 1px solid #e6e6e6;
    }

    .footer a:hover {
        color: lightgray;
    }

    .tasks {
        width: 30%;
        margin: 10px;
    }

</style>