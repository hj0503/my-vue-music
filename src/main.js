// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
  	showSideMenu: false,
  	skinColor: '#5cacee',
  	skinColor1: '#6495ed',
  	isPlaying: false,
    isShowMusicPlay: false,
    showHeader: true,
    startTime: '',
    endTime: '',
    historyList: [],
  	DOM: {},
    audio: {
      name: '',
      src: '',
      musicImgSrc: '',
      index: 0
    },
    searchMusic: [],
    musicData: [],
    lrcData:[]
  },
  mutations: {
  	play(state,flag) {
  	  state.isPlaying = flag
  	},
  	showSideMenu (state, flag) {
  	  state.showSideMenu = flag
  	},
    musicData(state, newData) {
      state.musicData = newData;
    },
    showMusicPlay (state, flag) {
      state.isShowMusicPlay = flag
    },
    showHeader(state, flag) {
      state.showHeader = flag
    },
  	chooseSkinColor(state,color,color1) {
  	  state.skinColor = color;
  	  state.skinColor1 = color1;
  	},
    historyList(state,name) {
      state.historyList.unshift(name);
    },
    delHistoryList(state,index) {
      state.historyList.splice(index,1)
    },
    resetHistory(state,localHistory) {
      state.historyList = localHistory
    },
  	findDOM(state, payload) {
      state.DOM[payload.name] = payload.dom;
    },
    searchMusic(state, flag) {
      state.searchMusic.push(flag)
    },
    resetMusic(state) {
      state.searchMusic = []
    },
    searchToggle(state) {
      if(state.searchMusic.length > 0) {
        state.audio.name =state.searchMusic[0].f.split('|')[3]  + '-' + state.searchMusic[0].f.split('|')[1];
        state.audio.src = `http://ws.stream.qqmusic.qq.com/${state.searchMusic[0].f.split('|')[0]}.m4a?fromtag=46`;
        state.audio.musicImgSrc = `http://imgcache.qq.com/music/photo/album_300/${state.searchMusic[0].f.split('|')[4]%100}/300_albumpic_${state.searchMusic[0].f.split('|')[4]}_0.jpg`;
        state.audio.index = -1;
      }
    },
    toggleMusic(state, index) {
      if(state.musicData.length > 0) {
        state.audio.name = state.musicData[index].name;
        state.audio.src = state.musicData[index].src;
        state.audio.musicImgSrc = state.musicData[index].musicImgSrc;
        state.audio.index = index;
      }
    },
    getData(state) {
      return new Promise((resolve, reject) => {
        axios.get('https://www.easy-mock.com/mock/5902e9be7a878d73716dfc00/members/music-data-list') 
            .then (res => {
              state.musicData = res.data.musicData;
              localStorage.musics = JSON.stringify(state.musicData);
              console.log(state.musicData)
            })
            .then(() => {
              state.audio.name = state.musicData[0].name;
              state.audio.src = state.musicData[0].src;
              state.audio.musicImgSrc = state.musicData[0].musicImgSrc;
              state.audio.index = 0;
            });
        resolve();
      });
    },
    getLrc(state) {
      axios.get('/api/lyric')
        .then(function() {
          console.log('hh')
        })
        console.log('hj')
    },
    startTime(state,time) {
      state.startTime = time;
    },
    endTime(state,time) {
      state.endTime = time;
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
