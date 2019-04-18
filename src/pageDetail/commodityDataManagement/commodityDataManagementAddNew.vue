<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="商品编号:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品类别:">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品品牌:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品属性:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品单价:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="供应商:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="供应渠道:">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in channel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品备注:">
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <el-row class="btnBox">
        <el-button>提交</el-button>
        <el-button @click="backBtn">返回</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      channel: [
        {
          value: "直送"
        },
        {
          value: "配送"
        }
      ],
      categories: [
        {
          value: "A类",
          label: "A类"
        },
        {
          value: "B类",
          label: "B类"
        },
        {
          value: "C类",
          label: "C类"
        },
        {
          value: "D类",
          label: "D类"
        }
      ], //商品类别
      dataList: [
        {
          name: "奶粉"
        }
      ]
    };
  },
  methods: {
    //返回
    backBtn() {
      this.$router.go(-1);
    },
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/refundManageAddNew",
        query: {}
      });
    },
    //详情
    detailBtn() {
      console.log("121");
      this.$router.push({
        path: "/Index/refundManageDetail",
        query: {}
      });
    },
    Btn() {
      this.$router.push({
        path: "/Index/Markey",
        query: {}
      });
    }
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.btnBox {
  text-align: center;
}
</style>
