import request from "./api";
// 获取用户信息
export const getUserInfo = (data: any) =>
  request({
    method: "POST",
    url: "/user/create",
    data,
  });

// 获取分类信息
export const getSortList = (data?: { level: 1 | 2 }) =>
  request({
    method: "GET",
    url: "/sort/list",
    data,
  });

// 获取商品数据
export const getProductList = (data: any) =>
  request({
    method: "GET",
    url: "/product/list",
    data,
  });
// 查询购物车 如果查询不到则会自动创建
export const findCarInfo = (data: any) =>
  request({
    method: "GET",
    url: "/car/findUserCar",
    data,
  });
// 添加购物车
export const addCarInfo = (data: any) =>
  request({
    method: "POST",
    url: "/car/update",
    data,
  });
