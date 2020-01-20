<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper" v-if="recommends.length">
        <slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
import Slider from 'base/slider/slider'

export default {

  data () {
    return {
      recommends: []
    }
  },

  created () {
    this._getRecommend()
  },

  methods: {
    _getRecommend () {
      getRecommend().then((datas) => {
        const {data: res} = datas
        if (res.code === ERR_OK) {
          this.recommends = res.data
        }
        console.log(datas, res, res.data)
      })
    }
  },

  components: {
    Slider
  }

}
</script>

<style lang="stylus" scoped>

</style>
