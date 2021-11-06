<template>
<w-app id="app">
<header>Todo App</header>

<w-flex grow>
    <aside>
      <div class="todoBadge">
        <w-badge>
        <template #badge>{{countOpenTodos}}</template>
        <w-button color="primary">
          <w-icon class="mr1">mdi mdi-check-circle-outline</w-icon>
          Open Todos
        </w-button>
        </w-badge>
      </div>

      <div class="clearAllCompleted">
        <w-button @click="deleteAllCompleted">Delete all completed Todos</w-button>
      </div>
      
        <w-button class="addTodoPlusIcon transition-toggle" @click="addTodoPressed = !addTodoPressed" :style="[addTodoPressed ? {'background-color':'red'} : {'background-color':'green'}]">{{addTodoPressed ? "Close" : "Add Todo"}}</w-button>
        <w-transition-fade>
          <form v-if="addTodoPressed" @submit.prevent="addTodo">
            <div class="name">
              <w-input v-model="newTodoName" type="text" name="todoName" id="todoName">Todo Name:</w-input>
            </div>
            <div class="desc">
              <w-input v-model="newTodoDesc" type="text" name="todoDesc" id="todoDesc">Todo Beschreibung:</w-input>
            </div>
            <w-button id="addTodo" type="submit">Todo speichern</w-button>
          </form>
        </w-transition-fade>
    </aside>
    <main class="grow">
      <div v-for="(todo, index) in todos" v-bind:key="todo.id">
        <div @click="toggleTodo(todo)" :class="{done: todo.done}" class="todo" :style="[todo.done ? {'opacity':'0.5'}: '']">
          <w-card>
            <template #title>
              <w-toolbar>
                  <w-checkbox @click="toggleTodo(todo)" v-model="todo.done" class="mr5"></w-checkbox>
                <div class="title2">{{todo.todoName}}</div>
                <div class="spacer"></div>
                <span @click="removeTodo(index)" class="mdi mdi-close ml2 removeTodo"></span>
              </w-toolbar>
            </template>
            <template #actions>
              <div class="spacer"></div>
              <div class="created">
                <div class="createdAt mr2">erstellt am</div>
                <div class="timeCreated">{{todo.created}}</div>
              </div>
            </template>
            <p class="todoDesc">{{todo.todoDesc}}</p>
          </w-card>
      </div>
      </div>
    </main>
</w-flex>
</w-app>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const newTodoName = ref("");
    const newTodoDesc = ref("");
    const todos = ref([]);
    const addTodoPressed = ref(false);
    const countOpenTodos = computed(() => {
      return todos.value.filter((t) => t.done != true).length;
    });

    function addTodo() {
      var d = new Date();
      var curr_date = d.getDate();
      var curr_month = d.getMonth() + 1; //Months are zero based
      var curr_year = d.getFullYear();
      var minutes = d.getMinutes();
      var hours = d.getHours();
      var time =
        curr_date +
        "." +
        curr_month +
        "." +
        curr_year +
        " " +
        hours +
        ":" +
        minutes +
        " Uhr";

      todos.value.push({
        id: Date.now(),
        done: false,
        todoName: newTodoName.value,
        todoDesc: newTodoDesc.value,
        created: time,
      });
      newTodoName.value = "";
      newTodoDesc.value = "";
    }

    function toggleTodo(todo) {
      todo.done = !todo.done;
    }

    function removeTodo(index) {
      todos.value.splice(index, 1);
    }

    function deleteAllCompleted() {
      todos.value = todos.value.filter((t) => t.done === false);
    }

    return {
      todos,
      newTodoName,
      newTodoDesc,
      addTodo,
      toggleTodo,
      removeTodo,
      deleteAllCompleted,
      addTodoPressed: addTodoPressed,
      countOpenTodos,
    };
  },
};
</script>

<style>
header,
aside,
main {
  margin: 4px;
  padding: 12px;
}

body {
  font-family: sans-serif;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 2em;
  width: 80%;
  margin: 0 auto;
}

.todo {
  width: 40%;
  margin-left: 50px;
  margin-bottom: 15px;
}

.created {
  font-size: 14px;
  opacity: 0.4;
}

.removeTodo {
  cursor: pointer;
}

.todoDesc {
  font-size: 0.5em;
}
</style>
