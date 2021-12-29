<template>
  <div v-if="searchedTodos.length <= 0" class="noTodosFound m-5">
    <p >Keine Todos gefunden!</p>
  </div>
  <div v-for="todo in searchedTodos" v-bind:key="todo.id">
    <div
      @click="toggleTodo(todo)"
      :class="{ done: todo.done }"
      class="card todo"
      :style="[todo.done ? { opacity: '0.5' } : '']"
    >
      <div class="card-header">
        <div class="row">
          <div class="col-1">
            <input
              :value="todo.done"
              type="checkbox"
              class="form-check-input"
              v-model="todo.done"
            />
          </div>
          <div class="col-10">
            <div v-if="!todo.edit" class="title2">
              {{ todo.todoName }}
            </div>
            <input
              @click.stop
              v-if="todo.edit"
              v-model="todo.todoName"
              outline
              class="form-control"
            />
          </div>
          <div class="col-1">
            <span
              @click.stop="removeTodo(todo.id)"
              class="mdi mdi-close ml2 removeTodo"
            ></span>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="card-text">
          <div class="row">
            <div class="col-12 mb-3">
              <p v-if="!todo.edit" class="todoDesc">
                {{ todo.todoDesc }}
              </p>
              <input
                @click.stop
                v-if="todo.edit"
                v-model="todo.todoDesc"
                outline
                class="form-control"
              />
            </div>
            <div class="col-9">
              <button
                type="button"
                :disabled="todo.done"
                class="btn btn-primary"
                @click.stop="editTodo(todo)"
                title="Todo bearbeiten"
              >
                <i v-if="!todo.edit" class="mdi mdi-file-document-edit"></i
                ><span v-if="todo.edit">Speichern</span>
              </button>
            </div>
            <div class="col-3">
              <div class="created">
                <div class="createdAt mr2">erstellt am</div>
                <div class="timeCreated">{{ todo.created }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const baseUrl = "http://localhost:3001/todos/";
import { inject } from "vue";
import axios from "axios";
export default {
  props: {
    searchedTodos: Object,
  },
  data() {
    return {
      drag: false,
    };
  },

  setup() {
    const store = inject("store");

    function toggleTodo(todo) {
      todo.done = !todo.done;
      todo.edit = false;
      console.log(baseUrl);
      axios.put(baseUrl + todo.id, todo).then(() => {
        console.log(todo);
      });
    }

    function removeTodo(id) {
      axios.delete(baseUrl + id).then(() => {
        store.state.testTodos = store.state.testTodos.filter(
          (t) => t.id !== id
        );
      });
    }

    function editTodo(todo) {
      if (todo.edit === true) {
        todo.edit = false;
        axios.put(baseUrl + todo.id, todo).then(() => {
          console.log(todo);
        });
      } else {
        todo.edit = true;
      }
    }
    return {
      store,
      toggleTodo,
      removeTodo,
      editTodo,
    };
  },
};
</script>

<style>
.todo {
  max-width: 75%;
}
</style>
