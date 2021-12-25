<template>
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
</template>

<script>
const baseUrl = "http://localhost:3001/todos/";
import { computed, inject } from "vue";
import draggable from "vuedraggable";
import axios from "axios";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      drag: false,
    };
  },

  setup() {
    const store = inject("store");
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
      store,
      toggleTodo,
      removeTodo,
      dragOptions,
      editTodo,
    };
  },
};
</script>

<style></style>
