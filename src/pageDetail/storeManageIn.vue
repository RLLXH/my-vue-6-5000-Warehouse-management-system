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
    </el-row>-->
    <el-table :data="dataList" style="width: 100%" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <div>
            <el-button type="text" @click="detailBtn(scope.row.id)">查看</el-button>
            <el-button type="text" v-if="!scope.row.storage" @click="inBtn(scope.row)">入库</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单号" prop="purchaseCode"></el-table-column>
      <el-table-column label="类型" prop="purchaseType"></el-table-column>
      <el-table-column label="状态" prop="storage">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storage?'已入库':'未入库'}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="入库库房">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.storageRoomDTO?scope.row.storageRoomDTO.storageRoomName:''}}</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="采购数量" prop="name"></el-table-column> -->
      <el-table-column label="入库时间" prop="storeTime"></el-table-column>
      <el-table-column label="方式" prop="purchaseMethod"></el-table-column>
      <el-table-column label="供货方" prop="supplier"></el-table-column>
    </el-table>
    <paging v-on:pageFlag="pageFlag" :pageNum="pageNum" :theQuery="theQuery"></paging>
  </div>
</template>
<script>
import axios from "../api/axios.js";
import {
  purchaseOrderSelect,
  storageRoomInsertStorage
} from "../api/address.js";
export default {
  data() {
    return {
      pageNum: "",
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
        purchaseOrderDetailFormList: [],
        purchaseTime: "",
        purchaseType: "",
        purchaserName: "",
        storage: null,
        storageRoomId: null,
        supplier: ""
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
    inBtn(row) {
      let data = {
        id: row.id,
        person: this.$store.state.loading.user.name,
        storageRoomId: row.storageRoomDTO.id
      };
      axios.post(storageRoomInsertStorage, data).then(data => {
        this.$message.success("入库成功");
        this.getList();
      });
    },
    //详情
    detailBtn(row) {
      console.log("121");
      this.$router.push({
        path: "/Index/StoreManageInDetail",
        query: {id:row}
      });
    },
    getList() {
      axios.post(purchaseOrderSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
        this.pageNum = data.totalElements;
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
