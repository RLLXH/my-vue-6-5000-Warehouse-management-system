import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/index.vue'
import Grad from '../pageDetail/grad.vue'
import Markey from '../pageDetail/markey.vue'
// import Index from '@/components/Index'
import StoreManageOut from '../pageDetail/StoreManageOut.vue'
import StoreManageOutDetail from '../pageDetail/storeManageout/storeManageOutDetail.vue'
import StoreManageIn from '../pageDetail/storeManageIn.vue'
import PurchasingManage from '../pageDetail/purchasingManage.vue'
import StoreManageInDetail from '../pageDetail/StoreManageIn/storeManagInDetail.vue'
import PurchasingManageAddNew from '../pageDetail/purchasingManage/purchasingManageAddNew.vue'
import PurchasingManageDetail from '../pageDetail/purchasingManage/purchasingManageDetail.vue'
import refundManageAddNew from '../pageDetail/refundManage/refundManageAddNew.vue'
import refundManageDetail from '../pageDetail/refundManage/refundManageDetail.vue'
import refundManage from '../pageDetail/refundManage.vue'
import orderManagement from '../pageDetail/orderManagement.vue'
import orderManagementAddNew from '../pageDetail/orderManagement/orderManagementAddNew.vue'
import orderManagementDetail from '../pageDetail/orderManagement/orderManagementDetail.vue'
import returnsManagement from '../pageDetail/returnsManagement.vue'
import returnsManagementAddNew from '../pageDetail/returnsManagement/returnsManagementAddNew.vue'
import returnsManagementDetail from '../pageDetail/returnsManagement/returnsManagementDetail.vue'
import warehouseDataManagement from '../pageDetail/warehouseDataManagement.vue'
import commodityDataManagement from '../pageDetail/commodityDataManagement.vue'
import commodityDataManagementAddNew from '../pageDetail/commodityDataManagement/commodityDataManagementAddNew.vue'
import totalInventory from '../pageDetail/totalInventory.vue'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/Index/Grad'
    },
    {
      path: '/Index',
      name: 'Index',
      component: Index,
      children: [{
        path: 'Grad',
        name: '首页',
        component: Grad,
      }, {
        path: 'Markey',
        name: '第二页',
        component: Markey
      }, {
        path: 'StoreManageOut',
        name: '出库管理',
        component: StoreManageOut
      }, {
        path: 'StoreManageOutDetail',
        name: '出库详情',
        component: StoreManageOutDetail
      }, {
        path: 'StoreManageIn',
        name: '入库管理',
        component: StoreManageIn
      },
      {
        path: 'StoreManageInDetail',
        name: '入库详情',
        component: StoreManageInDetail
      }, {
        path: 'PurchasingManage',
        name: '采购管理',
        component: PurchasingManage
      }, {
        path: 'PurchasingManageAddNew',
        name: '采购新增',
        component: PurchasingManageAddNew,
        meta:{
          keepAlive: true // 此组件需要被缓存
        }
      }, {
        path: 'PurchasingManageDetail',
        name: '采购详情',
        component: PurchasingManageDetail
      }, {
        path: 'refundManageAddNew',
        name: '退供新增',
        component: refundManageAddNew
      }, {
        path: 'refundManageDetail',
        name: '退供详情',
        component: refundManageDetail
      }, {
        path: 'refundManage',
        name: '退供管理',
        component: refundManage
      }, {
        path: 'orderManagementAddNew',
        name: '订单新增',
        component: orderManagementAddNew
      }, {
        path: 'orderManagementDetail',
        name: '订单详情',
        component: orderManagementDetail
      }, {
        path: 'orderManagement',
        name: '订单管理',
        component: orderManagement
      }, {
        path: 'returnsManagementAddNew',
        name: '退货新增',
        component: returnsManagementAddNew,
      }, {
        path: 'returnsManagementDetail',
        name: '退货详情',
        component: returnsManagementDetail
      }, {
        path: 'returnsManagement',
        name: '退货管理',
        component: returnsManagement
      },{
        path:'warehouseDataManagement',
        name:"库房资料管理",
        component:warehouseDataManagement
      },{
        path:'commodityDataManagement',
        name:'商品资料管理',
        component:commodityDataManagement
      },{
        path:'commodityDataManagementAddNew',
        name:'新增商品',
        component:commodityDataManagementAddNew
      },{
        path:'totalInventory',
        name:'总库存',
        component:totalInventory
      }

      ]
    }
  ]
})
