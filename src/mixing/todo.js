import { ref, onMounted, onBeforeMount } from "vue";

const handelTodos = () => {
  // Data
  const todosArr = ref([]);

  const isDarkTheme = ref("");

  const val = ref(false);

  // Methods

  //Set todo to locaStorage
  const addToLocalSt = () => {
    localStorage.setItem("Todo", JSON.stringify(todosArr.value));
  };

  // Update Todo
  const updateTodo = () => {
    if (localStorage.getItem("Todo")) {
      todosArr.value = JSON.parse(localStorage.getItem("Todo"));
    }
  };

  // Set theme
  const updateTheme = () => {
    val.value = !val.value;
    const theme = val.value ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
    isDarkTheme.value = theme;
    localStorage.setItem("theme", theme);
  };

  // Update Theme
  const getTheme = () => {
    if (localStorage.getItem("theme")) {
      document.documentElement.setAttribute(
        "data-theme",
        localStorage.getItem("theme")
      );
      if (localStorage.getItem("theme") === "dark") {
        val.value = true;
      }
      isDarkTheme.value = localStorage.getItem("theme");
    }
  };

  onMounted(() => {
    updateTodo();
    getTheme();
  });

  return { todosArr, addToLocalSt, isDarkTheme, updateTheme };
};

export default handelTodos;
