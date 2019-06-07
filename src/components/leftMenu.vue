<template>
  <div class="all" v-if="this.$store.state.loading.user">
    <el-menu router unique-opened>
      <el-menu-item-group>
        <el-submenu index="1" v-if="this.description <=2 ">
          <template slot="title">
            <span>基础资料管理</span>
          </template>
           <el-menu-item index="/Index/warehouseDataManagement" >库房资料管理</el-menu-item>
           <el-menu-item index="/Index/commodityDataManagement">商品资料管理</el-menu-item>
           <el-menu-item index="/Index/UserManagement" v-if="this.description <=1 ">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>库房管理</span>
          </template>
           <el-menu-item index="/Index/totalInventory">总库存</el-menu-item>
           <el-menu-item index="/Index/StoreManageOut"  v-if="this.description <=2 ">出库管理</el-menu-item>
            <el-menu-item index="/Index/StoreManageIn"  v-if="this.description <=2 ">入库管理</el-menu-item>
            <!-- <el-menu-item index="/Index/Grad">调拨管理</el-menu-item> -->
          </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>订单管理</span>
          </template>
           <el-menu-item index="/Index/orderManagement">销售管理</el-menu-item>
            <el-menu-item index="/Index/returnsManagement">退货管理</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>采购管理</span>
          </template>
           <el-menu-item index="/Index/PurchasingManage">采购管理</el-menu-item>
            <el-menu-item index="/Index/refundManage">退供管理</el-menu-item>
        </el-submenu>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
        description:'3',
    };
  },
  created(){
    this.$store.commit('loading/setUser',JSON.parse(sessionStorage.getItem('user')))
    this.description = this.$store.state.loading.user.roleDTOS[0].description;
    console.log(this.description,'12312')
  },
};
</script>
<style scoped lang='less'>
@percent: 100%;
.all {
  height: @percent;
    background-color:	#F5F5F5;
  .el-menu{
    border: none!important;
      
  //  .el-menu{
  //      background-color: seagreen;
  //      .el-menu-item-group .el-submenu .el-menu{
  //           background-color: seagreen!important;
  //      }

       }
}
</style>
