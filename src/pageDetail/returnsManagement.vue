<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="退货单号:">
          <el-input v-model="theQuery.purchaseCode"></el-input>
        </el-form-item>
        <el-form-item label="退货方式:">
          <el-input v-model="theQuery.purchaseMethod"></el-input>
        </el-form-item>
        <!-- <el-form-item label="退货仓库:">
          <el-input v-model="theQuery.purchaseMethod"></el-input>
        </el-form-item> -->
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row>
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div>
            
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button type="text" v-if='scope.row.storage' @click="deleteBtn(scope.row.id)">删除</el-button>
            <el-button type="text" v-if='!scope.row.storage' @click="updateBtn(scope.row.id)">修改</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="退货单号" prop="purchaseCode"></el-table-column>
      <el-table-column label="类型" prop="purchaseType"></el-table-column>
      <el-table-column label="退货状态" prop="storage">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storage?'已入库':'未入库'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="退货仓库">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storageRoomDTO?scope.row.storageRoomDTO.storageRoomName:''}}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="退货数量" prop="name"></el-table-column> -->
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="退货方式" prop="purchaseMethod"></el-table-column>
      <el-table-column label="供货方" prop="supplier"></el-table-column>
       <el-table-column label="预计到货时间" prop="arrivalTime"></el-table-column>
    </el-table>
     <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
 
  </div>
</template>
<script>
import axios from "../api/axios.js";
import { purchaseOrderSelect,purchaseOrderDelete } from "../api/address.js";
export default {
  data() {
    return {
      pageNum:'',
      dataList: [],
      theQuery: {
        address: "",
        addressDetail: "",
        arrivalTime: "",
        consignor: "",
        pageNum: 1,
        pageSize: 20,
        phone: "",
        purchaseCode: "",
        purchaseMethod: "",
        purchaseOrderDetailFormList: [
        ],
        purchaseTime: "",
        purchaseType: "退货",
        purchaserName: "",
        storage: null,
        storageRoomId: null,
        supplier: ""
      }
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
    //删除订单
    deleteBtn(row){
      axios.delete(purchaseOrderDelete+'?id='+row).then(data=>{
        this.$message.success('删除成功')
        this.getList();
      })
    },
    getList() {
      axios.post(purchaseOrderSelect,this.theQuery).then(data => {
        console.log(data);
        this.dataList=data.content
        this.pageNum=data.totalElements;
      });
    },
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/returnsManagementAddNew",
        query: {}
      });
    },
    //修改
    updateBtn (row) {
        this.$router.push({
        path: "/Index/returnsManagementUpdate",
        query: {id:row}
      });
    },
    //详情
    detailBtn(row) {
      this.$router.push({
        path: "/Index/returnsManagementDetail",
        query: {id:row}
      });
    },

  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
</style>
