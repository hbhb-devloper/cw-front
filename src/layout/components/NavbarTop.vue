<template>
  <div class="navbar-top">
    <div>
      <div class="left-log">
        <img src="../../assets/image/log.png" alt />
        <text class="log-bolid"></text>
      </div>
      <div class="announce">
        <div class="title">公告栏:</div>
        <div class="textBox">
          <transition name="slide">
            <p class="text"  :key="text.id">{{text.val}}</p>
          </transition>
        </div>
      </div>
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <el-dropdown class="menus">
          <span class="el-dropdown-link">
            当前用户：
            <span class="el-icon-s-custom">{{name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link class="right-menu-item" to="/user/admin">联系管理员</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link class="right-menu-item" to="/user/profile">个人中心</router-link>
            </el-dropdown-item>
            <!--            <el-dropdown-item >-->
            <!--              <router-link class="right-menu-item" to="/user/profile">-->
            <!--                我的应用-->
            <!--              </router-link>-->
            <!--            </el-dropdown-item>-->
            <!--            <el-dropdown-item >-->
            <!--              <router-link class="right-menu-item" to="/user/profile">-->
            <!--                移动报表-->
            <!--              </router-link>-->
            <!--            </el-dropdown-item>-->
            <el-dropdown-item v-if="false">
              <router-link class="right-menu-item" to="/user/profile">个人中心</router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="false">
              <router-link class="right-menu-item" to="/user/profile">我的应用</router-link>
            </el-dropdown-item>
            <el-dropdown-item v-if="false">
              <router-link class="right-menu-item" to="/user/profile">移动报表</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <a class="right-menu-item" @click="logout()">退出</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Screenfull from "@/components/Screenfull";
import SizeSelect from "@/components/SizeSelect";
import Search from "@/components/HeaderSearch";
import RuoYiGit from "@/components/RuoYi/Git";
import RuoYiDoc from "@/components/RuoYi/Doc";
import { getInfo } from "@/api/login.js";
import {getNotice} from "@/api/system/notice"
import Stomp from "stompjs";

export default {
  data() {
    return {
      name: "",
      textArr: [
        // "1 预算执行用户手册已更新到文档区，请查阅",
        // "2 发起签报请选择“预算执行流程”",
        // "3 渠道电子发票导出模板问题已解决",
        // "4 渠道电子发票导出模板问题已解决",
      ],
      number: 0,
      client: Stomp.client("ws://mq.yeexun.com.cn:15674/ws"),
    };
  },
  components: {
    Screenfull,
    SizeSelect,
    Search,
    RuoYiGit,
    RuoYiDoc,
  },
  computed: {
    ...mapGetters(["avatar", "device",'notices']),
    setting: {
      get() {
        return this.$store.state.settings.showSettings;
      },
      set(val) {
        this.$store.dispatch("settings/changeSetting", {
          key: "showSettings",
          value: val,
        });
      },
    },
    text() {
      return {
        id: this.number,
        val: this.textArr[this.number],
      };
    },
  },
  watch:{
    notices(newval){
      this.handleNotice();
    }
  },
  created() {
    this.handleNotice();
    // this.connect();
    // if(window.name == ""){
    //   window.name = "isReload"; // 在首次进入页面时我们可以给window.name设置一个固定值
    // }else if(window.name == "isReload"){
    //   console.log("页面被刷新");
    //   this.handleNotice();
    // }
  },
  mounted() {
    this.handleInfo();
    this.startMove();
  },
  methods: {
    startMove() {
      // eslint-disable-next-line
      // let timer = setTimeout(() => {
      //   if (this.number === this.textArr.length-1) {
      //
      //     this.number = 0;
      //   } else {
      //     if(this.textArr.length-1===-1){
      //       clearTimeout(timer);
      //     }else if(this.textArr.length-1===0){
      //       this.number =0;
      //     }else{
      //       this.number +=1;
      //     }
      //   }
      //   this.startMove();
      //   console.log(this.number,this.textArr.length-1)
      // }, 2000); // 滚动不需要停顿则将2000改成动画持续时间
      let time=setInterval(()=>{
        if(this.number===this.textArr.length-1||this.textArr.length-1===0||this.textArr.length===0||this.number>this.textArr.length){
          this.number=0;
        }else if(this.textArr.length>0){
          this.number +=1;
        }
        console.log(this.number,this.textArr.length-1);
      },2000);

      // this.startMove()
    },
    handleNotice(){
      getNotice().then(res=>{
        console.log(res,999);
        this.textArr=res;
      })
    },
    handleInfo() {
      getInfo().then((res) => {
        this.name = res.userInfo.userName;
      });
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      });
    },

    onConnected: function () {
      const dest = "/queue/broadcast_queue";
      this.client.subscribe(dest, this.responseCallback, this.onFailed);
    },
    onFailed: function (frame) {
      console.log("MQ Failed: " + frame);
    },
    responseCallback: function (frame) {
      this.textArr=[];
      let obj = eval("("+frame.body+")");
      for(let key of obj){
        this.textArr.push(key);
      }
      console.log(this.textArr);
    },
    connect: function () {
      const headers = {
        login: "root",
        passcode: "cw_2020",
      };
      // 调试日志开关
      // this.client.debug = null;
      this.client.connect(headers, this.onConnected, this.onFailed);
    },
  },
};
</script>

<style lang="scss" scoped>
.announce {
  padding-left: 40px;
  display: flex;
  flex-direction: row;
}
.title {
  // padding: 20px 0;
  width: 80px;
  line-height: 50px;
  font-size: 19px;
  font-weight: bold;
}
.textBox {
  width: 400px;
  height: 50px;
  // margin: 0 auto;
  overflow: hidden;
  position: relative;
  line-height: 50px;
  // text-align: center;
}
.text {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-enter {
  transform: translateY(25px) scale(1);
  opacity: 1;
}
.slide-leave-to {
  transform: translateY(-25px) scale(0.8);
  opacity: 0;
}
.menus {
  font-size: 18px;
  box-sizing: border-box;
  padding-top: 15px;
}
.navbar-top {
  width: 100%;
  height: 60px;
  z-index: 99;
  overflow: hidden;
  position: fixed;
  padding: 5px 10px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .left-log {
    float: left;
    /*padding-right: 20px;*/
    /*border-right: 1px solid #b0b2b6;*/
    margin-left: 5px;

    img {
      /*border-right: 1px solid #b0b2b6;*/
      padding-right: 20px;
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 20px;
      height: 100%;
      line-height: 43px;
      font-size: 15px;
      color: #5a5e66;
      border-right: 1px solid #b0b2b6;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }

      &:last-child {
        border-right: 0;
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
