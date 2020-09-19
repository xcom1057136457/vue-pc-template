<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "./assets/styles/commen.scss";
html,
body,
#app {
  height: 100%;
  font-family: "appleFont" !important;
}

@font-face {
  font-family: "appleFont";
  src: url("./assets/font/PingFang.ttf");
  font-weight: normal;
  font-style: normal;
}
</style>
