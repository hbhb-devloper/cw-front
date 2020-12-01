<template>
  <el-row :gutter="40" class="panel-group">
    <el-col
      style="flex: 1"
      class="card-panel-col"
      v-for="(item, index) in workList"
      :key="index"
    >
      <div
        class="card-panel"
        @click="handleSetLineChartData(item.module, item.moduleName)"
      >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ item.moduleName }}</div>
          <count-to
            :start-val="0"
            :end-val="item.count"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>
    <!-- <el-col style="flex: 1" class="card-panel-col">
      <div
        class="card-panel"
        @click="
          handleSetLineChartData(workList[1].module, workList[1].moduleName)
        "
      >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ workList[1].moduleName }}</div>
          <count-to
            :start-val="0"
            :end-val="workList[1].count"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col> -->
    <!-- <el-col style="flex: 1" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData(workList[2].module, workList[2].moduleName)">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">{{ workList[2].moduleName }}</div>
          <count-to
            :start-val="0"
            :end-val="workList[2].count"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col> -->
    <!-- <el-col style="flex:1" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            订单
          </div>
          <count-to :start-val="0" :end-val="13600" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col> -->
  </el-row>
</template>

<script>
import CountTo from "vue-count-to";

export default {
  props: {
    workList: {
      type: Array,
      default() {
        return [
          { moduleName: "", module: undefined },
          { moduleName: "", module: undefined },
          { moduleName: "", module: undefined },
        ];
      },
    },
  },
  components: {
    CountTo,
  },
  watch: {
    workList: {
      deep: true,
      handler(val) {
        // this.$next(() => {
          this.workList = val;
        // });
      },
    },
  },
  mounted() {},
  methods: {
    handleSetLineChartData(module1, moduleName) {
      this.$emit("selectModule", module1, moduleName);
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    // box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
