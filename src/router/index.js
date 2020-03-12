import Vue from "vue";
import VueRouter from "vue-router";
import {notification} from 'ant-design-vue'
import NProgress from 'nprogress'
import findLast from "lodash/findLast"
import "nprogress/nprogress.css"
// import RenderRouterView from '../components/RenderRouterView.vue'
import NotFoundPage from '../views/404.vue';
import Forbidden from '../views/403.vue';
import {check, isLogin} from '../utils/auth'


Vue.use(VueRouter);

const routes = [{
    path: "/user",
    //  component:RenderRouterView,
    // component: {render:(h) => (h('router-view'))},
    hideInMenu: true,
    component: () =>
      import( /* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [{
        path: "/user",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import( /* webpackChunkName: "user" */ "../views/User/Login.vue")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import( /* webpackChunkName: "user" */ "../views/User/Register.vue")
      }
    ]
  },
  {
    path: "/",
    meta: {
      authority: ["user", "admin"]
    },
    component: () =>
      import( /* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      // dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "仪表盘"
        },
        component: {
          render: (h) => h("router-view")
        },
        children: [{
          path: "/dashboard/analysis",
          name: "analysis",
          meta: {
            title: "分析页"
          },
          component: () =>
            import( /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis.vue"),
        }]
      }
    ]
  },
  // form
  {
    path: "/form",
    name: "form",
    // component: { render: h => h("router-view") },
    component: () => import( /* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    meta: {
      icon: "form",
      title: "表单",
      authority: ["admin"]
    },
    children: [{
        path: "/form/basic-form",
        name: "basicform",
        meta: {
          title: "基础表单"
        },
        component: () =>
          import( /* webpackChunkName: "form" */ "../views/Forms/BasicForm")
      },
      {
        path: "/form/step-form",
        name: "stepform",
        meta: {
          title: "分布表单"
        },
        hideChildrenMenu: true,
        component: () =>
          import( /* webpackChunkName: "form" */ "../views/Forms/StepForm"),
        children: [{
            path: "/form/step-form",
            redirect: "/form/step-form/info"
          },
          {
            path: "/form/step-form/info",
            name: "info",
            component: () =>
              import( /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1")
          },
          {
            path: "/form/step-form/confirm",
            name: "confirm",
            component: () =>
              import( /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2")
          },
          {
            path: "/form/step-form/result",
            name: "result",
            component: () =>
              import( /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3")
          }
        ]
      }
    ]
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFoundPage
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden
  },
];




const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority)
  // 判断是否有权限
  if (record && !check(record.meta.authority)) {
     if (!isLogin() && to.path !== '/user/login') {
       next({path: "/user/login"})
     } else if (to.path !== "403") { 
       notification.error({
         message: '403',
         description: '你没有权限访问，请联系管理员'
       });      
       next({
         path: "/403"
       })
     }
     NProgress.done(); 
  }

  next();
});
router.afterEach(() => {
  NProgress.done();
})


export default router;