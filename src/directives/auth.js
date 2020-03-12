import {check} from '../utils/auth'
// 权限指令
function install(Vue, options = {}) {
  Vue.directive(options.name||'auth',{
    // 指令生命周期
    inserted(el, binding){
      if (!check(binding.value)) {
          el.parentNode && el.parentNode.removeChild(el);
      }
    }
  })
}

export default {install};