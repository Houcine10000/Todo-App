<template>
  <v-container class="parent">
    <v-row>
      <!-- Head -->
      <v-col cols="12 d-flex align-center justify-space-between pb-6">
        <div
          color-scheme="isDark ? 'dark' : 'light'"
          class="title"
          style="font-size: 36px; letter-spacing: 10px; font-weight: 700"
        >
          TODO
        </div>
        <svg
          style="cursor: pointer"
          @click="share"
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
          @keyup.enter="addTodo"
          v-model="todosObj.task"
          bg-color="var(--color-ttl)"
          variant="solo"
          prepend-inner-icon="mdi-checkbox-blank-circle-outline"
          label="Create a new todo"
          single-line
          hide-details
        >
        </v-text-field>
      </v-col>

      <!-- Todos List -->

      <v-card
        class="todosBox w-100 ma-3"
        elevation="4"
        style="background: transparent; max-height: 400px"
      >
        <v-col cols="12" class="pa-0">
          <draggable v-model="filteredItems" item-key="index" tag="v-card">
            <template #item="{ element: todo }">
              <v-card rounded="0" color="var(--color-bg-col)">
                <div
                  class="d-flex align-center justify-space-between px-4 py-3"
                >
                  <div class="d-flex align-center py-3">
                    <input
                      @click="fertigTodo(todo)"
                      :checked="todo.status"
                      type="checkbox"
                      style="width: 20px; height: 20px"
                    />

                    <span
                      class="pl-4"
                      style="font-size: 20px; color: var(--color-ttl)"
                      :style="`${
                        todo.status ? 'text-decoration: line-through' : ''
                      }`"
                    >
                      {{ todo.task }}
                    </span>
                  </div>

                  <v-icon
                    style="color: var(--color-ttl)"
                    @click="deleteTodo(index)"
                    >mdi-close</v-icon
                  >
                </div>

                <v-divider style="color: var(--color-ttl)"> </v-divider>
              </v-card>
            </template>
          </draggable>
        </v-col>

        <!-- Footer -->

        <v-card
          elevation="0"
          rounded="0"
          color="var(--color-bg-col)"
          class="py-3 d-flex align-center justify-space-around"
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

import draggable from "vuedraggable";

const { todosArr, addToLocalSt, isDarkTheme, updateTheme } = todoList();

const radioFilter = ref("");

const Emit = defineEmits(["HandelTheme"]);

const share = () => {
  updateTheme();

  Emit("HandelTheme", isDarkTheme.value);
};
// |-----> Object <-----|

const todosObj = ref({
  id: "",
  task: "",
  status: "",
});

// |-----> Methods <-----|

// Add Todo
const addTodo = () => {
  if (todosObj.value.task != "") {
    todosObj.value.id = todosArr.value.length + 1;

    todosObj.value.status = false;

    todosArr.value.push(todosObj.value);

    addToLocalSt();

    todosObj.value = {
      task: "",
    };
  }
};

//--Delete Todo
const deleteTodo = (index) => {
  todosArr.value.splice(index, 1);

  addToLocalSt();
};

//--Fertig Todo
const fertigTodo = (todo) => {
  todo.status = !todo.status;
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

watch([todosArr, radioFilter], updateFilteredItems, { immediate: true });

//--Clear Completed
const clear = () => {
  for (let i = 0; i <= todosArr.value.length; i++) {
    todosArr.value.forEach((el) => {
      if (el.status === true) {
        todosArr.value.splice(todosArr.value.indexOf(el), 1);
      }
    });
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
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -55%);
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
.todosBox {
  overflow-y: scroll;
}
.todosBox::-webkit-scrollbar {
  width: 4px;
}
.todosBox::-webkit-scrollbar-track {
  background-color: #a9a9a9;
}
.todosBox::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 6px var(--color-bg-col);
}
</style>
