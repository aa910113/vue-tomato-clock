<template>
<div class="row position-relative">
  <div class="col-3">
    <div class="nav flex-column nav-pills" id="v-pills-tab"
    role="tablist" aria-orientation="vertical">
      <a
        class="list-icon my-3 active"
        id="home-tab"
        data-toggle="tab"
        href="#home" role="tab"
        aria-controls="home"
        aria-selected="true"
        @click="updatemenu('menu')"
        >
        <img src="../assets/list.png" alt="" style="width:25px" v-if="!menu">
        <img src="../assets/list-1.png" alt="" style="width:25px" v-else>
      </a>
      <a
        class="list-icon my-3"
        id="profile-tab"
        data-toggle="tab"
        href="#profile" role="tab"
        aria-controls="profile"
        aria-selected="false"
        @click="updatemenu('chart')"
        :class="{'bgColor' :chart}"
        >
        <img src="../assets/chart.png" alt="" style="width:25px" v-if="!chart">
        <img src="../assets/chart-1.png" alt="" style="width:25px" v-else>
      </a>
      <a
        class="list-icon my-3"
        id="messages-tab"
        data-toggle="tab"
        href="#messages" role="tab"
        aria-controls="messages"
        aria-selected="false"
        @click="updatemenu('setting')"
        :class="{'bgColor' :setting}"
        >
        <img src="../assets/setting.png" alt="" style="width:25px" v-if="!setting">
        <img src="../assets/setting-1.png" alt="" style="width:25px" v-else>
      </a>
    </div>
  </div>
  <div class="position-absolute menu-content">
    <div class="tab-content h-100" id="tabContent">
      <div class="tab-pane fade show h-100 active" id="home"
        role="tabpanel" aria-labelledby="home-tab">
        <label class="d-flex align-items-center new-item-box p-1 pl-3">
          <input
            class="new-item w-100"
            type="text"
            placeholder="Add a new mission..."
            v-model="title"
            @keyup.enter="addTltle"
            >
          <span class="material-icons" @click="addTltle">
            add
          </span>
        </label>
        <div class="card">
          <div class="card-header">
          </div>
          <div class="card-body h-100">
            <div
              class="d-flex align-items-center mb-2"
              v-for="(item, index) in list"
              :key="index"
              >
              <img
                class="mr-2"
                v-if="item.status"
                @click="item.status=!item.status"
                style="width:30px"
                src="../assets/check.png" alt="">
              <img
                class="fine-tuning"
                v-else
                @click="item.status=!item.status"
                src="../assets/Ellipse 13.png" alt="">
                <blockquote class="blockquote mb-0 w-100">
                <p class="m-1">{{ item.title }}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="profile"
        role="tabpanel" aria-labelledby="profile-tab">
        <img class="h-100 w-100 mt-5 pt-3" src="../assets/analyze.svg" alt="">
        </div>
      <div class="tab-pane fade h-100" id="messages"
        role="tabpanel" aria-labelledby="messages-tab">
        <div class="media d-flex flex-column justify-content-between h-100">
          <div class="media-body w-100">
            <h3 class="mt-0">Time Setting</h3>
            <div class="media mt-4 pl-4 d-flex flex-column">
              <div class="media-body d-flex align-items-center dottedLine mb-4 w-100">
                <h5 class="mt-0">Working time</h5>
                <select class="custom-select ml-auto"
                :value="parseInt(minute)" @change="changeMinute">
                  <option
                    v-for="item in 60"
                    :key="item - 1"
                    :value="item - 1"
                    >{{ item - 1 }}
                    </option>
                </select>
                <label for=""></label>
                <span class="mr-2">min</span>
                <img class="mr-2" src="../assets/down key.png" alt="選擇鍵">
              </div>
               <div class="media-body d-flex align-items-center dottedLine mb-4 w-100">
                <h5 class="mt-0">Resting time</h5>
                <select class="custom-select ml-auto"
                :value="parseInt(second)" @change="changeSecond">
                  <option
                    v-for="item in 60"
                    :key="item - 1"
                    :value="item -1"
                    >{{ item - 1 }}
                    </option>
                </select>
                <span class="mr-2">min</span>
                <img class="mr-2" src="../assets/down key.png" alt="選擇鍵">
              </div>
            </div>
          </div>
          <div class="media-body w-100">
            <h3 class="mt-0">Alarm</h3>
            <div class="media mt-4 pl-4 d-flex flex-column">
              <div class="media-body d-flex align-items-center dottedLine mb-4 w-100">
                <h5 class="mt-0">Volume</h5>
                <img class="ml-auto mr-2 mb-2" src="../assets/on.png" alt="開"
                  v-if="volume" @click="volume=!volume">
                <img class="ml-auto mr-2 mb-2" src="../assets/off.png" alt="關"
                  v-else @click="volume=!volume">
              </div>
               <div class="media-body d-flex align-items-center dottedLine mb-4 w-100">
                <h5 class="mt-0">Audio</h5>
                <p class="ml-auto mr-2 mb-0 h5">basic</p>
                <img class="mr-2" src="../assets/down key.png" alt="選擇鍵">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      menu: false,
      chart: false,
      setting: false,
      volume: false,
    };
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
    minute() {
      return this.$store.state.minute;
    },
    second() {
      return this.$store.state.second;
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
    updatemenu(string) {
      if (string === 'menu') {
        if (!this.$store.state.menu) {
          this.menu = true;
          let status = this.$store.state.menu;
          status = !status;
          this.$store.commit('updatemenu', status);
        } else if (this.$store.state.menu) {
          if (!this.menu) {
            this.menu = true;
            this.chart = false;
            this.setting = false;
          } else {
            this.menu = false;
            let status = this.$store.state.menu;
            status = !status;
            this.$store.commit('updatemenu', status);
          }
        }
      } else if (string === 'chart') {
        if (!this.$store.state.menu) {
          this.chart = true;
          let status = this.$store.state.menu;
          status = !status;
          this.$store.commit('updatemenu', status);
        } else if (this.$store.state.menu) {
          if (!this.chart) {
            this.menu = false;
            this.chart = true;
            this.setting = false;
          } else {
            this.chart = false;
            let status = this.$store.state.menu;
            status = !status;
            this.$store.commit('updatemenu', status);
          }
        }
      } else if (string === 'setting') {
        if (!this.$store.state.menu) {
          this.setting = true;
          let status = this.$store.state.menu;
          status = !status;
          this.$store.commit('updatemenu', status);
        } else if (this.$store.state.menu) {
          if (!this.setting) {
            this.menu = false;
            this.chart = false;
            this.setting = true;
          } else {
            this.setting = false;
            let status = this.$store.state.menu;
            status = !status;
            this.$store.commit('updatemenu', status);
          }
        }
      }
    },
    // chcek(event) {
    //   {event.path[1].children[1]} = event.target;
    //   // a = event.path[1].children[1];
    //   // let a = event.path[1].children[1].target;
    //   // a = 'click';
    //   console.log(event.path[1].children[1]);
    // },
    changeMinute(e) {
      let newValue = e.srcElement.value;
      if (newValue.length < 2) {
        newValue = `0${newValue}`;
      }
      this.$store.commit('updateminute', newValue);
    },
    changeSecond(e) {
      let newValue = e.srcElement.value;
      if (newValue.length < 2) {
        newValue = `0${newValue}`;
      }
      this.$store.commit('updatesecond', newValue);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scope>
.list-icon{
  background-color: #BC2B35;
  border: 1px solid #F2F0C9;
  border-radius: 50px;
  height: 45px;
  width: 45px;
  color: #F2F0C9;
  display: flex;
  justify-content: center;
  align-items: center;
  span{
    margin: 0;
  }
}
.list-icon:hover{
  background-color: #D9343F;
}
.menu-content{
  width: 370px;
  height: 600px;
  top: -150px;
  right: -450px;
}
.new-item-box{
  background-color: #F2F0C9;
  border-radius: 10px;
  .material-icons{
    color: #BC2B35;
  }
}
.new-item{
  border: 0;
  background-color: transparent;
  color: #BC2B35;
}
.new-item::-webkit-input-placeholder { color: #BC2B35; }
.card{
  border-radius: 10px !important;
  background-color: #E9414C !important;
  border: 0 !important;
  height: 90%;
  .card-body{
    background: linear-gradient(to right,#BC2B35,#D9343F);
    overflow-y: auto;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    blockquote{
      border-bottom: 1px dashed #F2F0C9;
      overflow: hidden;
      color: #F2F0C9;
    }
  }
}
.fine-tuning{
  width:27px;
  margin-top:5px;
  margin-right: 11px;
}
.bgColor{
  background-color: #D9343F;
}
.dottedLine{
  border-bottom: 1px dashed rgba(242, 240, 201, 0.534);
}
.media{
  color: #F2F0C9;
}
.custom-select{
  color: #F2F0C9 !important;
  // background: transparent !important;
  background: none !important;
  padding: 5px !important;
  border: 0 !important;
  width: 30px !important;
}

</style>
