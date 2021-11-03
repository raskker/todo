<template>
<w-app>
<h1>Todo App</h1>

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

<div v-for="(todo, index) in todos" v-bind:key="todo.id">
  <div @click="toggleTodo(todo)" :class="{done: todo.done}">
    <w-card tile>
        <template #title>
          <w-toolbar>
            <div class="title2">{{todo.todoName}}</div>
            <div class="spacer"></div>
            <span @click="removeTodo(index)" class="mdi mdi-close ml2 removeTodo"></span>
          </w-toolbar>
        </template>
        <p class="todoDesc">{{todo.todoDesc}}</p>
    </w-card>
  </div>
  
  <!-- <div @click="toggleTodo(todo)" :class="{done: todo.done}">
    <div>{{todo.todoName}}</div>
    <div>{{todo.todoDesc}}</div>
    <div @click="removeTodo(index)" class="removeTodo">X</div>
  </div> -->
</div>
</w-app>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const newTodoName = ref("");
    const newTodoDesc = ref("");
    const todos = ref([]);
    const addTodoPressed = ref(false);

    function addTodo() {
      todos.value.push({
        id: Date.now(),
        done: false,
        todoName: newTodoName.value,
        todoDesc: newTodoDesc.value,
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

    return {
      todos,
      newTodoName,
      newTodoDesc,
      addTodo,
      toggleTodo,
      removeTodo,
      addTodoPressed: addTodoPressed,
    };
  },
};
</script>

<style>
body {
  font-family: sans-serif;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 2em;
  width: 80%;
  margin: 0 auto;
}

.done {
  text-decoration: line-through;
}

.removeTodo {
  cursor: pointer;
}

.todoDesc {
  font-size: 0.5em;
}
</style>
