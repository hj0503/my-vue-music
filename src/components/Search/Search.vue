<template lang="html">
  <div>
    <div class="search-bar">
      <div class="search-input">
        <i @click="back" class="iconfont icon-fanhui-copy">&#xe60a;</i>
        <input v-model="keywords" @keyup.8="seeKeywords" @input="changeInput" @keyup.enter="search(keywords)" type="text" placeholder="搜索歌名、歌手" ref="input">
      </div>
      <div v-show="showDel" @click="clearInput" class="search-del">取消</div>
    </div>
    <div  v-if="!showMusicList && keywords === ''" class="search-hot">
      <div class="hot-title">热门搜索</div>
      <span class="hot-name" @click="search(hot)" v-for="hot in hotList">{{hot}}</span>
    </div>
    <div  v-if="!showMusicList && keywords === ''" class="search-history">
      <div class="history-title">
        <div class="history">搜索历史</div>
        <div class="del-all" @click="clearHistory">清空历史</div>
      </div>
      <div class="history-list">
        <div class="history-name" @click="search(history)" v-for="(history,index) in history">
          <div class="name">{{history}}</div>
          <div class="del" @click.stop="delHistory(index)">x</div>
        </div>
      </div>
    </div>
    <div v-if="showMusicList && keywords !== ''" class="search-list">
      <div class="number">
        已为你找到<span>{{musicList.length}}</span>首相关歌曲
      </div>
      <div v-for="(music,index) in musicList" :class="{play:music.play}" class="music-list" @click="playMusic(index)">
        <i class="music-img" :style="{backgroundImage: `url(http://imgcache.qq.com/music/photo/album_300/${music.f.split('|')[4]%100}/300_albumpic_${music.f.split('|')[4]}_0.jpg)`}"></i>
        <div class="music">
          <p :class="{play:music.play}" class="song-name">{{music.f.split('|')[1]&&strDecode(music.f.split('|')[1].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名'}}</p>
          <p :class="{play:music.play}" class="singer">{{music.f.split('|')[3]&&strDecode(music.f.split('|')[3].replace(/amp\;/g, '')).replace(/\;/g, '/') || '佚名'}}</p>
        </div>
        <i @click.stop="addMusic(index)" v-if="music.change" class="iconfont icon-xihuan3">&#xe657;</i>
        <i @click.stop="addMusic(index)" v-else  class="iconfont icon-234">&#xe610;</i>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'search',
  data() {
    return {
      keywords: '',
      hotList: ['我的一个道姑朋友','未来告白','夏至未至','薛之谦','童话镇','林俊杰','追光者'],
      musicList: [],
      showMusicList: false,
      showDel: false,
      history: [],
      chooseMusic: {},
      searchPlay: false
    }
  },
  mounted () {
      this.$store.commit('resetHistory', JSON.parse(localStorage.getItem('historyList')) || [])
      this.history = JSON.parse(localStorage.getItem('historyList')) || []
      this.$refs.input.focus()
  },
  filters:{
    filSong:function(value){
      return eval(value)
    }
  },
  computed: {
    audio() {
      return this.$store.state.audio;
    },
    searchMusic() {
      return this.$store.state.searchMusic;
    },
    musicData() {
      return this.$store.state.musicData;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    audio() {
      return this.$store.state.audio;
    },
    historyList() {
      return Array.from(new Set(this.$store.state.historyList));
    }
  },
  methods: {
    addMusic(index) {
      this.$set(this.musicList[index],'change',!this.musicList[index].change)
      this.chooseMusic = {}
      this.chooseMusic.name = this.musicList[index].f.split('|')[3] + '-' + this.musicList[index].f.split('|')[1];
      this.chooseMusic.src = 'http://ws.stream.qqmusic.qq.com/'+ this.musicList[index].f.split('|')[0]+'.m4a?fromtag=46';
      this.chooseMusic.musicImgSrc = 'http://imgcache.qq.com/music/photo/album_300/'+this.musicList[index].f.split('|')[4]%100+'/300_albumpic_'+this.musicList[index].f.split('|')[4]+'_0.jpg';
      if(this.musicList[index].change === true) {
        this.musicData.unshift(this.chooseMusic)
      }else {
        for (var i = 0; i<this.musicData.length; i++) {
          if(this.musicData[i].src === this.chooseMusic.src) {
            this.musicData.splice(i,1)
          }
        }
      }
      var d = 0
      for(var i=0; i<this.musicData.length;i++){
        if(this.musicData[i].name === this.audio.name) {
          d = i;
        }
      }
      this.audio.index = d
    },
    search(keywords) {
      this.axios.get(`/api/search/30/${keywords}`)
        .then(res => res.data.data.song)
        .then(song => {
          this.musicList = song.list.filter((song) => {
            return song.f.indexOf('@') <= -1
          })
        })
        .then(() => {
          for (var i = 0; i<this.musicData.length; i++) {
            for(var j= 0; j<this.musicList.length; j++) {
              if(this.musicData[i].src === 'http://ws.stream.qqmusic.qq.com/'+this.musicList[j].f.split('|')[0]+'.m4a?fromtag=46') {
                this.$set(this.musicList[j],'change',true)
              }
            }
          }
          for(var i = 0; i<this.musicList.length; i++) {
            if(this.audio.src === 'http://ws.stream.qqmusic.qq.com/'+this.musicList[i].f.split('|')[0]+'.m4a?fromtag=46') {
              this.$set(this.musicList[i],'play',true)
            }
          }
        })
        this.showMusicList = true
        this.keywords = keywords
        this.showDel = true
        this.$store.commit('historyList', this.keywords)
        localStorage.setItem('historyList', JSON.stringify(this.historyList))
        this.history = JSON.parse(localStorage.getItem('historyList'))
    },
    playMusic(index) {
      this.$store.commit('searchMusic', this.musicList[index])
      this.$store.commit('searchToggle')
      this.$store.commit('play', true);
      this.DOM.audio.play();
      this.resetMusic();
      for(var i = 0; i<this.musicList.length; i++) {
        this.$set(this.musicList[i],'play',false)
        if(this.audio.src === 'http://ws.stream.qqmusic.qq.com/'+this.musicList[i].f.split('|')[0]+'.m4a?fromtag=46') {
          this.$set(this.musicList[i],'play',true)
        }
      }
    },
    back() {
      this.$router.back(-1);
      this.$store.commit('showHeader', true)
    },
    changeInput() {
      this.showDel = this.keywords === '' ? false : true
      this.showMusicList = this.musicList.length <= 0 ? false : true
    },
    seeKeywords() {
      if(this.keywords === '') {
        this.musicList = [];
        this.showMusicList = false;
      }
    },
    resetMusic() {
      this.$store.commit('resetMusic', [])
    },
    clearInput() {
      this.keywords = '';
      this.showDel = false;
      this.musicList = [];
      this.showMusicList = false;
      this.$refs.input.focus();
    },
    strDecode(str) {
      return str.replace(/&#(x)?([^&]{1,5});?/g,function($,$1,$2) {
          return String.fromCharCode(parseInt($2 , $1 ? 16:10));
      });
    },
    delHistory(index) {
      this.history.splice(index,1);
      this.$store.commit('delHistoryList', index)
      localStorage.setItem('historyList', JSON.stringify(this.history));
    },
    clearHistory() {
      this.history = [];
      this.$store.commit('resetHistory', [])
      localStorage.removeItem('historyList')
    }
  }
}
</script>

<style lang="scss" scoped>
.iconfont{
  font-family: "iconfont";
  font-size: 0.586667rem;
  font-style: normal;
}
.search-bar{
  display: flex;
  width: 100%;
  height: 1.333333rem;
  padding: 0.266667rem;
  align-items: center;
  font-size: 0.426667rem;
  color: white;
  background-color: #5cacee;
  .search-input{
    flex: 1;
    line-height: 100%;
    input{
      border: 0;
      color: white;
      width: 90%;
      line-height: 100%;
      background-color: #5cacee;
      font-size: 0.426667rem;
      vertical-align: middle;
      &::placeholder{
        color: #eaeaea;
      }
    }
    i{
      vertical-align: middle;
    }
  }
  .search-del{
    font-size: 0.426667rem;
    width: 1.066667rem;
    text-align: center;
  }
}
.search-hot{
  padding: 0.533333rem 0.266667rem;
  .hot-title{
    font-size: 0.32rem;
    color: #a9baa9;
  }
  .hot-name{
    padding: 0.106667rem 0.266667rem;
    display: inline-block;
    font-size: 0.346667rem;
    border: 1px solid #a9baa9;
    border-radius: 0.533333rem;
    margin: 0.133333rem 0.133333rem 0 0; 
  }
}
.search-history{
  padding: 0 0.266667rem;
  .history-title{
    overflow: hidden;
    padding-bottom: 0.266667rem;
    .history{
      float: left;
      font-size: 0.32rem;
      color: #a9baa9;
    }
    .del-all{
      float: right;
      font-size: 0.32rem;
      color: #5cacee;
    }
  }
  .history-list{
    /*position: relative;
    bottom: 1.6rem;
    top: 0;*/
    height: 9.6rem;
    overflow-y: scroll;
    .history-name{
      position: relative;
      padding: 0.266667rem 0;
      overflow: hidden;
      &:after{
        content: '';
        position: absolute;
        bottom: 0;
        right: 0;
        left: 0;
        height: 1px;
        background-color: #eee9e9;
        transform: scaleY(.5);
      }
      .name{
        float: left;
        font-size: 0.346667rem;
      }
      .del{
        width: 0.533333rem;
        float: right;
        text-align: right;
        font-size: 0.426667rem;
        color: #a9baa9;
      }
    }
  }
}
.search-list {
  position: absolute;
  top: 1.333333rem;
  bottom: 1.6rem;
  width: 100%;
  overflow-y: scroll;
  cursor: pointer;
  .number{
    padding: 0.133333rem 0.266667rem;
    font-size: 0.32rem;
    color: #a9baa9;
    background-color: #f0f0f0;
    span{
      color: #5cacee;
    }
  }
  .music-list{
    display: flex;
    align-items: center;
    padding: 0.266667rem;
    overflow: hidden;
    line-height: 1.5;
    font-size: 0.373333rem;
    &.play{
      position: relative;
      &:after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 5px;
        background-color: #5cacee;
      }
    }
    .music-img{
      display: inline-block;
      width: 1.066667rem;
      height: 1.066667rem;
      background-color: #5cacee;
      background-size: cover;
      margin-right: 0.266667rem;
      border-radius: 4px;
    }
    .music{
      flex: 1;
      .song-name{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 6.933333rem;
        &.play{
          color: #5cacee;
        }
      }
      .singer{
        font-size: 0.32rem;
        color: #a9baa9;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 6.933333rem;
        &.play{
          color: #5cacee;
        }
      }
    }
    i{
      width: 1.066667rem;
      height: 1.066667rem;
      font-size: 0.533333rem;
      line-height: 1.066667rem;
      text-align: right;
      color: red;
    }
  }
}
</style>
