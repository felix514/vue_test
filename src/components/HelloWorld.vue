<template>
  <div class="search">
      <el-form>
      <div class="search-block">
      <div class="input-wrap">
        <el-input v-model="barrage" maxlength="100" autocomplete="off">

        </el-input>
        <div class="suggest-wrap"></div>
        <el-button type="primary" @click="onsubmit" icon="el-icon-search">搜索</el-button>
      </div>
      </div>
      </el-form>
      <div>
        <ul>
          <li v-for="v in vList">
            <a :href="v.video.videoUrl">观看视频</a>
            <img :src="v.video.coverUrl">
            <div v-model="v.video.website">来源：{{v.video.website}}</div>
            <div v-model="v.video.barrageCount">弹幕数：{{v.video.barrageCount}}<div/>
            <div v-model="v.video.timeLength">时长：{{v.video.timeLength}}</div>
            <div v-model="v.video.releaseTime">发布时间：{{v.video.releaseTime}}</div>
            <div v-model="v.video.heat">热度：{{v.video.heat}}</div>
            <div v-model="v.video.videoId">视频ID：{{v.video.videoId}}</div>

            </div>
          </li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {

           barrage: '23',

           vList:[],

    }
  },
  methods:{
    onsubmit(){
        //console.log('submited');
           var B=this.barrage;
            var P=1;
            var O='pubdata';
            var D=2;
            var sendData={
              barrage:B,
              pageIndex:P,
              order:O,
              duration:D
              };
             console.log(sendData);
             let url='http://139.196.120.123:8080/search';
          this.$http.jsonp(url,{params : sendData}).then(function(response){
                             this.vList=response.data.videoInfos;
                       }).catch(function(response){
                           console.log('error');
                       });
            }
     },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.video.list {
    height: 100px;
    width: 808px;
    padding: 20px 0 20px 172px;
    position: relative;
    border-bottom: 1px solid #e5e9ef;
}
li, ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
}




</style>
