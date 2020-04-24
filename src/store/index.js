import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  // strict: true,
  state: {
    list: [
      {
        title: '小拇指伏地挺身',
        status: false,
      },
      {
        title: '睜眼五分鐘',
        status: false,
      },
    ],
    menu: false,
    minute: '25',
    second: '00',
    breakTime_minute: '05',
    breakTime_second: '00',
  },
  mutations: {
    addList(state, a) {
      state.list.push(a);
    },
    updatemenu(state, a) {
      state.menu = a;
    },
    updateminute(state, a) {
      state.minute = a;
    },
    updatesecond(state, a) {
      state.second = a;
    },
    updateStatus(state, a) {
      state.list.forEach((item, index) => {
        if (a === item.title) {
          state.list.splice(index, 1, {
            title: item.title,
            status: true,
          });
        }
      });
    },
  },
  actions: {},
  modules: {},
});
