<template>
  <div class="all-show">
  <div class="search">
    <div class="contain">
      <div class="head-contain">
        <v-goTop></v-goTop>
        <div class="search-wrap">
          <div class="logo-input clearfix">
            <img class="logo-size" src="./public/logo4.png">
        <div class="search-block">
          <el-form @submit.native.prevent>
          <div class="input-wrap">
            <input id="search-keyword" v-model="barrage" maxlength="100" autocomplete="off" @keyup.enter="onsubmit">
            <!--div class="suggest-wrap" v-show="barrage">
              <ul class="keyword-wrap">
                <li v-for="r in rList">
                  <button class="" @click="writeOn">
                    {{r}}
                  </button>
                </li>
              </ul>
            </div-->
            <el-button type="primary" @click="onsubmit">搜索</el-button>
          </div>
          </el-form>
        </div>
          </div>
        </div>
      </div>
<div class="hotsearchs"><a  @click="writeOn">{{mag}}</a><a href="http://www.pansoso.com/zh/%E5%A4%9C%E5%A4%A9%E5%AD%90">辛苦了</a><a href="http://www.pansoso.com/zh/%E6%96%97%E7%A0%B4%E8%8B%8D%E7%A9%B9">真实</a><a href="http://www.pansoso.com/zh/%E5%A6%82%E6%87%BF%E4%BC%A0">上香</a><a href="http://www.pansoso.com/zh/%E5%A8%98%E9%81%93">欢迎回家</a><a href="http://www.pansoso.com/zh/%E7%99%BD%E9%B9%BF%E5%8E%9F">此生无悔入二次元!</a><a href="http://www.pansoso.com/zh/%E9%93%B6%E9%AD%82">嘟督辛苦了</a></div>


      <div class="body-contain">
        <div class="all-contain">
          <div class="filter-wrap" v-show="vTotal>0||flag>0">
            <div class="order-area">
              <li v-for="(o,index) in order">
                <div @mouseover="orderEnter(index)" @mouseout="orderLeave()">
                  <el-button v-on:click="orderClick(index)"
                             :class="index==orderSelect||index==mouseOrder?'button-on':'button-off'">{{o.content}}
                  </el-button>
                </div>
              </li>
            </div>

            <div class="duration-area" v-show="vTotal>0||flag>0">
              <li v-for="(d,index) in durations">
                <div @mouseover="durationEnter(index)" @mouseout="durationLeave()">
                  <el-button v-on:click="durationClick(index)"
                             :class="index==durationSelect||index==mouseDuration?'button-on':'button-off'">{{d.duration}}
                  </el-button>
                </div>
              </li>
            </div>
          </div>

          <div class="result-wrap clearfix">
            <ul class="video-contain clearfix">
              <li v-for="v in vList" class="video list">
                <a title="观看视频" :href=" v.video.videoUrl" target="_blank">
                  <div class="img">
                    <div class="lazy-img">
                      <img :src="[bUrl+v.video.videoId+final]" height="100px" width="160px"/>
                    </div>
                    <span class="so-imgTag_rb">{{v.video.timeLength}}</span>
                    <div class="watch-later-trigger watch-later"></div>
                  </div>

                </a>
                <div class="info">
                  <div class="headline clearfix">
                    <a :title="v.video.title" class="title" :href="v.video.videoUrl" target="_blank">{{v.video.title}}</a><div class="el-cascader-menu__item__keyword">【搜索词：{{v.bcontent.substr(0,10)}}】【次数：{{v.btimes}}】</div>
                  </div>
                  <div class="des hide">
                    该视频其它热门弹幕：{{v.barrages[0].content}}、{{v.barrages[1].content}}、{{v.barrages[2].content}}、{{v.barrages[3].content}}、{{v.barrages[4].content}}、{{v.barrages[5].content}}、{{v.barrages[6].content}}、{{v.barrages[7].content}}、{{v.barrages[8].content}}、{{v.barrages[9].content}}
                  </div>
                  <div class="tags">
                <span title="热度" class="so-icon heat">
                  <i class="heatnum"></i>
                  {{v.video.heat}}
                </span>
                    <span title="视频播放量" class="so-icon videoid">
                  <i class="icon-videoid"></i>
                  {{v.video.views}}
                </span>
                    <span title="弹幕数" class="so-icon subtitle">
                  <i class="icon-subtitle"></i>
                  {{v.video.barrageCount}}
                </span>
                    <span title="发布时间" class="so-icon date">
                  <i class="icon-date"></i>
                  {{v.video.releaseTime.replace('T',' ').replace('.000+0000','')}}
                </span>

                  </div>
                </div>
              </li>
            </ul>
            <div class="block">

              <el-pagination
                v-show="vTotal>0"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[10, 15, 20, 25]"
                :page-size="pageNum"
                layout="total, sizes, prev, pager, next, jumper"
                :total="vTotal">
              </el-pagination>
            </div>


          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
  import goTop from "./public/goTop";
  export default {
    name: 'HelloWorld',
    data() {
      return {
        mag:'精彩',
        final:'.jpg',
        bUrl:'http://139.196.120.123/images/',
        pageNum: 15,
        duration:0,
        barrage: '',
        pageIndex: 1,
        vList: [],
        vTotal: 0,
        flag:0,
        pList:[],
        rList:[],
        cover_url:'',
        durations: [
          {id: '0', duration: '全部时长'},
          {id: '1', duration: '10分钟以下'},
          {id: '2', duration: '10-30分钟'},
          {id: '3', duration: '30-60分钟'},
          {id: '4', duration: '60分钟以上'}
        ],
        order: [
          // {id: '0', value: 'totalrank', content: '综合排序'},
          {id: '0', value: 'heat', content: '热度最高'},
          {id: '1', value: 'pubdate', content: '最新发布'},
          {id: '2', value: 'dm', content: '最多弹幕'}
        ],
        //当前排序的选择
        orderSelect: 0,
        //当前时长的选择
        durationSelect: 0,
        //当前鼠标在order的位置
        mouseOrder: -1,
        //当前鼠标在duration的位置
        mouseDuration: -1,

      }
    },
    
    methods: {
      writeOn(){
        this.barrage=this.mag;
        this.pageIndex=1;
        if(this.barrage==''){
          console.log("barrage = null");
          return;
        }
        this.vList=[];
        this.$store.commit('showLoading');
        //console.log('submited');
        var N = this.pageNum;
        var B = this.barrage;
        var P = this.pageIndex;
        var O = 'heat';
        var D = this.duration;
        var sendData = {
          pageNum: N,
          barrage: B,
          pageIndex: P,
          order: O,
          duration: D
        };
        //console.log(sendData);
        let url = 'http://139.196.120.123:8080/search';
        this.$http.jsonp(url, {params: sendData}).then(function (response) {
          if(this.flag==0){
            this.flag=1;
          }
          //console.log('你提交了。。');
          //console.log(response.data.videoInfos.barrages.content);
          this.$store.commit('hideLoading');
          this.vTotal = response.data.total;
          this.vList = response.data.videoInfos;

          //this.cover_url = 'http://139.196.120.123/images/'+this.vList.video.videoId+'.jpg';
          //this.bList = response.data.videoInfos.barrages;
        }).catch(function (response) {
          console.log('submitError');
        });
      },
      barrageAdd(){
        var partB = this.barrage;
        var sendData = {
          partBarrage:partB
        };
        //console.log(sendData);
        let url = 'http://139.196.120.123:8080/associativeSearch';
        this.$http.jsonp(url, {params: sendData}).then(function (response) {
          //this.vTotal = response.data.total;
          console.log(response.data.results);
          this.rList=response.data.results;
        }).catch(function (response) {
          console.log('error');
        });
      },
      handleCurrentChange(pageIndex) {
        this.pageIndex = pageIndex;
        this.vList=[]
        console.log(this.orderSelect+"-------")
        var N = this.pageNum;
        var B = this.barrage;
        var P = this.pageIndex;
        var orderIndex=this.orderSelect
        var durationIndex=this.durationSelect
        var O = this.order[orderIndex].value;
        var D = this.durations[durationIndex].id;
        var sendData = {
          pageNum: N,
          barrage: B,
          pageIndex: P,
          order: O,
          duration: D
        };
        //console.log(sendData);
        let url = 'http://139.196.120.123:8080/search';
        this.$http.jsonp(url, {params: sendData}).then(function (response) {
          this.vTotal = response.data.total;
          this.vList = response.data.videoInfos;
          console.log('当前页面改变了。。');
        }).catch(function (response) {
          console.log('handleCurrentChangeError');
        });
      },
      handleSizeChange(pageNum) {
        this.pageNum = pageNum;
        this.vList=[]
        console.log('页面视频数改变了。。');
        var N = this.pageNum;
        var B = this.barrage;
        var P = this.pageIndex;
        var orderIndex=this.orderSelect
        var durationIndex=this.durationSelect
        var O = this.order[orderIndex].value;
        var D = this.durations[durationIndex].id;
        var sendData = {
          pageNum: N,
          barrage: B,
          pageIndex: P,
          order: O,
          duration: D
        };
        //console.log(sendData);
        let url = 'http://139.196.120.123:8080/search';
        this.$http.jsonp(url, {params: sendData}).then(function (response) {
          this.vTotal = response.data.total;
          this.vList = response.data.videoInfos;
          this.pageIndex = 1;
        }).catch(function (response) {
          console.log('handleSizeChangeError');
        });
      },
      onsubmit() {
        this.pageIndex=1;
        if(this.barrage==''){
          console.log("barrage = null");
          return;
        }
        this.vList=[];
        this.$store.commit('showLoading');
        //console.log('submited');
        var N = this.pageNum;
        var B = this.barrage;
        var P = this.pageIndex;
        var O = 'heat';
        var D = this.duration;
        var sendData = {
          pageNum: N,
          barrage: B,
          pageIndex: P,
          order: O,
          duration: D
        };
        //console.log(sendData);
        let url = 'http://139.196.120.123:8080/search';
        this.$http.jsonp(url, {params: sendData}).then(function (response) {
          if(this.flag==0){
            this.flag=1;
          }
          //console.log('你提交了。。');
          //console.log(response.data.videoInfos.barrages.content);
          this.$store.commit('hideLoading');
          this.vTotal = response.data.total;
          this.vList = response.data.videoInfos;

          //this.cover_url = 'http://139.196.120.123/images/'+this.vList.video.videoId+'.jpg';
          //this.bList = response.data.videoInfos.barrages;
        }).catch(function (response) {
          console.log('submitError');
        });
      },
      orderClick(index) {
        this.vList=[]
        this.orderSelect = index
        let sendData = {
          barrage: this.barrage,
          pageIndex: 1,
          order: this.order[index].value,
          duration: this.durationSelect,
          pageNum: this.pageNum
        }
        console.log(sendData);
        let url = 'http://139.196.120.123:8080/search';
        this.$http.jsonp(url, {params: sendData}).then(function (response) {
          this.vList = response.data.videoInfos;
          this.vTotal=response.data.total;
          this.pageIndex=1;
        }).catch(function (response) {
          console.log('error');
        });
      },
      orderEnter(index) {
        this.mouseOrder = index
      },
      orderLeave() {
        this.mouseOrder = -1
      },
      durationClick(index) {
        this.vList=[]
        this.durationSelect = index
        let sendData = {
          barrage: this.barrage,
          pageIndex: 1,
          order: this.order[this.orderSelect].value,
          duration: index,
          pageNum: this.pageNum
        };
        console.log(sendData);
        let url = 'http://139.196.120.123:8080/search';
        this.$http.jsonp(url, {params: sendData}).then(function (response) {
          this.vList = response.data.videoInfos;
          this.vTotal=response.data.total;
          this.pageIndex=1
        }).catch(function (response) {
          console.log('error');
        });
      },
      durationEnter(index) {
        this.mouseDuration = index
      },
      durationLeave() {
        this.mouseDuration = -1
      },
    },
    watch: {},
    components:{
      'v-goTop':goTop
    }

  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .all-show{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    background: url("./public/background3.jpg");
    background-attachment: fixed;
  }
  .filter-wrap {
    height: auto;
    padding: 20px 0 10px;
    position: relative;
    border-bottom: 1px solid #e5e9ef;
    display: table;
    width: 100%;
  }

  .head-contain {
    padding-top: 40px;
  }

  .video.list {
    height: 100px;
    width: 808px;
    padding: 20px 0 20px 172px;
    position: relative;
    background-color:rgba(255,255,255,0);
  }

  li, ol, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .result-wrap {
    padding-bottom: 10px;
  }

  .clearfix {
    *zoom: 1;
  }

  .video-contain {
    position: relative;
  }

  a {
    outline: 0;
    color: #00a1d6;
    text-decoration: none;
    cursor: pointer;
  }

  .video.list .img {
    position: absolute;
    left: 0px;
    top: 20px;
    height: 100px;
    width: 160px;
    border-radius: 4px;
    overflow: hidden;
    background-size: auto;
  }

  .lazy-img {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABHCAYAAABPjLqRAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo4NDM2RTI2RkY1RkMxMUUzODg4RUZDRjlGRDNDN0UwNSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo4NDM2RTI3MEY1RkMxMUUzODg4RUZDRjlGRDNDN0UwNSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjg0MzZFMjZERjVGQzExRTM4ODhFRkNGOUZEM0M3RTA1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjg0MzZFMjZFRjVGQzExRTM4ODhFRkNGOUZEM0M3RTA1Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+HLC+wQAABbxJREFUeNrsnF1oHFUUx+9u06StlZo2kGpptYso+JWPSlMNoZGqL2L7IFgQURREsFoRQepDRQhSrKA+iFWfRMQvRDFo86AWP1prW9JNFGOLJmptraLU2qS2sU3W/3H+a252Z+ZOdnZndmfmwJ/s7p25u/eXe++cc++ZSeVyOaXbyMiI8mEroVegS6Fd0B1SpQrO6qEXoNuhUehR6KWZVJDJZBzL0mX8oVLXWwQl1gl9Bl0cIKi3obug2dBC6EXoinI2sFzWBF1Y8NkS6JMAgM2DPoButim7uhph/QH9ZPN5pYEJqPeh623KZI7ZV42wJqFboRMBAsuDus6h/H7om2qEJbYXujEgYCZQ90HPl7Nx6QoMiz0BAPMCalu5G5au0DxSSWChgKokrEoBCw1UpWGVG1iooMTqDOUpaAXUJc4tdG6J3/M91O4A7FPoQw91XOlQh9gvUAc1UxtllPE51E93wx6GQ7gjkG6DNmseeRzsINQDvYawJ+dlGIon3ge9GjNQiu2Vdveh0zS59iwcsJjzSNwgOfWybvSwX4tgAdRcrhS0JZz+t6wsCADYqcJhuDUBVWRt5DLVs9CrWvF6Pyf2xIqD8Xb0roG867B5BqBOQ+MRgNAAzfFwXIp8bkkNDw+fjxc/Q7M8OJgPQbsj1GuugZ7x4J9NQEtlzlrrAZQ4bKsjBkqxPavZPjcTPmsFVreHMXtPRIaenY2zfTnDcd0Cq8Vw0D76HFH3qUwrqi1pxnxuNhSTq56pnZk0rwpu9ldMYJna2ZBWiXm2BFYCK4EVutUF+F0LGJjKaufr0FGf9d0NHefKwA+1DGuxBkaCdFmaXq6VH1JWXoIfe0pZ+QxKg5blgkCWvtNEtcHKFIBpJyzT0ocfWMs0UGLnKWsjQ9/M+Bv6WoOX5fvxoGGth+4lmAUlnL/C5z+o3cMx81TxJsZZ6FtoO7QpKFhNynlLyou1BgDLqb2yS1RSzlipV8N+n41tVtY2WNCw8rY/yGEoY3+yBNj/QF9x/pjlo7GSJDeb0JqqHdZJ6AB0mcsxsnk5UHCFGuK84de2qqm18SWcA/MXF9FSw/nZoK+GWQ3W7wQywCEqf2UXOqcqb0eoXu2zhYTWpl2pL1HWEvFvPD5QWM9BbxDaEVVddgz6iMrbOex9i8Lws76ssWhFpo5dSWyYBNIJrARWAitcq0tgebP5ykp7mp/Amvpep3BHMu86+dfp3HRcYEnUvxN60qasG9rI1xuV/W75Ezz/8qjDWsewSBIyHiawepZJb3pH+01pvu/k+3oev4nnD7C+yE6kHzMAz9/W9gh0p7LW0DtUcdpTo7KSNiSDR5alm7WyA6wvsj1rTFl58YPaZwJglQbqDHvQGb5PsVwHNch6xqI+Zx3l0HpaWYlxuslaVxeHWhff63aa53Uq/7tDNePPnOSc9Th7jQy3gwU9ToZeCyXLK8cZvI/G1fmThpvurhgsgJg4pbUS7pg2IufGhIWpnRMC67DhoItiAsvUzsMCy5Tx1sUJOMrWyHa62VCaoYOpe/ZEHFaPh2G4U2D1eqhsAx3FORGD1MB2bfBwbG/+dhTxaVZ6OOFP6AtlPcOh1m0RnVsvU8zeTCbTkfeztkDvehzbN8XQa9ii+1nvQTsST8rWdpDPtPsNl3HZozHhM23aacUQPDTNg+cHsj50KmH0nwmHdXlQReEOCmTtaE0YEX2Vmdzqu4Y8XGPD3Yz0X1ZlzsmsAZtgu68CqKI74FKGJ7NJCCApkXKb2fICx018rmbDl0vCyNmAG3yBsnK33FY6jhUMN1mpledLvAlIPzqdmPLxGDt5iJfpTirJNz0RMCxJ/rjWpfwxt4ikUo+xG+TYdgwPQgAl1mco315qxX5gyRq5PP9l0qZM0qofCGneeVZZaZx2Js/T6g8DlqLXfwNDIJkcJcdcnr23ij5bGDbGOXabNjd9Bz2orCe1lWz/CjAAUaBevr2x6hQAAAAASUVORK5CYII=) 50% no-repeat;
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  fieldset, img {
    border: none;
    vertical-align: middle;
  }


  .video .so-imgTag_rb {
    position: absolute;
    right: 0px;
    bottom: 0px;
    line-height: 18px;
    padding: 0 5px;
    color: #fff;
    background-color: #333;
    background-color: rgba(0, 0, 0, 0.5);
    border-top-left-radius: 4px;
  }

  .video.list .tags {
    position: absolute;
    bottom: 20px;
    left: 172px;
  }

  .video.list .so-icon {
    margin-right: 20px;
  }

  .so-icon {
    display: inline-block;
    font-size: 12px;
    height: 12px;
    vertical-align: text-top;
    line-height: 12px;
    padding-left: 16px;
    position: relative;
    color: #99a2aa;
  }

  .hide {
    display: none;
  }

  .video .so-icon.videoid {
    white-space: nowrap;
  }

  .so-icon i.icon-videoid {
    background-position: -485px -543px;
  }

  .so-icon i.icon-date {
    background-position: -442px -165px;
  }

  .so-icon i {
    position: absolute;
    left: 0px;
    top: 0px;
    background-image: url("//s1.hdslb.com/bfs/static/jinkela/search/images/sprite-690be8a6ea.png");
    width: 11px;
    height: 11px;
  }

  .so-icon i.icon-subtitle {
    background-position: -442px -124px;

  }

  .so-icon i {
    position: absolute;
    left: 0px;
    top: 0px;
    background-image: url("//s1.hdslb.com/bfs/static/jinkela/search/images/sprite-690be8a6ea.png");
    width: 11px;
    height: 11px;
  }

  i {
    display: inline-block;
  }

  .video.list .title:hover {
    color: #00a1d6;
  }

  .video.list .title {
    margin-right: 6px;
    font-size: 16px;
    color: #222;
    max-width: 592px;
    -o-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    float: left;
    white-space: nowrap;
  }

  .search-wrap {
    height: 44px;
    margin: 0 auto;
    position: relative;
    width: 587px;
  }

  .search-wrap .search-block {
    width: 430px;
    float: left;
    margin-left: 26px;
    position: relative;
  }

  .suggest-wrap {
    border: 1px solid #e5e9ef;
    position: absolute;
    width: 327px;
    border-radius: 4px;
    text-align: center;
    padding: 10px 0;
    color: #222;
    background: #fff;
    z-index: 100;
    overflow: hidden;
    margin-top: 5px;
    -webkit-box-shadow: rgba(0, 0, 0, .16) 0 2px 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  }


  .search .search-block .input-wrap input {
    height: 18px;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding: 11px 15px;
    background: transparent;
    width: 296px;
    border: 2px solid #ccd0d7;
    border-radius: 4px;
    color: #222;
  }

  .contain {
    width: 980px;
    margin: 0 auto;
  }

  .video.list .title:hover {
    color: #00a1d6;
  }

  .search-wrap {
    height: 44px;
    margin: 0 auto;
    position: relative;
    width: 587px;
  }

  .search-wrap .search-block {
    width: 430px;
    float: left;
    margin-left: 26px;
  }

  .suggest-wrap {
    border: 1px solid #e5e9ef;
    position: absolute;
    width: 327px;
    border-radius: 4px;
    text-align: center;
    padding: 10px 0;
    color: #222;
    background: #fff;
    z-index: 100;
    overflow: hidden;
    margin-top: 5px;
    -webkit-box-shadow: rgba(0, 0, 0, .16) 0 2px 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
  }

  .search .search-block .input-wrap input {
    height: 18px;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding: 11px 15px;
    background: transparent;
    width: 296px;
    border: 2px solid #ccd0d7;
    border-radius: 4px;
    color: #222;
  }

  .contain {
    width: 980px;
    margin: 0 auto;
  }

  .order-area {
    display: flex;
    flex-direction: row;
  }

  .duration-area {
    display: flex;
    flex-direction: row;
  }

  .button-on {
    color: lightskyblue;
    border: 1px solid lightskyblue;
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
  }

  .button-off {
    color: #000;
    border: none;
  }
  .video.list .des {
    position:absolute;
    margin-top: 3px;
    max-height: 36px;
    overflow: hidden;
    color: slategrey;
    line-height: 10px;
    display: block;
    background-color:rgba(255,255,255,0);
    font: 12px Helvetica Neue,Helvetica,Arial,Microsoft Yahei,Hiragino Sans GB,Heiti SC,WenQuanYi Micro Hei,sans-serif;
    padding-bottom: 10px;
    text-align:left;
  }
  .search-wrap .logo-size {
    background-image: url("//s1.hdslb.com/bfs/static/jinkela/search/images/sprite-690be8a6ea.png");
    background-position: -261px -72px;
    width: 100px;
    height: 35px;
    float: left;
    margin-top: 7px;
  }
  .hotsearchs {
    text-align: center;
    margin-top: 13px;
}

.hotsearchs a {
    padding: 6px 10px;
    margin: 2px;
    border: 1px solid #d8d8d8;
    color: #878787;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    display: inline-block;
    font-size: 13px;
}

.hotsearchs a:hover {
    text-decoration: none;
    border: 1px solid #00a0f0;
    color: #00a0f0;
}

</style>
