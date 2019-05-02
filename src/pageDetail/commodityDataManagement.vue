<template>
  <div>
    <div>
      <el-form label-position="right" label-width="100px" :inline="true">
        <el-form-item label="商品编号:">
          <el-input v-model="theQuery.goodsCode"></el-input>
        </el-form-item>
        <el-form-item label="商品类别:">
          <el-input v-model="theQuery.category"></el-input>
        </el-form-item>
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
           
            <el-button type="text" @click="updateBtn(scope.row)">修改</el-button>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="goodsName"></el-table-column>
      <el-table-column label="商品编号" prop="goodsCode"></el-table-column>
      <el-table-column label="商类类别" prop="category"></el-table-column>
      <el-table-column label="商品属性" prop="goodsAttributel"></el-table-column>
      <el-table-column label="商品单价" prop="goodsPrice"></el-table-column>
      <el-table-column label="供应商" prop="goodsSupplier"></el-table-column>
      <el-table-column label="供应渠道" prop="goodsChannel"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "../api/axios.js";
import { goodsSelect } from "../api/address.js";
export default {
  data() {
    return {
      dataList: [
        {
          name: "奶粉"
        }
      ],
      theQuery: {
        category: null,
        goodsAttributel: null,
        goodsChannel: null,
        goodsCode: null,
        goodsName: null,
        goodsPrice: "",
        goodsSupplier: null,
        goodsType: null,
        pageNum: 1,
        pageSize: 20,
        priceType: null
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios.post(goodsSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
      });
    },
    //新增
    AddnewBtn() {
      this.$router.push({
        path: "/Index/commodityDataManagementAddNew",
        query: {}
      });
    },
    //修改
    updateBtn(row) {
      this.$router.push({
        path: "/Index/commodityDataManagementAddNew",
        query: { row: row }
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
