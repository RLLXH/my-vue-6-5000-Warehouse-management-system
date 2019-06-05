<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true" :model="theQuery">
        <el-form-item label="单号:">
          <el-input v-model="theQuery.saleCode"></el-input>
        </el-form-item>
        <el-form-item label="类型:">
      
        <el-select v-model="theQuery.saleType">
            <el-option value='退供' label='退供'></el-option>
            <el-option value='销售' label="销售"></el-option>
          </el-select>
        </el-form-item>
           <el-form-item label="状态:">
          <el-select v-model="theQuery.storage">
            <el-option :value='true' label="已出库"></el-option>
            <el-option :value='false' label="未出库"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
         <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- <el-row>
      <el-button class="addBtn" @click="AddnewBtn">增加</el-button>
    </el-row> -->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
             <el-button type="text" v-if="!scope.row.storage" @click="outBtn(scope.row)">出库</el-button>
          </div>
        </template>
      </el-table-column>
         <el-table-column label="单号" prop="saleCode"></el-table-column>
      <el-table-column label="类型" prop="saleType"></el-table-column>
      <el-table-column label="状态" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storage?'已出库':'未出库'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="出库库房" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storageRoomDTO?scope.row.storageRoomDTO.storageRoomName:''}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="出库时间" prop="storeTime"></el-table-column>
      <el-table-column label="供货方式" prop="salesSlipMethod"></el-table-column>
    </el-table>
     <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
    <!-- <el-button @click="Btn">跳转</el-button> -->
  </div>
</template>
<script>
import axios from "../api/axios.js";
import { saleSlipSelect,storageRoomOutput } from "../api/address.js";
export default {
  data() {
    return {
      dataList: [],
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
        saleType: "",
        salesSlipDetailForms: [
        ],
        salesSlipMethod: "",
        startTime: "",
        status: "",
        storage: null,
        storageRoomId: null,
        storeTime: ""
      },
    };
  },
  created(){
    this.getList();
  },
  methods: {
    pageFlag: function(data) {
      this.theQuery.pageNum = data.pageNo;
      this.theQuery.pageSize = data.pageSize;
      this.getList();
    },
      outBtn(row) {
      let data = {
        id: row.id,
        person: this.$store.state.loading.user.name,
        storageRoomId: row.storageRoomDTO.id
      };
      axios.post(storageRoomOutput, data).then(data => {
        this.$message.success("出库成功");
        this.getList();
      });
    },
    getList() {
      axios.post(saleSlipSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList=data.content;
         this.pageNum=data.totalElements;
      });
    },
    //新增
    AddnewBtn(){
      this.$router.push({
        path:'/Index/StoreManageOutAddNew',
        query:{}
      })
    },
    //详情
    detailBtn(row){
      console.log('121')
      this.$router.push({
        path:'/Index/StoreManageOutDetail',
        query:{id:row}
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
