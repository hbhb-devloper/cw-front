<!--
 * @Descripttion:
 * @version:
 * @Author: CYZ
 * @Date: 2020-07-17 09:35:24
 * @LastEditors: CYZ
 * @LastEditTime: 2020-08-21 10:25:14
-->
<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <el-menu mode="horizontal">
      <el-menu-item
        v-for="(item,index) in sideRouters"
        :key="index"
        @click="handleStatus(index)"
      >{{item.meta.title}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
export default {
  data() {
    return {};
  },
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters(["navRouters", "sidebar", "sideRouters", "submen"])
  },
  mounted() {},
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
    handleStatus(index) {
      this.$store.dispatch("HANDLESIDEBAR", index);
      localStorage.setItem("NAVBARINDEX", index);
    }
  },
  name: "Navbar"
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 60px;
  z-index: 9;
  width: 100%;
  background: #409eff;
      min-height: 40px;
  .hamburger-container {
    line-height: 36px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    fill: #fff;
  }

  .el-menu {
    margin-left: 50px;
    background: inherit;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    &.el-menu--horizontal {
      border-bottom: 0;
    }

    .el-menu-item {
      height: 40px;
      line-height: 40px;
      /*width: 12.5%;*/
      text-align: center;
      color: #fff;
      border-bottom: none;

      &:hover,
      &:focus {
        background: rgba(255, 255, 255, 0.2);
        /*border-bottom: 2px solid #fff!important;*/
      }
    }
  }
}
</style>
