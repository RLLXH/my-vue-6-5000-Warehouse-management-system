<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="入库单号:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="入库类型:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="入库时间:">
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
      <el-table-column label="操作" width="80">
        <template>
          <div>
            <el-button type="text" @click="detailBtn">查看</el-button>
          
          </div>
        </template>
      </el-table-column>
        <el-table-column label="入库单号" prop="name"></el-table-column>
        <el-table-column label="入库类型" prop="name"></el-table-column>
        <el-table-column label="状态" prop="name"></el-table-column>
        <el-table-column label="入库仓库" prop="name"></el-table-column>
        <el-table-column label="入库数量" prop="name"></el-table-column>
        <el-table-column label="入库时间" prop="name"></el-table-column>
    </el-table>
    <!-- <el-button @click="Btn">跳转</el-button> -->
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
    //详情
    detailBtn(){
      console.log('121')
      this.$router.push({
        path:'/Index/StoreManageInDetail',
        query:{}
      })
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
.addBtn{
    margin: 10px 0px;
}
</style>
