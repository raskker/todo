<template>
<h1>Todo App</h1>
<form @submit.prevent="addTodo">
  <div class="name">
    <label for="todoName">Todo Name: </label>
    <input v-model="newTodoName" type="text" name="todoName" id="todoName"/>
  </div>
  <div class="desc">
    <label for="todoDesc">Todo Beschreibung: </label>
    <input v-model="newTodoDesc" type="text" name="todoDesc" id="todoDesc"/>
  </div>
  <button id="addTodo" type="submit">Neues Todo</button>
</form>
<div v-for="(todo, index) in todos" v-bind:key="todo.id">
  <div @click="toggleTodo(todo)" :class="{done: todo.done}">
    <div>{{todo.todoName}}</div>
    <div>{{todo.todoDesc}}</div>
    <div @click="removeTodo(index)" class="removeTodo">X</div>
  </div>
  
</div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const newTodoName = ref("");
    const newTodoDesc = ref("");
    const todos = ref([]);

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
</style>
