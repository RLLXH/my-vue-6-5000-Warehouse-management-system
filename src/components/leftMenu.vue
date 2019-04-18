<template>
  <div class="all">
    <el-menu router unique-opened>
      <el-menu-item-group>
        <el-submenu index="1">
          <template slot="title">
            <span>基础资料管理</span>
          </template>
           <el-menu-item index="/Index/warehouseDataManagement">库房资料管理</el-menu-item>
           <el-menu-item index="/Index/commodityDataManagement">商品资料管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>库房管理</span>
          </template>
           <el-menu-item index="/Index/totalInventory">总库存</el-menu-item>
           <el-menu-item index="/Index/StoreManageOut">出库管理</el-menu-item>
            <el-menu-item index="/Index/StoreManageIn">入库管理</el-menu-item>
            <!-- <el-menu-item index="/Index/Grad">调拨管理</el-menu-item> -->
          </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>订单管理</span>
          </template>
           <el-menu-item index="/Index/orderManagement">订单管理</el-menu-item>
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
    return {};
  }
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
