<template>
  <div>
    <div class="stepbox">
      <el-steps finish-status="success" :active="active" :space="200" class="setpboslit">
        <el-step title="选择采购商品"></el-step>
        <el-step title="生成采购单"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
    </div>
    <!-- 选中出库商品 -->
    <div class="choseBbox" v-show="active==0">
      <el-form
        label-position="right"
        label-width="100px"
        :inline="true"
        :model="postDate"
        ref="postDate"
      >
        <el-form-item label="采购仓库:">
          <el-select v-model="postDate.storageRoomId">
            <el-option
              v-for="(item,index) in storageRoomList"
              :key="index"
              :label="item.storageRoomName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input v-model="theQuery.goodsName"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button @click="getList">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="dataList" style="width: 100%" border @selection-change="selection">
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品编号" prop="goodsCode"></el-table-column>
        <el-table-column label="商类类别" prop="category"></el-table-column>
        <el-table-column label="商品属性" prop="goodsAttributel"></el-table-column>
        <el-table-column label="商品单价" prop="goodsPrice"></el-table-column>
        <el-table-column label="供应商" prop="goodsSupplier"></el-table-column>
        <el-table-column label="供应渠道" prop="goodsChannel"></el-table-column>
      </el-table>
    </div>
    <!-- 确认出库单 -->
    <div class="choseBbox" v-show="active==1">
      <el-form
        label-position="right"
        label-width="120px"
        :inline="true"
        :model="postDate"
        ref="postDate"
        :rules="rules"
      >
        <el-form-item label="采购仓库:">
          <el-select v-model="postDate.storageRoomId" disabled>
            <el-option
              v-for="(item,index) in storageRoomList"
              :key="index"
              :label="item.storageRoomName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发货人:" prop="consignor">
          <el-input v-model="postDate.consignor"></el-input>
        </el-form-item>
        <el-form-item label="发货人电话:" prop="phone">
          <el-input v-model="postDate.phone"></el-input>
        </el-form-item>
        <el-form-item label="发货人地址：" prop="address">
          <el-cascader
            :options="options"
            v-model="address"
            @active-item-change="handleItemChange"
            :props="props"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址：" prop="addressDetail">
          <el-input v-model="postDate.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="采购方式：" prop="purchaseMethod">
          <!-- <el-input v-model="postDate.purchaseMethod"></el-input> -->
          <el-select v-model="postDate.purchaseMethod">
            <el-option value="直供" label="直供"></el-option>
            <el-option value="配送" label="配送"></el-option>
            <!-- <el-option value="1" label="dai'fa"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="供货方：" prop="supplier">
          <el-input v-model="postDate.supplier"></el-input>
        </el-form-item>
        <el-form-item label="预计到货时间：" prop="arrivalTime">
          <el-date-picker v-model="postDate.arrivalTime" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
      </el-form>
      <el-table :data="theSelection" style="width: 100%" border>
        <el-table-column label="序号" type="index" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteBtn(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="goodsName"></el-table-column>
        <el-table-column label="商品编号" prop="goodsCode"></el-table-column>
        <el-table-column label="商类类别" prop="category"></el-table-column>
        <el-table-column label="商品属性" prop="goodsAttributel"></el-table-column>
        <el-table-column label="商品单价" prop="goodsPrice"></el-table-column>
        <el-table-column label="供应商" prop="goodsSupplier"></el-table-column>
        <el-table-column label="供应渠道" prop="goodsChannel"></el-table-column>
        <el-table-column label="商品数量" prop="num">
          <template slot-scope="scope">
            <div>
              <el-input v-model="scope.row.num"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品总价" prop="name">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.num?scope.row.num*scope.row.goodsPrice:''}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="btnBox">
      <el-button @click="nextBtn" v-if="active==0">下一步</el-button>
      <el-button @click="backBtn" v-if="active==0">返回</el-button>
      <el-button @click="prveBtn" v-if="active==1">上一步</el-button>
      <el-button @click="postBtn('postDate')" v-if="active==1">提交</el-button>
    </div>
  </div>
</template>
<script>
import axios from "../../api/axios.js";
import {
  goodsSelect,
  storageRoomSelect,
  purchaseOrderInsert,
  provinceSelect,
  provinceCity,
  provinceArea
} from "../../api/address.js";
export default {
  data() {
    return {
      options: [],
      address: null,
      props: {
        label: "province",
        value: "provinceid",
        children: "children"
      },
      postDate: {
        address: "",
        addressDetail: "",
        arrivalTime: "", //到货时间
        consignor: "", //发货人
        phone: "", //电话
        // purchaseCode: "", //采购单号
        purchaseMethod: "", //采购方式
        purchaseOrderDetailFormList: [],
        purchaseTime: "", //采购时间
        purchaseType: "采购", //采购类型
        purchaserName: "",
        storage: false,
        storageRoomId: "",
        supplier: ""
      },
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
        pageSize: 20000,
        priceType: null
      },
      active: 0,
      dataList: [],
      theSelection: [],
      storageRoomList: [],
      rules: {
        consignor: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true,   validator: this.$Mytools.regInputPhone, trigger: "blur" }],
        // address: [{ required: true, message: "请选择", trigger: "change" }],
        addressDetail: [{ required: true, message: "请输入", trigger: "blur" }],
        purchaseMethod: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        supplier: [{ required: true, message: "请输入", trigger: "blur" }],
        arrivalTime: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  created() {
    this.getList();
    this.getstorageRoomList();
    this.gitSelect();
  },
  methods: {
    getstorageRoomList() {
      let data = {
        address: "",
        contactsPerson: "",
        createPerson: "",
        pageNum: 1,
        pageSize: 2000,
        phone: "",
        prohibit: null,
        storageRoomCode: "",
        storageRoomName: ""
      };
      axios.post(storageRoomSelect, data).then(data => {
        console.log(data);
        this.storageRoomList = data.content;
      });
    },
    getList() {
      axios.post(goodsSelect, this.theQuery).then(data => {
        console.log(data);
        this.dataList = data.content;
      });
    },
    postBtn(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            this.options.map(v=>{
       if(v.provinceid == this.address[0]){
         this.postDate.address = v.province;
         v.children.map(v1=>{
            if(v1.provinceid == this.address[1]){
         this.postDate.address += v1.province;
         v1.children.map(v2=>{
           if(v2.provinceid == this.address[2]){
             this.postDate.address += v2.province;
           }
         })
         }
         })
       }
     })
          let flag = true
          this.theSelection.map((v, k) => {
            if(v.num){
                let obj = {
              goodsId: v.id,
              goodsNumber: v.num - 0
            };
            this.postDate.purchaseOrderDetailFormList.push(obj);
            }else{
              this.$message.warning('请输入商品数量')
              flag = false;
            }
          });
    if(flag){
          let data = this.postDate;
          axios.post(purchaseOrderInsert, data).then(data => {
            console.log(data);
            this.$message.success("添加成功");
            this.$router.go(-1);
          });
    }
        
        }
      });
    },
    deleteBtn() {},
    backBtn() {
      this.$router.go(-1);
    },
    prveBtn() {
      this.active--;
    },
    nextBtn() {
      if (this.theSelection.length>0 && this.postDate.storageRoomId) {
        this.active++;
      } else {
        this.$message.warning("请选择库房和商品");
      }
    },
    //选中商品时
    selection(list) {
      this.theSelection = list;
    },
    //级联
    handleItemChange(val) {
      axios.post(provinceCity + "?procinceid=" + val[0]).then(data => {
        this.options.map((v, k) => {
          if (v.provinceid == val[0]) {
            this.$set(v, "children", data);
            v.children.map((v1, k1) => {
              this.$set(v1, "province", v1.city);
              this.$set(v1, "provinceid", v1.cityid);
              v1.children = [];
              this.options.push();
            });
          }
        });
      });
      if (val[1]) {
        axios.post(provinceArea + "?cityid=" + val[1]).then(data => {
          this.options.map(v => {
            if (v.provinceid == val[0]) {
              v.children.map(v1 => {
                if (v1.provinceid == val[1]) {
                  v1.children = data;
                  v1.children.map(v3 => {
                    this.$set(v3, "province", v3.area);
                    this.$set(v3, "provinceid", v3.areaid);
                    this.options.push();
                  });
                }
              });
            }
          });
        });
      }
     
    },
    //获取省
    gitSelect() {
      axios.post(provinceSelect).then(data => {
        this.options = data;
        this.options.map((v, k) => {
          v.children = [];
        });
        this.options.push();
      });
    }
  }
};
</script>
<style lang="less" scoped>
.setpboslit {
  width: 500px;
  margin: 0 auto;
}
.btnBox {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}
.spanBox {
  width: 210px;
  display: block;
}
</style>

