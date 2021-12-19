<template>
  <div class="row px-5 mb-2">
          <div class="col-5">
            <div class="todoBadge">
              <button type="button" class="btn btn-primary">
                <i class="mdi mdi-check-circle-outline"></i>
                Open Todos
                <span class="badge badge-secondary">{{ countOpenTodos }}</span>
              </button>
            </div>
          </div>
          <div class="col-5">
            <div class="clearAllCompleted">
              <button
                type="button"
                class="btn btn-primary"
                v-show="isCompletedTodos"
                @click="deleteAllCompleted"
              >
                Delete all completed Todos
              </button>
            </div>
          </div>
        </div>
</template>

<script>
import { computed, inject } from "vue";
const baseUrl = "http://localhost:3001/todos/";
import axios from "axios";
export default {
  setup() {
    const store = inject("store");
    const countOpenTodos = computed(() => {
      return store.state.testTodos.filter((t) => t.done != true).length;
    });
    const isCompletedTodos = computed(() => {
      var bool = false;
      if (store.state.testTodos.filter((t) => t.done === true).length > 0) {
        bool = true;
      }
      return bool;
    });

    const deleteAllCompleted = function () {
      var completeTodos = store.state.testTodos.filter((t) => t.done === true);
      completeTodos.forEach((todo) => {
        axios.delete(baseUrl + todo.id).then(() => {
          store.state.testTodos = store.state.testTodos.filter(
            (todo) =>
              !completeTodos.some(
                (completedTodo) => todo.id === completedTodo.id
              )
          );
        });
      });
    };
    return {
      countOpenTodos,
      isCompletedTodos,
      deleteAllCompleted,
      store,
    };
  },
};
</script>

<style>
</style>