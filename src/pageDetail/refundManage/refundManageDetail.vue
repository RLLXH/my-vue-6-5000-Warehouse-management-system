<template>
  <div>
    <div>
      <el-form label-position="right" label-width="120px" :inline="true">
        <el-row>
          <el-col :span="8">
            <el-form-item label="订单单号：">
              <span>{{detailData.saleCode}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单类型：">
              <span>{{detailData.saleType}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <span>{{detailData.storage?'已出库':'未出库'}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="创建时间：">
              <span>{{detailData.createTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="预计到货时间：">
              <span>{{detailData.storeTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="发货仓库：">
              <span>{{detailData.storageRoomDTO?detailData.storageRoomDTO.storageRoomName:''}}</span>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item label="订单数量：">
             <span>{{detailData.}}</span>
            </el-form-item>
          </el-col>-->
          <!-- <el-col :span="8">
            <el-form-item label="订单金额：">
             <span>{{detailData.}}</span>
            </el-form-item>
          </el-col>-->
          <el-col :span="8">
            <el-form-item label="收货人：">
              <span>{{detailData.person}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人电话：">
              <span>{{detailData.phone}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="收货人地址：">
              <span>{{detailData.address}}</span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="详细地址：">
              <span>{{detailData.addressDetail}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-row>
      <span>订单商品列表</span>
    </el-row>
    <el-table :data="this.detailData.salesSlipDetailDTOS" border>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="商品名称" prop="goodsName">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsName}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="商品编号" prop="goodsCode">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsCode}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商类类别" prop="category">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.category}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品属性" prop="goodsAttributel">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsAttributel}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品单价" prop="goodsPrice">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsPrice}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应商" prop="goodsSupplier">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsSupplier}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="供应渠道" prop="goodsChannel">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsDTO.goodsChannel}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="库存" prop="storageNum"></el-table-column>
      <el-table-column label="商品数量" prop="goodsNumbe">
           <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsNumber}}</span>
          </div>
        </template>
     
      </el-table-column>
      <el-table-column label="商品总价" prop="name">
        <template slot-scope="scope">
          <div>
            <span>{{scope.row.goodsNumber?scope.row.goodsNumber*scope.row.goodsDTO.goodsPrice:''}}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="btnBox">
       <!-- <el-button @click="updatedBtn">提交</el-button> -->
      <el-button @click="$router.go(-1)">返回</el-button>
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import { saleSlipSelectDetal,storageRoomSetailSelect,salesSlipUpdate } from "../../api/address.js";
export default {
  data() {
    return {
    
    detailData:{}
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      axios
        .post(saleSlipSelectDetal + "?id=" + this.$route.query.id)
        .then(data => {
          console.log(data, "销售单详情");
          this.detailData=data;
          this.dataList=data.salesSlipDetailDTOS
          this.detailData.salesSlipDetailDTOS.map((v,k)=>{
             let  theQuery= {
                    goodsName: v.goodsDTO.goodsName,
                    pageNum: 1,
                    pageSize: 20,
                    storageRoomName: this.detailData.storageRoomDTO.storageRoomName
              }
        axios.post(storageRoomSetailSelect, theQuery).then(data => {
        console.log(data, "库存");
        v.storageNum=data.content[0].goodsNumber
      })
          })
        });
    },
    updatedBtn() {
      axios.put(salesSlipUpdate,this.detailData).then(data=>{
        this.$message.success('修改成功')
        this.$router.go(-1);
      })
    },
  }
};
</script>
<style lang="less">
.addBtn {
  margin: 10px 0px;
}
.btnBox {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
</style>
