//测试
export const test='/userInfo/login'//登陆
export const test2='/bigCategory/insert'//查询ById
//用户管理
export const userInsert='/user/insert' //添加（用户名唯一）
export const userSelect='/user/select'//查找所有（分页）
export const userUpdate='/user/update'//修改
export const userDelete='/user/delete'//删除
//库房管理
export const storageRoomInsert='/storageRoom/insert' //添加
export const storageRoomSelect='/storageRoom/select' //查找(动态，分页)
export const storageRoomDelete='/storageRoom/delete' //删除
export const storageRoomUpdate='/storageRoom/update'//更新
//商品资料管理
export const goodsInsert='/goods/insert'//添加
export const goodsDelete='/goods/delete'//删除
export const goodsUpdate='/goods/update'//更新
export const goodsSelect='/goods/select'//查找(动态，分页)
//采购单
export const purchaseOrderInsert='/purchaseOrder/insert'//采购商品
export const purchaseOrderSelect='/purchaseOrder/select'//采购单动态分页显示
export const purchaseOrderDelete='/purchaseOrder/delete'//删除
export const purchaseOrderSelectById='purchaseOrder/selectById'//获取采购单详情
export const purchaseOrderUpdate='/purchaseOrder/update'//更新采购单
//出入库
export const storageRoomInsertStorage='/storageRoom/insertStorage'//商品进库
export const storageRoomOutput='/storageRoom/output'//商品出库
//库存
export const storageRoomSetailSelect='/storageRoomDetail/select'//查找(动态，分页)
//销售单
export const salesSlipInsert='/salesSlip/insert'//销售商品
export const saleSlipSelect='/salesSlip/select' //销售单动态分页显示
export const saleSlipSelectDetal='/salesSlip/selectDetail'//获取销售单详情
export const saleSlipDelete='/salesSlip/delete'//删除
export const salesSlipUpdate='/salesSlip/update'//更新采购单
//登录
export const userInfoLogin= '/userInfo/login'//登陆
//省市区
export const provinceSelect='/province/select'//查找省份
export const provinceCity = '/province/selectCity'//查找市
export const provinceArea = '/province/selectArea'//查找区县