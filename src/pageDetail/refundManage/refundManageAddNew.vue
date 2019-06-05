<template>
  <div>
    <div class="stepbox">
      <el-steps finish-status="success" :active="active" :space="200" class="setpboslit">
        <el-step title="选择退供商品"></el-step>
        <el-step title="生成退供单"></el-step>
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
        <el-form-item label="退供仓库:">
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
        <el-table-column label="库存" prop="goodsNumber"></el-table-column>
      </el-table>
    </div>
    <!-- 确认出库单 -->
    <div class="choseBbox" v-show="active==1">
      <el-form label-position="right" label-width="120px" :inline="true"   :model="postDate"
        ref="postDate"
        :rules="rules">
        <el-form-item label="退供仓库:">
          <el-select v-model="postDate.storageRoomId" disabled>
            <el-option
              v-for="(item,index) in storageRoomList"
              :key="index"
              :label="item.storageRoomName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货人:" prop="person">
          <el-input v-model="postDate.person"></el-input>
        </el-form-item>
        <el-form-item label="收货人电话:" prop="phone">
          <el-input v-model="postDate.phone"></el-input>
        </el-form-item>
        <el-form-item label="收货人地址：" prop="address">
          <!-- <el-input v-model="postDate.address"></el-input> -->
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

        <!-- <el-form-item label="退供单号：">
          <el-input v-model="postDate.saleCode"></el-input>
        </el-form-item>-->
        <el-form-item label="退供方式：" prop="salesSlipMethod">
          <el-select v-model="postDate.salesSlipMethod">
            <el-option value="直供" label="直供"></el-option>
          </el-select>
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
        <el-table-column label="库存" prop="goodsNumber"></el-table-column>
        <el-table-column label="商品数量" prop="num">
          <template slot-scope="scope">
            <div>
              <el-input v-model="scope.row.num" @input="inpuNum(scope.row)"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品总价" prop="name">
          <template slot-scope="scope">
            <div>
              <span>{{scope.row.num?scope.row.num*scope.row.goodsDTO.goodsPrice:''}}</span>
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
  storageRoomSetailSelect,
  storageRoomSelect,
  salesSlipInsert,
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
        arrivalTime: "",
        endTime: "",
        pageNum: 0,
        pageSize: 0,
        person: "",
        phone: "",
        // saleCode: "",
        saleType: "退供",
        salesSlipDetailForms: [],
        salesSlipMethod: "",
        startTime: "",
        status: "",
        storage: false,
        storageRoomId: null,
        storeTime: ""
      },
      theQuery: {
        goodsName: null
      },
      active: 0,
      dataList: [],
      theSelection: [],
      storageRoomList: [],
        rules: {
        person: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true, validator: this.$Mytools.regInputPhone, trigger: "blur" }],
        // address: [{ required: true, message: "请选择", trigger: "change" }],
        addressDetail: [{ required: true, message: "请输入", trigger: "blur" }],
        salesSlipMethod: [
          { required: true, message: "请选择", trigger: "change" }
        ],
        arrivalTime: [{ required: true, message: "请选择", trigger: "change" }]
      }
    };
  },
  created() {
    this.getstorageRoomList();
     this.gitSelect();
  },
  methods: {
    //输入数量验证
    inpuNum(row){
      console.log(row)
      if(row.num>row.goodsNumber){
        row.num=null;
        this.$message.warning('商品数量不能大于库存，请重新输入')
      }
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
    },
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
      if (this.postDate.storageRoomId != "") {
        let body = {
          goodsName: this.theQuery.goodsName,
          pageNum: 1,
          pageSize: 200000,
          storageRoomName: ""
        };
        this.storageRoomList.map((v, k) => {
          if (v.id == this.postDate.storageRoomId) {
            body.storageRoomName = v.storageRoomName;
          }
        });
        axios.post(storageRoomSetailSelect, body).then(data => {
          console.log(data);
          this.dataList = data.content;
        });
      } else {
        this.$message.warning("请先选择库房");
      }
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
          goodsId: v.goodsDTO.id,
          goodsNumber: v.num - 0
        };
        this.postDate.salesSlipDetailForms.push(obj);
        }else{
          this.$message.warning('请输入商品数量')
          flag = false
        }
       
      });
      if(flag){
          let data = this.postDate;
      axios.post(salesSlipInsert, data).then(data => {
        console.log(data);
        this.$message.success("添加成功");
        this.$router.go(-1);
      }); }
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

