import instance from "./request";

//登录  user/login  
export const loginApi=(data)=>instance.post('/user/login',data)
//获取用户信息  user/info/admin
export const userinfoApi=()=>instance.get('user/info/admin')

//退出登录 user/logout  
export const loginoutApi=(data)=>instance.post('user/logout',data)

//会员数据  member/list/search/1/20
export const memberApi=(a,b,data)=>instance.post(`member/list/search/${a}/${b}`,data)
//会员添加 member
export const addmemberApi=(data)=>instance.post('member',data)
//会员编辑数据 member/10
export const memberinfoApi=(id)=>instance.get(`member/${id}`)
//会员编辑  member/10
export const editmemberinfoApi=(id,data)=>instance.put(`member/${id}`,data)
//会员删除 member/10
export const delmemberinfoApi=(id)=>instance.delete(`member/${id}`)


//供应商数据  supplier/list/search/1/10
export const supplierApi=(a,b,data)=>instance.post(`supplier/list/search/${a}/${b}`,data)
//供应商数据添加 supplier
export const addsupplierApi=(data)=>instance.post('supplier',data)
//编辑数据 supplier/10
export const supplierinfoApi=(id)=>instance.get(`supplier/${id}`)
//编辑
export const editsupplierinfoApi=(id,data)=>instance.put(`supplier/${id}`,data)
//删除
export const delsupplierApi=(id)=>instance.delete(`supplier/${id}`)

//商品管理
//数据  staff/list/search/1/10
export const staffApi=(a,b,data)=>instance.post(`staff/list/search/${a}/${b}`,data)
//数据添加 supplier
export const addstaffApi=(data)=>instance.post('staff',data)
//编辑数据 supplier/10
export const staffinfoApi=(id)=>instance.get(`staff/${id}`)
//编辑
export const editstaffinfoApi=(id,data)=>instance.put(`staff/${id}`,data)
//删除
export const delstaffApi=(id)=>instance.delete(`staff/${id}`)

//员工管理
//数据  goods/list/search/1/10
export const goodsApi=(a,b,data)=>instance.post(`goods/list/search/${a}/${b}`,data)
//数据添加 supplier
export const addgoodsApi=(data)=>instance.post('goods',data)
//编辑数据 supplier/10
export const goodsinfoApi=(id)=>instance.get(`goods/${id}`)
//编辑
export const editgoodsinfoApi=(id,data)=>instance.put(`goods/${id}`,data)
//删除
export const delgoodsApi=(id)=>instance.delete(`goods/${id}`)











