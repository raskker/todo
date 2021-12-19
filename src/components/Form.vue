<template>
    <div class="col-3 mt-5">
        <div class="m-2">
          <label for="todoName">Todo name</label>
          <input @input="($event) => $emit('input-name', $event.target.value)"
            :value="testName"
            type="text"
            name="todoName"
            id="todoName"
            class="form-control"
            required>
        </div>
        <div class="m-2">
          <label for="todoDesc">Todo Beschreibung</label>
          <input  @input="($event) => $emit('input-desc', $event.target.value)"
            :value="testDesc"
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
          @click="this.$parent.addTodo"
        >
          Todo speichern
        </button>
      </div>
</template>

<script>
export default {
  name: "Form",
  props: {
    testName: String,
    testDesc: String,
  },
};
</script>

<style>
</style>