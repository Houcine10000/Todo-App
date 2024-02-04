<template>
  <main>
    <transition-group name="fade" tag="div">
      <div class="fade-in-image" v-for="(item, index) in isDark" :key="index">
        <img
          v-if="item == 'light'"
          key="light"
          src="./assets/bg-desktop-light.jpg"
        />
        <img v-else key="dark" src="./assets/bg-desktop-dark.jpg" />
      </div>
    </transition-group>

    <!-- <router-view /> -->
    <todoList @-handel-theme="upTheme" />
  </main>
</template>

<script setup>
import todoList from "./views/TodoList.vue";

import { ref, onMounted } from "vue";

const isDark = ref([]);

const upTheme = (theme) => {
  isDark.value.push(theme);
};

onMounted(() => {
  isDark.value.push(localStorage.getItem("theme"));
});
</script>

<style>
:root {
  font-family: "Josefin Sans", sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  --color-bg: #fafafa;
  --color-ttl: #e4e5f1;
  --color-txt: #9394a5;
  --color-bg-col: #484b6a;
}

[data-theme="dark"] {
  --color-bg: #1f1f26;
  --color-ttl: #e4e5f1;
  --color-txt: #9394a5;
  --color-bg-col: #25273c;
}

.fade-in-image img {
  min-width: 100%;
  position: absolute;
}

main {
  height: 100vh;
  background-color: var(--color-bg);
  transition: all 0.3s;
}

/* Define the transition classes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
