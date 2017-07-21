<template lang="html">
  <transition name="fadeIn">
    <div class="play" :style="{backgroundImage: 'url(' + audio.musicImgSrc + ')'}">
      <div class="mask"></div>
      <div class="title">
        <div class="back" @click="isShowMusicPlay">
          <i class="iconfont icon-viajiantou">&#xe605;</i>
        </div>
        <div class="name">{{audio.name.split('-')[1]}}</div>
      </div>
      <div class="footer-play">
        <div class="progress">
          <span class="start">{{startTime}}</span>
          <div ref="proBar" class="progress-bar" @click="clickBar">
            <div ref="now" class="now"></div>
          </div>
          <span class="end">{{endTime}}</span>
        </div>
        <div class="play-btn">
          <div class="mode">
            <i class="iconfont icon-xunhuan">&#xe630;</i>
          </div>
          <div class="btn">
            <div class="pre"><i @click="pre" class="iconfont icon-xiayishou1">&#xe607;</i></div>
            <div class="play-music" @click="changePlay">
              <i v-if="isPlaying" class="iconfont icon-zantingbofang">&#xe706;</i>
              <i v-else class="iconfont icon-bofang">&#xe602;</i>
            </div>
            <div class="next"><i @click="next" class="iconfont icon-xiayishou">&#xe606;</i></div>
          </div>
          <div class="music-list">
            <i class="iconfont icon-ic_queue_music_px" @click="showPlayList = true">&#xe69a;</i>
          </div>
        </div>
      </div>
      <transition name="PlayListIn">
        <div class="play-list" v-show="showPlayList">
          <div class="top">
            <div class="text">{{musicData.length}}首</div>
            <div class="clear">
              <i class="iconfont icon-delete">&#xe631;</i>
            </div>
          </div>
          <div class="list">
            <div class="music" @click="choosePlay(index)" v-for="(music,index) in musicData">
              <div class="left">
                <i v-if="audio.index === index" class="iconfont icon-shengyin">&#xe604;</i>
                <span class="song" :class="{active: audio.index === index}">{{music.name.split('-')[1]}}</span>
                <span>-</span>
                <span class="singer">{{music.name.split('-')[0]}}</span>
              </div>
              <div class="right">
                <i class="iconfont icon-chuyidong">&#xe617;</i>
              </div>
            </div>
          </div>
          <div class="close" @click="showPlayList = false">关闭</div>
        </div>
      </transition>
      <transition name="MaskIn">
        <div v-show="showPlayList" @click="showPlayList = false" class="ListMask"></div>
      </transition>
    </div>
  </transition>
</template>

<script>

export default {
  name: 'MusicPlay',
  data() {
    return {
      showPlayList: false
    }
  },
  mounted() {
    if(this.isPlaying === false) {
      setInterval(() => {
        this.$store.commit('startTime',this.conversion(this.DOM.audio.currentTime))
        this.$store.commit('endTime',this.conversion(this.DOM.audio.duration))
        this.$refs.now.style.width = this.DOM.audio.currentTime / this.DOM.audio.duration.toFixed(3) * 100 + '%'
      }, 1000)
    }
  },
  computed: {
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    DOM() {
      return this.$store.state.DOM;
    },
    audio() {
      return this.$store.state.audio;
    },
    musicData() {
      return this.$store.state.musicData;
    },
    startTime() {
      return this.$store.state.startTime;
    },
    endTime() {
      return this.$store.state.endTime;
    }
  },
  methods: {
    isShowMusicPlay () {
      this.$store.commit('showMusicPlay', false)
    },
    changePlay () {
      this.$store.commit('play',!this.isPlaying)
      if(this.isPlaying === false) {
        this.DOM.audio.pause()
      }else {
        this.DOM.audio.play()
      }
    },
    next () {
      this.audio.index = this.audio.index === this.musicData.length - 1? 0 : (++this.audio.index)
      this.$store.commit('toggleMusic', this.audio.index)
      this.$store.commit('play', true)
    },
    pre () {
      this.audio.index = this.audio.index === 0? this.musicData.length - 1 : (--this.audio.index)
      this.$store.commit('toggleMusic', this.audio.index)
      this.$store.commit('play', true)
    },
    conversion (value) {
      let minute = Math.floor(value / 60)
      minute = minute.toString().length === 1 ? ('0' + minute) : minute
      let second = Math.round(value % 60)
      second = second.toString().length === 1 ? ('0' + second) : second
      return `${minute}:${second}`
    },
    clickBar(event) {
      let coordStart = this.$refs.proBar.getBoundingClientRect().left
      let coordEnd = event.pageX
      let p = (coordEnd - coordStart) / this.$refs.proBar.offsetWidth
      this.$refs.now.style.width = p.toFixed(3) * 100 + '%'
      this.DOM.audio.currentTime = p * this.DOM.audio.duration
      this.DOM.audio.play()
      this.$store.commit('play', true)
    },
    choosePlay (index) {
      this.$store.commit('toggleMusic', index);
      this.$store.commit('play', true);
      this.DOM.audio.play()
    },
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_txetc66cztxfxbt9.eot');
  src: url('//at.alicdn.com/t/font_txetc66cztxfxbt9.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_txetc66cztxfxbt9.woff') format('woff'),
  url('//at.alicdn.com/t/font_txetc66cztxfxbt9.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_txetc66cztxfxbt9.svg#iconfont') format('svg');
}
.iconfont{
  font-family: "iconfont";
  font-size: 0.64rem;
  font-style: normal;
}
.play{
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  background-image: url(http://imgcache.qq.com/music/photo/album_300/28/300_albumpic_33328_0.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #ffffff;
  padding: 0.533333rem;
  font-size: 0.32rem;
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
  }
  .ListMask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.3);
    z-index: 3;
  }
  .title{
    position: relative;
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    z-index: 2;
    font-size: 0.426667rem;
    .back{
      position: absolute;
      top: 0;
      left: 0;
      width: 0.8rem;
      height: 100%;
    }
    .name{
      text-align: center;
    }
  }
  .footer-play{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.533333rem;
    z-index: 2;
    .progress {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      margin: 0 auto;
      .progress-bar {
        position: relative;
        width: 70%;
        height: 3px;
        background-color: #eee;
        vertical-align: 2px;
        border-radius: 3px;
        cursor: pointer;
        .now {
          position: absolute;
          left: 0;
          display: inline-block;
          height: 3px;
          width: 70%;
          border-radius: 3px;
          background: #5cacee;
          &::after {
            content: '';
            position: absolute;
            top: -3px;
            left: 100%;
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background-color: #5cacee;
          }
        }
      }
    }
    .play-btn{
      display: flex;
      margin-top: 0.533333rem;
      align-items: center;
      .mode{
        flex: 1;
        i{
          font-size: 0.8rem;
          color: #5cacee;
        }
      }
      .btn{
        width: 70%;
        display: flex;
        align-items: center;
        color: #5cacee;
        .pre{
          flex: 1;
          i{
            font-size: 1.066667rem;
          }
        }
        .play-music{
          flex: 1;
          text-align: center;
          i{
            font-size: 1.44rem;
          }
        }
        .next{
          flex: 1;
          text-align: right;
          i{
            font-size: 1.066667rem;
          }
        }
      }
      .music-list{
        flex: 1;
        text-align: right;
        i{
          font-size: 0.8rem;
          color: #5cacee;
        }
      }
    }
  }
  .play-list{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    background-color: rgba(0,0,0,.8);
    .top{
      position: relative;
      padding: 0 0.4rem;
      height: 1.066667rem;
      &:after{
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 1px;
        transform: scaleY(.5);
        background-color: rgba(255,255,255,.6);
      }
      .text{
        height: 100%;
        float: left;
        line-height: 1.066667rem;
        font-size: 0.373333rem;
      }
      .clear{
        height: 100%;
        float: right;
        line-height: 1.066667rem;
      }
    }
    .list{
      max-height: 8.0rem;
      overflow-y: scroll;
      .music{
        position: relative;
        padding: 0 0.4rem;
        height: 1.066667rem;
        &:after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          transform: scaleY(.5);
          background-color: rgba(255,255,255,.1);
        }
        .left{
          height: 100%;
          line-height: 1.066667rem;
          max-width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          float: left;
          i{
            display: inline-block;
            vertical-align: middle;
            color: #5cacee;
          }
          .song{
            font-size: 0.373333rem;
            color: white;
            vertical-align: middle;
            &.active{
              color: #5cacee;
            }
          }
          .singer{
            font-size: 0.266667rem;
            color: #a9baa9;
            vertical-align: middle;
          }
        }
        .right{
          height: 100%;
          line-height: 1.066667rem;
          float: right;
          i{
            font-size: 0.533333rem;
          }
        }
      }
    }
    .close{
      height: 1.066667rem;
      text-align: center;
      line-height: 1.066667rem;
      font-size: 0.373333rem;
      background-color: rgba(0,0,0,.3);
    }
  }
}
.fadeIn-enter-active,.fadeIn-leave-active{
  transition: all .4s;
}
.fadeIn-enter,.fadeIn-leave-active{
  transform: translateY(100%);
}
.PlayListIn-enter-active,.PlayListIn-leave-active{
  transition: all .4s;
}
.PlayListIn-enter,.PlayListIn-leave-active{
  transform: translateY(100%);
}
.MaskIn-enter-active,.MaskIn-leave-active{
  transition: all .4s;
}
.MaskIn-enter,.MaskIn-leave-active{
  opacity: 0
}
</style>
