import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push([
    'umi-plugin-pro',
    {
      serverUrl: 'https://ant-design-pro.netlify.com',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
        {
          name: '注册结果页',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: '注册页',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          routes: [
            // menu route
            {
              path: '/',
              redirect: '/listsearcharticles',
            },
            {
              name: ' 首页',
              icon: 'HomeFilled',
              path: '/listsearcharticles',
              component: './IndexList',
              authority: ['user', 'admin', 'guest'],
            },
            {
              name: '帖子详情',
              icon: 'smile',
              path: '/TopicDetailPage',
              component: './TopicDetailPage',
              hideInMenu: 'true',
            },
            {
              name: '分析页',
              icon: 'FundFilled',
              path: '/dashboardanalysis',
              component: './DashboardAnalysis',
              authority:['admin'],
            },
            {
              name: ' 工作台',
              icon: 'IdcardFilled',
              path: '/dashboard/workplace',
              component: './DashboardWorkplace',
              authority: ['admin'],
            },
            {
              name: '板块列表',
              icon: 'AppstoreFilled',
              path: '/BoardListPage',
              component: './BoardListPage',
              authority: ['user', 'guest'],
            },
            {
              name: '板块管理',
              icon: 'AppstoreFilled',
              path: '/listcardlist',
              component: './BoardManagmentPage',
              authority: ['admin'],
            },
            {
              name: '个人中心',
              icon: 'smile',
              path: '/accountcenter',
              component: './AccountCenter',
              authority: ['user'],
              hideInMenu: 'true',
            },
            {
              name: '个人设置',
              icon: 'smile',
              path: '/accountsettings',
              component: './AccountSettings',
              authority: ['user'],
              hideInMenu: 'true',
            },
            {
              name: '帖子管理',
              icon: 'FileTextFilled',
              path: '/TopicListPage',
              component: './TopicListPage',
              authority: ['admin'],
            },
            {
              name: '用户管理',
              icon: 'IdcardFilled',
              path: '/UserlistPage',
              component: './UserListTable',
              authority: ['admin'],
            },
            {
              name: 'table',
              icon: 'IdcardFilled',
              path: '/listtablelist',
              component: './ListTableList',
              hideInMenu: 'true',
              authority: ['admin'],
            },
            {
              path: '/admin',
              name: 'admin',
              icon: 'CrownFilled',
              component: './Admin',
              authority: ['admin'],
              hideInMenu: 'true',
              routes: [
                {
                  path: '/admin/sub-page',
                  name: 'sub-page',
                  icon: 'smile',
                  component: './Welcome',
                  authority: ['admin'],
                },
              ],
            },
            {
              name: '发布内容',
              icon: 'PlusCircleFilled',
              path: '/addtopicpage',
              component: './AddTopicPage',
              authority: ['user'],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
};
