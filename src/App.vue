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
        <w-button :disabled="!isCompletedTodos" @click="deleteAllCompleted">Delete all completed Todos</w-button>
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
      
      

        <draggable v-model="todos" class="list-group"
        :component-data="{
          tag: 'div',
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }" 
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="id">
         <template #item="{ element }">
           <div class="list-group-item">
        <div @click="toggleTodo(element)" :class="{done: element.done}" class="todo" :style="[element.done ? {'opacity':'0.5'}: '']">
          <w-card>
            <template #title>
              <w-toolbar>
                  <w-checkbox @click="toggleTodo(element)" v-model="element.done" class="mr5"></w-checkbox>
                <div class="title2">{{element.todoName}}</div>
                <div class="spacer"></div>
                <span @click="removeTodo(element)" class="mdi mdi-close ml2 removeTodo"></span>
              </w-toolbar>
            </template>
            <template #actions>
              <div class="spacer"></div>
              <div class="created">
                <div class="createdAt mr2">erstellt am</div>
                <div class="timeCreated">{{element.created}}</div>
              </div>
            </template>
            <p class="todoDesc">{{element.todoDesc}}</p>
          </w-card>
      </div>
           </div>
         </template>
        </draggable>
    </main>
</w-flex>
</w-app>
</template>

<script>
import { ref, computed } from "vue";
import draggable from "vuedraggable";

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

    function removeTodo(todo) {
      todos.value = todos.value.filter((t) => t !== todo);
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
      isCompletedTodos,
      dragOptions,
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
.list-group {
  min-height: 20px;
}
.list-group-item {
  cursor: move;
}
.list-group-item i {
  cursor: pointer;
}
</style>
