<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="订单单号:">
          <el-input v-model="theQuery.saleCode"></el-input>
        </el-form-item>
        <el-form-item label="订单时间:">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button>查询</el-button>
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
            <el-button type="text" @click="mobileBtn(scope.row.id)" v-if="!scope.row.storage">修改</el-button>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button type="text" @click="deleteBtn(scope.row.id)" v-if="!scope.row.storage">删除</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="退供单号" prop="saleCode"></el-table-column>
      <el-table-column label="类型" prop="saleType"></el-table-column>
      <el-table-column label="状态" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storage?'已出库':'未出库'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="订单仓库" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storageRoomDTO?scope.row.storageRoomDTO.storageRoomName:''}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="供货方式" prop="salesSlipMethod"></el-table-column>
      <el-table-column label="预计到货时间" prop="arrivalTime"></el-table-column>
    </el-table>
     <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import { saleSlipSelect,saleSlipDelete  } from "../api/address.js";
export default {
  data() {
    return {
      pageNum:'',
      theQuery: {
        address: "",
        addressDetail: "",
        arrivalTime: "",
        endTime: "",
        pageNum: 1,
        pageSize: 20,
        person: "",
        phone: "",
        saleCode: "",
        saleType: "退供",
        salesSlipDetailForms: [],
        salesSlipMethod: "",
        startTime: "",
        status: "",
        storage: null,
        storageRoomId: null,
        storeTime: ""
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
    deleteBtn(row){
      axios.delete(saleSlipDelete+'?id='+row).then(data=>{
        this.$message.success('删除成功')
        this.getList();
      })
    },
    getList() {
      axios.post(saleSlipSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList=data.content;
       this.pageNum=data.totalElements;
      });
    },
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/refundManageAddNew",
        query: {}
      });
    },
     mobileBtn(row) {
      this.$router.push({
        path: "/Index/refundManageMobile",
        query: {id:row}
      });
    },
    //详情
    detailBtn(row) {
   
      this.$router.push({
        path: "/Index/refundManageDetail",
        query: {id:row}
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
