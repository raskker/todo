<template>
  <div id="app">
    <h1>TODO APP</h1>
    <div class="row">
      <Form />
      <div class="col-9 mt-1">
      <ButtonToolbar/>
        <p id="emptyListString" class="m-5" v-if="store.state.testTodos.length <= 0">
          Erstelle ein Todo
        </p>
      <TodoList/>
      </div>

    </div>
  </div>
</template>

<script>
import { ref, provide } from "vue";
import Form from "./components/Form.vue";
import store from "@/store";
import getTodos from "./composables/getTodos";
import ButtonToolbar from "./components/ButtonToolbar.vue";
import TodoList from "./components/TodoList.vue";
export default {
  components: {
    // draggable,
    Form,
    ButtonToolbar,
    TodoList,
  },
  data() {
    return {
      drag: false,
    };
  },
  setup() {
    provide("store", store);
    const { todos, load } = getTodos();
    const addTodoPressed = ref(false);

    load();

    store.state.testTodos = todos;

    return {
      todos,
      addTodoPressed: addTodoPressed,
      store,
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
  width: 100%;
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
  font-size: 20px;
}

/*TEST*/

.button {
  margin-top: 35px;
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #feffff;
}

.card {
  cursor: move;
}
.card i {
  cursor: pointer;
}
</style>
