<template>
  <main>
    <div class="img" v-for="(item, index) in isDark" :key="index">
      <img v-if="item == 'light'" src="./assets/bg-desktop-light.jpg" alt="" />

      <img v-else src="./assets/bg-desktop-dark.jpg" alt="" />
    </div>
    <!-- <router-view /> -->
    <homeV @-handel-theme="upTheme" />
  </main>
</template>

<script setup>
import homeV from "./views/HomeView.vue";

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

main {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--color-bg);
  transition: all 0.3s;
}
img {
  min-width: 100%;
  position: absolute;
}
</style>
