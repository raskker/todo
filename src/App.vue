<template>
  <div id="app">
    <h1>TODO APP</h1>
    <div class="row">
      <div class="col-3 mt-5">
        <div class="m-2">
          <label for="todoName">Todo name</label>
          <input
            v-model="newTodoName"
            type="text"
            name="todoName"
            id="todoName"
            class="form-control"
            required>
        </div>
        <div class="m-2">
          <label for="todoDesc">Todo Beschreibung</label>
          <input
            v-model="newTodoDesc"
            type="text"
            name="todoDesc"
            id="todoDesc"
            class="form-control"
            required
          />
        </div>
        <button
          type="button"
          class="btn btn-primary m-2"
          id="addTodo"
          @click="addTodo"
        >
          Todo speichern
        </button>
      </div>

      <div class="col-9 mt-1">
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
        <p id="emptyListString" class="m-5" v-if="todos.length <= 0">Erstelle ein Todo</p>
        <draggable
          v-model="todos"
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
import { ref, computed } from "vue";
import draggable from "vuedraggable";
import axios from "axios";

const baseUrl = "http://localhost:3001/todos/";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
    };
  },
  async created() {
    try {
      const res = await axios.get(baseUrl);

      this.todos = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  setup() {
    const newTodoName = ref("");
    const newTodoDesc = ref("");
    const todos = ref([]);
    const addTodoPressed = ref(false);
    const countOpenTodos = computed(() => {
      return todos.value.filter((t) => t.done != true).length;
    });
    const isCompletedTodos = computed(() => {
      var bool = false;
      if (todos.value.filter((t) => t.done === true).length > 0) {
        bool = true;
      }
      return bool;
    });

    const dragOptions = computed(() => {
      return {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    });

    function createDate() {
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
      return time;
    }

    async function addTodo() {
      const res = await axios.post(baseUrl, {
        todoName: newTodoName.value,
        todoDesc: newTodoDesc.value,
        created: createDate(),
        edit: false,
        done: false,
      });

      this.todos = [...this.todos, res.data];

      newTodoName.value = "";
      newTodoDesc.value = "";
    }

    function toggleTodo(todo) {
      todo.done = !todo.done;
      todo.edit = false;
      axios.put(baseUrl + todo.id, todo).then(() => {
        console.log(todo);
      });
    }

    function removeTodo(id) {
      axios.delete(baseUrl + id).then(() => {
        this.todos = this.todos.filter((t) => t.id !== id);
      });
    }

    function deleteAllCompleted() {
      var completeTodos = this.todos.filter((t) => t.done === true);
      completeTodos.forEach((todo) => {
        axios.delete(baseUrl + todo.id).then(() => {
          this.todos = this.todos.filter(
            (todo) =>
              !completeTodos.some(
                (completedTodo) => todo.id === completedTodo.id
              )
          );
        });
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
      // todo.edit = !todo.edit;
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
      isCompletedTodos,
      dragOptions,
      editTodo,
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
