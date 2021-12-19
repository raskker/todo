import axios from "axios";
import { ref } from "vue";
const baseUrl = "http://localhost:3001/todos/";
const getTodos = () => {
  const todos = ref([]);

  const load = async () => {
    try {
      const res = await axios.get(baseUrl);
      todos.value = res.data;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    todos,
    load,
  };
};

export default getTodos;
