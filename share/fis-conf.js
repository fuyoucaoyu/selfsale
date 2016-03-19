var APP_NAME = '/SSH/selfsaleshare';
fis.match('*', {
  charset: 'utf8'
})

/*********************** JS CSS png 压缩 *********************/
// 加 md5，与缓存机制配套使用较好
fis.match('*.{js,css,png,jpg}', {
  useHash: true
});

fis.match('static/images/clothes/**/*.{png,jpg}', {
  useHash: false
});
fis.match('static/images/materialsize/*.{png,jpg}', {
  useHash: false
}); 
fis.match('static/images/materialsize/**/*.{png,jpg}', {
  useHash: false
}); 

// fis-optimizer-uglify-js 插件进行压缩，已内置
fis.match('*.js', {
  optimizer: fis.plugin('uglify-js')
});

// 启用 fis-spriter-csssprites 插件
fis.match('::package', {
  spriter: fis.plugin('csssprites')
});

// 对 CSS 进行图片合并
fis.match('*.css', {
  // 给匹配到的文件分配属性 `useSprite`
  useSprite: true
});

// fis-optimizer-clean-css 插件进行压缩，已内置
fis.match('*.css', {
  optimizer: fis.plugin('clean-css')
});

//https://github.com/Mrluobo/fis3-preprocessor-px2rem
fis.match('*.css', {
    preprocessor: fis.plugin('px2rem',{
        designWidth: 640
    })
});

// fis-optimizer-png-compressor 插件进行压缩，已内置
// fis.match('*.png', {
//   optimizer: fis.plugin('png-compressor')
// });


/*********************** 依赖 *********************/
// fis.hook('commonjs');
fis.hook('module', {
    mode: 'commonjs'
});

// js 调用 jswrapper 进行自动化组件化封装
// npm install [-g] fis-postprocessor-jswrapper
fis.match('**.js', {
    postprocessor: fis.plugin('jswrapper', {
        type: 'commonjs'
    })
});

fis.match('::package', {
    // packager: fis.plugin('map', {
    //     'pkg/main.js': [
    //       'page/**.js',
    //       'lib/**.js'
    //     ]
    // }),

    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'commonjs',
        useInlineMap: true // 资源映射表内嵌
    })
});


/*********************** 产出目录 *********************/
fis.match("(pages/**)", {
    isMod: true,
    release: APP_NAME + '/$1'
});

fis.match("(components/**)", {
    isMod: true,
    release: APP_NAME + '/$1'
});

fis.match("static/lib/(**)", {
    isMod: false,
    release: APP_NAME + '/static/lib/$1'
});

fis.match("static/lib/(directives.js)", {
    isMod: true,
    release: APP_NAME + '/static/lib/$1'
});

fis.match("static/lib/(address.js)", {
    isMod: true,
    release: APP_NAME + '/static/lib/$1'
});

fis.match("static/utils/(*.js)", {
    isMod: false,
    release: APP_NAME + '/static/utils/$1'
});

fis.match("static/lib/(mod.js)", {
    isMod: false,
    release: APP_NAME + '/static/lib/$1'
});

// 图片
fis.match("static/images/(*.png)", {
    isMod: true,
    release: APP_NAME + '/static/images/$1'
});
fis.match("static/images/(**/*.png)", {
    isMod: true,
    release: APP_NAME + '/static/images/$1'
});

fis.match("static/images/(*.jpg)", {
    isMod: true,
    release: APP_NAME + '/static/images/$1'
});
fis.match("static/images/(**/*.jpg)", {
    isMod: true,
    release: APP_NAME + '/static/images/$1'
});

fis.match("static/swf/(*.swf)", {
    isMod: false,
    release: APP_NAME + '/static/swf/$1'
});

// 某些资源从构建中去除
fis.set('project.ignore', [
  'output/**',
  '**.md',
  'test/**',
  '.git/**',
  '.svn/**',
  'node_modules/**',
  'fis-conf.js',
  'package.json'
]);

/*********************** MEDIA *********************/
// fis.media() 接口提供多种状态功能
// debug时的特性
fis.media('debug')
    .match('*.{js,css,png,jpg}', {
      useHash: false,
      useSprite: false,
      optimizer: null
    });