<!--
 * @Descripttion: 
 * @version: 
 * @Author: CYZ
 * @Date: 2020-07-03 09:49:21
 * @LastEditors: CYZ
 * @LastEditTime: 2020-07-20 18:14:27
--> 
<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="settings.theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in submen"
          :key="route.path  + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/assets/styles/variables.scss";

export default {
  data() {
    return {
      //   submen: [],
      navindex: localStorage.getItem("NAVBARINDEX")
    };
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapState(["settings"]),
    ...mapGetters(["sideRouters", "sidebar", "device", "submen"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  watch: {
    sidebar() {
      console.log("submen:" + this.submen);
    }
  },
  created() {
    this.showwubmen();
  },
  methods: {
    showwubmen() {
      this.$store.dispatch("HANDLESIDEBAR", this.navindex);
    }
  }
};
</script>
