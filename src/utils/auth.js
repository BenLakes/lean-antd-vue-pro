// 获取当前用户的权限
export function getCurrentAuthority(){
  return ["admin"];
}

// 检验权限
export function check(authority){
  // 获取当前用户权限
  const current = getCurrentAuthority();
  // 比较当前用户权限 是否包含这个权限  真 true  假 false 
  return current.some(item => authority.includes(item))
}

// 登录
export function isLogin(){
  const current = getCurrentAuthority();
  // 不等于 guest 表示  已经登录
  return current && current[0] !== "guest";
}