<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="库房:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="进货状态:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="销售状态:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row> -->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="180">
        <template>
          <div>
            <el-button type="text" @click="detailBtn">查看</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库房" prop="name"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="库存数量" prop="name"></el-table-column>
      <el-table-column label="销售状态" prop="name"></el-table-column>
      <el-table-column label="进货状态" prop="name"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataList: [
        {
          name: "奶粉"
        }
      ]
    };
  },
  methods: {
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/commodityDataManagementAddNew",
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
</style>
