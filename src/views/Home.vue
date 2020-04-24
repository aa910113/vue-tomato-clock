<template>
<div class="timer d-flex flex-column align-items-center justify-content-around">
  <div class="d-flex justify-content-between align-items-center w-100 mt-5">
    <label class="d-flex align-items-center addTitle">
      <input class="bg-transparent enterTitle" type="text" placeholder="Add a new mission..."
        v-model="title"
        @keyup.enter="addTltle">
      <span class="material-icons" @click="addTltle">
        add
      </span>
    </label>
    <div class="round_frame rounded-circle">
      <ul>
        <li class="h1">{{ firstList }}</li>
        <li class="display-1">{{ minute }}:{{ second }}</li>
        <li class="btns">
          <button v-if="volume" @click="updateSound('on')">
            <img src="../assets/alarm on.png" alt="開聲音">
          </button>
          <button v-else @click="updateSound('off')">
            <img src="../assets/alarm off.png" alt="關聲音">
          </button>
          <button v-if="!start" @click="startCountdown">
            <img src="../assets/play.png" alt="開始" >
          </button>
          <button  v-else @click="pauseCountdown">
            <img src="../assets/pause.png" alt="暫停">
          </button>
          <button>
            <img src="../assets/skip.png" alt="下一項" @click="nextItem">
          </button>
        </li>
      </ul>
    </div>
    <Menu/>
  </div>
  <p class="next m-0 h4">Next : {{ nextList }}</p>
  <audio id="audio1">
    <source id="s"
      src="http://grandvincent-marion.fr/img-codePen/kygo-stole-the-show.mp3"
      type="audio/mp3"  title="Stole the show" />
  </audio>
</div>
</template>

<script>
// @ is an alias to /src
import Menu from '@/components/Menu.vue';

export default {
  name: 'Home',
  components: {
    Menu,
  },
  data() {
    return {
      title: '',
      start: false,
      pause: false,
      timer: null,
      resting: false,
      volume: true,

    };
  },
  computed: {
    firstList() {
      if (this.undone[0] === undefined) {
        return '';
      }
      return this.undone[0].title;
    },
    nextList() {
      if (this.undone[1] === undefined) {
        return '';
      }
      return this.undone[1].title;
    },
    minute() {
      return this.$store.state.minute;
    },
    second() {
      return this.$store.state.second;
    },
    breakTime_minute() {
      return this.$store.state.breakTime_minute;
    },
    breakTime_second() {
      return this.$store.state.breakTime_second;
    },
    undone() {
      const arr = this.$store.state.list.filter((item) => item.status === false);
      return arr;
    },

  },
  methods: {
    addTltle() {
      const value = this.title.trim();
      if (!value) {
        return;
      }
      const a = {
        title: value,
        status: false,
      };
      this.$store.commit('addList', a);
      this.title = '';
    },
    startCountdown() {
      this.start = true;
      const a = parseInt(this.minute, 10);
      const b = parseInt(this.second, 10);
      this.timer = setTimeout(this.startCountdown, 1000);
      if (b === 0) {
        this.$store.commit('updatesecond', '60');
        this.$store.commit('updateminute', a - 1);
      }
      this.$store.commit('updatesecond', this.$store.state.second - 1);
      if (this.minute.toString().length === 1) {
        this.$store.commit('updateminute', `0${this.minute}`);
      }
      if (this.second.toString().length === 1) {
        this.$store.commit('updatesecond', `0${this.second}`);
      }
      if (a === 0 && b === 0) {
        this.start = false;
        const audio = document.getElementById('audio1');
        this.$store.commit('updateminute', '25');
        this.$store.commit('updatesecond', '00');
        this.$store.commit('updateStatus', this.firstList);
        audio.play();
        // clearTimeout(this.timer);
      }
      if (this.firstList === '休息一下' && a === 0 && b === 0) {
        clearTimeout(this.timer);
      }
    },
    pauseCountdown() {
      this.start = false;
      if (this.timer) {
        clearTimeout(this.timer);
      }
    },
    updateSound(sound) {
      this.volume = !this.volume;
      const audio = document.getElementById('audio1');
      if (sound === 'on') {
        audio.muted = true;
      } else {
        audio.muted = false;
      }
    },
    nextItem() {
      this.start = false;
      this.$store.commit('updateminute', '25');
      this.$store.commit('updatesecond', '00');
      this.$store.commit('updateStatus', this.firstList);
      clearTimeout(this.timer);
    },
  },
};
</script>

<style lang="scss">
.timer{
  height: 98%;
  transition: 1s;
}
.addTitle{
  margin-left: 3%;
  z-index: 1;
  color: #F2F0C9;
  border-bottom: 1px solid #F2F0C9;
  padding-left: 8px;
}
.enterTitle{
  border: 0;
}
.enterTitle::-webkit-input-placeholder { color: #F2F0C9; }
.round_frame{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid rgba(242, 240, 201, 0.377);
  height: 635.35px;
  width: 635.35px;
  margin-right: 12%;
  ul{
    margin: 0;
    padding: 0;
    height: 100%;
    list-style: none;
    color: #F2F0C9;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
}
.btns{
  display: flex;
  justify-content: space-between;
  height: 10%;
  width: 70%;
  button{
    background-color: transparent;
    border: 1px solid #F2F0C9;
    border-radius: 50px;
    height: 50px;
    width: 50px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.next{
  color: #F2F0C9;
}
</style>
