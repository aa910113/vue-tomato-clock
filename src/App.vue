<template>
<div id="app" class="container-fluid p-5">
  <div class="rounded-circle round-frame-left"></div>
  <div class="rounded-circle round-frame-right show" :class="{'amplification' :menu}"></div>
  <header class="d-flex justify-content-between">
    <div class="logo_slogan">
      <img alt="logo" src="@/assets/logo.png">
      <p class="my-0 ml-3 py-2 pl-3 border-left">To - Do - List Alarm System</p>
    </div>
    <a href="#" @click="updatemenu">
      <img src="./assets/navList.png" alt="" v-if="!menu">
      <img src="./assets/clear.png" alt="" v-if="menu">
      <!-- <span class="material-icons h1 menu-icon" v-if="!menu">
        sort
      </span>
      <span class="material-icons h1 menu-icon" v-if="menu">
        clear
      </span> -->
    </a>
  </header>
  <router-view :class="{'slide-left' : menu}"/>
</div>
</template>

<script>


export default {
  data() {
    return {
    };
  },
  computed: {
    menu() {
      return this.$store.state.menu;
    },
  },
  methods: {
    updatemenu() {
      let status = this.menu;
      status = !status;
      this.$store.commit('updatemenu', status);
    },
  },
};
</script>

<style lang="scss">
body{
  background-color: #BC2B35 !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  height: 100vh;
  position: relative;
  overflow:hidden;
}
.logo_slogan {
  color:#F2F0C9;
  display: flex;
  align-items: center;
  font-size: 14px;
  width: 350px;
  img{
    width: 40%;
  }
}
.round-frame-left,
.round-frame-right{
  background: linear-gradient(#BC2B35,#D9343F);
  height: 73%;
  width: 33%;
  position: absolute;
  top: 18%;
}
.round-frame-left{
  left: -18%;
}
.round-frame-right{
  right: -18%;
  transition: 1s;
}
.amplification{
  transition: 1s;
  transform:scale(1.8);
}
.material-icons{
  color:#F2F0C9;
}
.menu-icon{
  transform:scaleX(-1);
}
.slide-left{
  transition: 1s;
  transform:translateX(-25.5%);
}
.show{
  z-index: -1;
}
</style>
