<template>
    <div class="col-3">
        <div class="m-2">
          <label for="todoName">Todo name</label>
          <input v-model="todoName"
            type="text"
            name="todoName"
            id="todoName"
            class="form-control"
            required>
        </div>
        <div class="m-2">
          <label for="todoDesc">Todo Beschreibung</label>
          <input  v-model="todoDesc"
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
</template>
<script>
import axios from "axios";
const baseUrl = "http://localhost:3001/todos/";
export default {
  name: "Form",
  data() {
    return {
      todoName: "",
      todoDesc: "",
    };
  },
  methods: {
    async addTodo() {
      const res = await axios.post(baseUrl, {
        todoName: this.todoName,
        todoDesc: this.todoDesc,
        created: this.createDate(),
        edit: false,
        done: false,
      });

      this.$parent.todos = [...this.$parent.todos, res.data];
    },
    createDate() {
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
    },
  },
};
</script>

<style>
</style>