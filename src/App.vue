<template>
  <div id="app">
    <transition name="fadeIn">
      <div v-show="!isShowMusicPlay" class="content">
        <VHeader v-if="showHeader" class="vheader"></VHeader>
        <VSideMenu v-if="showSideMenu"></VSideMenu>
        <router-view class="middle"></router-view>
        <VFooter></VFooter>
      </div>
    </transition>
    <VMusicPlay v-show="isShowMusicPlay"></VMusicPlay>
    <audio style="display:none" height="0" :autoplay="isPlaying" width="0" id="music" :src="audio.src" ref="audio"></audio>
  </div>
</template>

<script>
import VHeader from "./components/Header/Header.vue"
import VSideMenu from "./components/SideMenu/SideMenu.vue"
import VFooter from "./components/Footer/Footer.vue"
import VMusicPlay from "./components/MusicPlay/MusicPlay.vue"
export default {
  name: 'app',
  beforeCreate () {
    this.$store.commit('getData');
  },
  mounted () {
    this.$router.push({path: '/my-music'})
    this.$store.commit('findDOM',{name: 'audio', dom: this.$refs.audio})
    this.$refs.audio.addEventListener('ended', ()=> this.next())
    this.$refs.audio.addEventListener('error', ()=> this.next())
    console.log(this.$store.state.DOM)
  },
  components: {
    VHeader,
    VSideMenu,
    VFooter,
    VMusicPlay
  },
  computed: {
    showSideMenu () {
      return this.$store.state.showSideMenu;
    },
    isPlaying() {
      return this.$store.state.isPlaying;
    },
    audio () {
      return this.$store.state.audio;
    },
    musicData () {
      return this.$store.state.musicData;
    },
    isShowMusicPlay () {
      return this.$store.state.isShowMusicPlay;
    },
    showHeader() {
      return this.$store.state.showHeader;
    }
  },
  methods: {
    next () {
      this.audio.index = this.audio.index === this.musicData.length - 1? 0 : (++this.audio.index)
      this.$store.commit('toggleMusic', this.audio.index)
    }
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: 'iconfont';  /* project id 316354 */
  src: url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.eot');
  src: url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_vi9bowpaxp52vs4i.svg#iconfont') format('svg');
}
@import "./common/style/base.scss";
.fadeIn-enter-active,.fadeIn-leave-active{
  transition: all .4s;
}
.fadeIn-enter,.fadeIn-leave-active{
  transform: translateY(-100%);
}
#app{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.content{
  display: flex;
  height: 100%;
  flex-direction: column;
  .middle{
    flex: 1;
    overflow-y: scroll;
  }
  .vheader{
    height: 2.266667rem;
    padding-bottom: 0.266667rem
  }
}
 @media screen and(min-width: 769px) {
  .middle{
    width: 460px;
  }
}
</style>
