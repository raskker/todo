<template>
  <div id="app">
    <div class="row mt-4">
      <Form />
      <div class="col-9 mt-1">
        <ButtonToolbar v-model:searchValue="searchValue" />
        <TodoList :searchedTodos="searchedTodos" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, provide, computed } from "vue";
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
  setup() {
    provide("store", store);
    const { todos, load } = getTodos();
    const addTodoPressed = ref(false);
    const searchValue = ref("");

    load();
    const searchedTodos = computed(() => {
      return todos.value.filter((todo) => {
        var bool =
          todo.todoName.match(searchValue.value) ||
          todo.todoDesc.match(searchValue.value);
        return bool;
      });
    });
    store.state.testTodos = todos;

    return {
      todos,
      addTodoPressed: addTodoPressed,
      store,
      searchedTodos,
      searchValue,
    };
  },
};
</script>

<style>
/* body {
  font-family: sans-serif;
  padding-top: 1em;
  padding-bottom: 1em;
  font-size: 2em;
  width: 80%;
} */

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
  cursor: pointer;
}

.headerIcon {
  font-size: 30px;
  margin-right: 5px;
  vertical-align: middle;
}
</style>
