<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="库房:">
          <el-input v-model="theQuery.storageRoomName"></el-input>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input v-model="theQuery.goodsName"></el-input>
        </el-form-item>
       
        <el-form-item label=" ">
          <el-button @click='getList'>查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>-->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row)">查看</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库房" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storageRoomDTO.storageRoomName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库房地址" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storageRoomDTO.address}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsName}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存数量" prop="goodsNumber"></el-table-column>
      <el-table-column label="商品属性" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsAttributel}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="更新时间" prop="updateTime"></el-table-column>
    </el-table>
     <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import { storageRoomSetailSelect } from "../api/address.js";
export default {
  data() {
    return {
      pageNum:'',
      theQuery: {
        goodsName: "",
        pageNum: 1,
        pageSize: 20,
        storageRoomName: ""
      },
      dataList: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
      pageFlag: function(data) {
      this.theQuery.pageNum = data.pageNo;
      this.theQuery.pageSize = data.pageSize;
      this.getList();
    },
    getList() {
      axios.post(storageRoomSetailSelect, this.theQuery).then(data => {
        console.log(data, "总库存");
        this.dataList = data.content;
        this.pageNum=data.totalElements;
      });
    },
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/commodityDataManagementAddNew",
        query: {}
      });
    },
    //详情
    detailBtn(row) {
      console.log(row)
      this.$router.push({
        path: "/Index/totalInventoryDetail",
        query: {row:row}
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
