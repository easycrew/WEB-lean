<template>
  <div class="recommend">
    recommend
  </div>
</template>

<script>
import {getRecommend} from 'api/recommend'
import {ERR_OK} from 'api/config'
// import axios from 'axios'

export default {
  created () {
    this._getRecommend()
  },

  methods: {
    _getRecommend () {
      getRecommend().then((res) => {
        console.log(res, '===')
        if (res.code === ERR_OK) {
          console.log(res.data.slider)
        }
      })
    }
  }

}
</script>

<style lang="stylus" scoped>

</style>
