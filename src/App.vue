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
        <draggable
          v-model="store.state.testTodos"
          class="list-group"
          :component-data="{
            tag: 'div',
            type: 'transition-group',
            name: !drag ? 'flip-list' : null,
          }"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          item-key="id"
        >
          <template #item="{ element }">
            <div
              @click="toggleTodo(element)"
              :class="{ done: element.done }"
              class="card todo"
              :style="[element.done ? { opacity: '0.5' } : '']"
            >
              <div class="card-header">
                <div class="row">
                  <div class="col-1">
                    <input
                      :value="element.done"
                      type="checkbox"
                      class="form-check-input"
                      v-model="element.done"
                    />
                  </div>
                  <div class="col-10">
                    <div v-if="!element.edit" class="title2">
                      {{ element.todoName }}
                    </div>
                    <input
                      @click.stop
                      v-if="element.edit"
                      v-model="element.todoName"
                      outline
                      class="form-control"
                    />
                  </div>
                  <div class="col-1">
                    <span
                      @click.stop="removeTodo(element.id)"
                      class="mdi mdi-close ml2 removeTodo"
                    ></span>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="card-text">
                  <div class="row">
                    <div class="col-12 mb-3">
                      <p v-if="!element.edit" class="todoDesc">
                        {{ element.todoDesc }}
                      </p>
                      <input
                        @click.stop
                        v-if="element.edit"
                        v-model="element.todoDesc"
                        outline
                        class="form-control"
                      />
                    </div>
                    <div class="col-9">
                      <button
                        type="button"
                        :disabled="element.done"
                        class="btn btn-primary"
                        @click.stop="editTodo(element)"
                        title="Todo bearbeiten"
                      >
                        <i class="mdi mdi-file-document-edit"></i
                        ><span v-if="element.edit">Speichern</span>
                      </button>
                    </div>
                    <div class="col-3">
                      <div class="created">
                        <div class="createdAt mr2">erstellt am</div>
                        <div class="timeCreated">{{ element.created }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, provide } from "vue";
import draggable from "vuedraggable";
import axios from "axios";
import Form from "./components/Form.vue";
const baseUrl = "http://localhost:3001/todos/";
import store from "@/store";
import getTodos from "./composables/getTodos";
import ButtonToolbar from "./components/ButtonToolbar.vue";
export default {
  components: {
    draggable,
    Form,
    ButtonToolbar,
  },
  data() {
    return {
      drag: false,
    };
  },
  setup() {
    provide("store", store);
    const { todos, load } = getTodos();
    const newTodoName = ref("");
    const newTodoDesc = ref("");
    const addTodoPressed = ref(false);

    load();

    store.state.testTodos = todos;
    console.log(store.state.testTodos);

    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    });

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
      todos,
      newTodoName,
      newTodoDesc,
      toggleTodo,
      removeTodo,
      addTodoPressed: addTodoPressed,
      dragOptions,
      editTodo,
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
