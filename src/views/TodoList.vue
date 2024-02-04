<template>
  <v-container class="parent">
    <v-row>
      <!-- Head -->
      <v-col cols="12 d-flex align-center justify-space-between">
        <div
          color-scheme="isDark ? 'dark' : 'light'"
          class="title"
          style="
            font-size: 36px;
            z-index: 1;
            letter-spacing: 10px;
            font-weight: 700;
          "
        >
          TODO
        </div>
        <svg
          style="cursor: pointer; z-index: 1"
          @click="emit"
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
        >
          <path
            v-if="isDarkTheme === 'dark'"
            fill="#FFF"
            fill-rule="evenodd"
            d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"
          />

          <path
            v-else
            fill="#FFF"
            fill-rule="evenodd"
            d="M13 0c.81 0 1.603.074 2.373.216C10.593 1.199 7 5.43 7 10.5 7 16.299 11.701 21 17.5 21c2.996 0 5.7-1.255 7.613-3.268C23.22 22.572 18.51 26 13 26 5.82 26 0 20.18 0 13S5.82 0 13 0z"
          />
        </svg>
      </v-col>

      <!-- Text field -->

      <v-col cols="12 d-flex align-center">
        <v-text-field
          @keydown.enter="addTodo"
          v-model="todosObj.task"
          bg-color="var(--color-ttl)"
          variant="solo"
          prepend-inner-icon="mdi-checkbox-blank-circle-outline"
          label="Create a new todo"
          single-line
          hide-details
        >
          <template v-slot:append-inner>
            <v-fade-transition>
              <v-btn
                v-show="todosObj.task"
                icon="mdi-plus-circle"
                style="color: var(--color-bg-col)"
                variant="text"
                @click="addTodo"
              ></v-btn>
            </v-fade-transition>
          </template>
        </v-text-field>
      </v-col>

      <!-- Todos List -->

      <v-card
        class="todosBox w-100 ma-3 d-flex"
        elevation="4"
        :style="`background: var(--color-bg-col);${
          todosArr.length ? 'height:390px' : 'height: 60px'
        }`"
      >
        <v-col
          v-if="todosArr.length"
          cols="12"
          class="list pa-0"
          style="max-height: 324px"
        >
          <v-scroll-x-transition class="py-0" group tag="v-list">
            <template v-for="todo in filteredItems" :key="todo.id">
              <v-list-item class="py-3">
                <template v-slot:prepend>
                  <v-checkbox-btn
                    @click.prevent="endTodo(todo)"
                    v-model="todo.status"
                    style="color: #c2c2c2"
                  ></v-checkbox-btn>
                </template>

                <v-list-item-title>
                  <span
                    class="pl-4"
                    style="font-size: 20px; color: var(--color-ttl)"
                    :style="`${
                      todo.status ? 'text-decoration: line-through' : ''
                    }`"
                  >
                    {{ todo.task }}
                  </span>
                </v-list-item-title>

                <template v-slot:append>
                  <v-icon
                    style="color: aliceblue"
                    @click.prevent="deleteTodo(todo.id)"
                    >mdi-close</v-icon
                  >
                </template>
              </v-list-item>

              <v-divider style="color: var(--color-ttl)"></v-divider>
            </template>
          </v-scroll-x-transition>
        </v-col>

        <!-- Footer -->

        <v-card
          style="position: absolute; bottom: 0; left: 0; width: 100%"
          elevation="0"
          rounded="0"
          color="var(--color-bg-col)"
          class="py-4 d-flex align-center justify-space-around"
        >
          <div style="color: var(--color-txt)">
            <span>{{ todosArr.length }}</span> items left
          </div>

          <div style="color: var(--color-txt)" class="sortBy">
            <label style="cursor: pointer">
              <input
                type="radio"
                name="show"
                value="All"
                checked
                @change="filter"
              />
              <span>All</span>
            </label>

            <label style="cursor: pointer" class="px-3">
              <input type="radio" name="show" value="Active" @change="filter" />
              <span>Active</span>
            </label>

            <label style="cursor: pointer">
              <input
                type="radio"
                name="show"
                value="Completed"
                @change="filter"
              />
              <span>Completed</span>
            </label>
          </div>

          <div @click="clear" style="color: var(--color-txt); cursor: pointer">
            Clear Completed
          </div>
        </v-card>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
// |-----> Imports <-----|

import { ref, watch, defineEmits } from "vue";

import todoList from "../mixing/todo";

const { todosArr, addToLocalSt, isDarkTheme, updateTheme } = todoList();

const radioFilter = ref("");

// |-----> Emit <-----|

const Emit = defineEmits(["HandelTheme"]);

const emit = () => {
  updateTheme();

  Emit("HandelTheme", isDarkTheme.value);
};

// |-----> Object <-----|

const todosObj = ref({
  id: "",
  task: null,
  status: "",
});

// |-----> Methods <-----|

// Add Todo
const addTodo = () => {
  if (todosObj.value.task != null) {
    todosObj.value.id = todosArr.value.length + 1;

    todosObj.value.status = false;

    todosArr.value.push(todosObj.value);

    addToLocalSt();

    todosObj.value = {
      task: null,
    };
  }
};

//--Delete Todo from mainArray
const delTodoArr = (id) => {
  todosArr.value.forEach((ele) => {
    ele.id === id ? todosArr.value.splice(todosArr.value.indexOf(ele), 1) : "";
  });
};

//--Delete Todo from filteredArray
const deleteTodo = (id) => {
  if (radioFilter.value === "Active" || radioFilter.value === "Completed") {
    filteredItems.value.forEach((ele) => {
      ele.id === id
        ? filteredItems.value.splice(filteredItems.value.indexOf(ele), 1)
        : "";
    });

    delTodoArr(id);
  } else {
    delTodoArr(id);
  }

  addToLocalSt();
};

//--Fertig Todo
const endTodo = (task) => {
  task.status = !task.status;

  updateFilteredItems();

  addToLocalSt();
};

//--Save Value
const filter = (e) => {
  radioFilter.value = e.target.value;
};

//--Filtered Items
const filteredItems = ref(todosArr.value);

const updateFilteredItems = () => {
  switch (radioFilter.value) {
    case "Active":
      filteredItems.value = todosArr.value.filter((el) => el.status === false);
      break;
    case "Completed":
      filteredItems.value = todosArr.value.filter((el) => el.status === true);
      break;
    default:
      filteredItems.value = todosArr.value;
  }
};

watch([todosArr, radioFilter], updateFilteredItems, {
  immediate: true,
});

//--Clear Completed

const clear = () => {
  for (let i = 0; i <= todosArr.value.length; i++) {
    todosArr.value.forEach((el) =>
      el.status === true
        ? todosArr.value.splice(todosArr.value.indexOf(el), 1)
        : ""
    );
    updateFilteredItems();
    addToLocalSt();
  }
};
</script>

<style scoped>
.title {
  color: var(--color-ttl);
}
.parent {
  width: 600px;
  padding-top: 90px;
}
.parent >>> .v-card__underlay {
  display: none;
}
.c1:hover {
  cursor: pointer;
  color: #1ba0ff;
}
.c2:hover {
  cursor: pointer;
  color: #1ba0ff;
}
.c3:hover {
  cursor: pointer;
  color: #1ba0ff;
}
.list {
  overflow-y: scroll;
}
.list::-webkit-scrollbar {
  width: 4px;
}
.list::-webkit-scrollbar-track {
  background-color: #a9a9a9;
}
.list::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px var(--color-bg-col);
}
</style>
