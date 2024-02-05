<template>
  <main>
    <transition-group name="fade" tag="div">
      <div class="fade-in-image" v-for="(item, index) in isDark" :key="index">
        <img
          v-if="item == 'light' && screenWidth > 599"
          key="light"
          src="./assets/bg-desktop-light.jpg"
        />
        <img
          v-else-if="item == 'dark' && screenWidth > 599"
          src="./assets/bg-desktop-dark.jpg"
        />

        <img
          v-if="item == 'light' && screenWidth <= 599"
          key="light"
          src="./assets/bg-mobile-light.jpg"
        />
        <img
          v-else-if="item == 'dark' && screenWidth <= 599"
          src="./assets/bg-mobile-dark.jpg"
        />      </div>
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

const screenWidth = ref(0);

const onScreenResize = () => {
  window.addEventListener("resize", () => {
    updateScreenWidth();
  });
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  isDark.value.push(localStorage.getItem("theme"));

  updateScreenWidth();
  onScreenResize();
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

body {
  background: var(--color-bg);
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.fade-in-image img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
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
