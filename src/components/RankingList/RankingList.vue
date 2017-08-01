<template lang="html">
  <div>
    <div class="rank">
      <div class="hot-rank">
      	<img src="http://p3.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=150y150" alt="">
      </div>
      <div class="all-rank">
      	<img src="http://p3.music.126.net/GhhuF6Ep5Tq9IEvLsyCN7w==/18708190348409091.jpg?param=150y150" alt="">
      </div>
      <div class="hot-rank">
      	<img src="http://p3.music.126.net/sBzD11nforcuh1jdLSgX7g==/18740076185638788.jpg?param=150y150" alt="">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'RankingList',
  data() {
  	return {
  	  music: {}
  	}
  },
  computed: {
  	rankNewMusic() {
  	  return this.$store.state.rankNewMusic
  	}
  },
  mounted () {
  	this.axios.get('api/newRank')
      .then(res => {
        this.music = res
        console.log(JSON.parse(JSON.stringify(this.music.data.substring(13))))
      })
      console.log(this.rankNewMusic)
  }
}
</script>

<style lang="scss" scoped>

</style>
