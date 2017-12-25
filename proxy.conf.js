const PROXY_CONFIG = [
  // {
  //   context: [
  //     "/assetmanagement",
  //     "/dataImport",
  //   ],
  //   target: "http://192.168.1.26:8080",// 费峰
  //   secure: false,
  //   "pathRewrite": {
  //     "^/assetmanagement": ""
  //   }
  // },
  // {
  //   context: [
  //     "/assetmanagement",
  //   ],
  //   target: "http://192.168.1.96:8080",// 蔡健
  //   secure: false,
  //   "pathRewrite": {
  //     "^/assetmanagement": ""
  //   }
  // },
  // {
  //   context: [
  //     "/assetmanagement",
  //     "/dataImport",
  //   ],
  //   target: "http://192.168.1.8:8089", // 妮娜
  //   secure: false,
  //   "pathRewrite": {
  //     "^/assetmanagement": ""
  //   }
  // },
  // {
  //   context: [
  //     "/assetmanagement",
  //     "/dataImport",
  //   ],
  //   target: "http://192.168.1.107:28081",// 涛哥
  //   secure: false,
  //   "pathRewrite": {
  //     "^/assetmanagement": ""
  //   }
  // },
  // {
  //   context: [
  //     "/assetmanagement",
  //   ],
  //   target: "http://192.168.1.56:8080",// 涛哥笔记本
  //   secure: false,
  //   "pathRewrite": {
  //     "^/assetmanagement": ""
  //   }
  // },
  {
    context: [
      "/assetmanagement",
      "/dataImport",
    ],
    target: "http://59.110.233.230", // 线上
    secure: false,
    // "pathRewrite": {
    //   "^/assetmanagement": ""
    // }
  },

];

module.exports = PROXY_CONFIG;
