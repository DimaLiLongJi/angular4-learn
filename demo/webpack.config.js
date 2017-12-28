const path = require('path');
const fs = require('fs-extra');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = (env) => {
  let plugins = [
    new ExtractTextPlugin({
      filename: '[name].css',
    })
  ];
  const output = {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: '[name].js',
    chunkFilename: 'chunks/[name].[chunkhash].js',
    publicPath: '/scripts/',
  };

  if (env && env.prod) {
    console.log('webpack production mode on');
    plugins = plugins.concat(new ParallelUglifyPlugin({}));
    fs.removeSync(path.resolve(__dirname, 'public/scripts'));
    output.publicPath = 'http://static.careerfrog.com.cn/cf-college/scripts/';
  }
  return {
    entry: {
      'app-main-mobile': './public/modules/mobile/app/index.js',
      'vendor-flexible': './public/vendors/flexible.js',
      'resume-preview-main': './public/modules/resume-preview/index.js',
      'company-detail-mobile-main': './public/modules/mobile/company/detail/index.js',
      'opportunity-detail-mobile-main': './public/modules/mobile/opportunity/detail/index.js',
      'uk-company-detail-mobile-main': './public/modules/mobile/university-tour/company/index.js',
      'uk-home-page-mobile-main': './public/modules/mobile/university-tour/homepage/index.js',
      'uk-idp-home-page-mobile-main': './public/modules/mobile/university-tour/homepage-IDP/index.js',
      'uk-opportunity-mobile-main': './public/modules/mobile/university-tour/opportunity/index.js',
      'app-pc-main': './public/modules/pc/app/index.js',
      'company-detail-pc-main': './public/modules/pc/company/detail/index.js',
      'discovery-pc-main': './public/modules/pc/discovery/index.js',
      'opportunity-detail-pc-main': './public/modules/pc/opportunity/detail/index.js',
      'question-list-pc-main': './public/modules/pc/question/list/index.js',
      'recruit_calander-main': './public/modules/pc/recruit_calander/list/index.js',
      'uk-company-detail-pc-main': './public/modules/pc/university-tour/company/index.js',
      'uk-idp-home-page-pc-main': './public/modules/pc/university-tour/homepage-IDP/index.js',
      'uk-home-page-pc-main': './public/modules/pc/university-tour/homepage/index.js',
      'uk-opportunity-pc-main': './public/modules/pc/university-tour/opportunity/index.js',
      'account-main': './public/modules/pc/account/index.js',
      'interview_material-main': './public/modules/pc/interview_material/index.js',
      'industry_interview_material-main': './public/modules/pc/industry_interview_material/index.js',
      'reply-question-style': './public/modules/reply-question/style.less',
      'go-wechat-style': './public/modules/mobile/go-wechat/style.less',
      'go-wechat-qa-style': './public/modules/mobile/go-wechat-qa/style.less',
      'recruit-calander-upcoming-style': './public/components/mobile/recruit_calander/upcoming/style.less',
      'uk-go-wechat-style': './public/modules/mobile/university-tour/go-wechat/style.less',
      'recruit-calander-upcoming-pc-style': './public/modules/pc/recruit_calander/upcoming/style.less',
      'uk-idp-home-page-pc-style': './public/modules/pc/university-tour/homepage-IDP/style.less',
      'customized-opp-daily-style': './public/modules/customized-opp-daily/style.js',
      'ios-qr-code-style': './public/modules/ios-qr-code/style.less',

      'app-pc-main-ts': './public/modules/pc/app-ng4/index.ts',
    },
    output,
    // devtool: '#inline-source-map',
    resolve: {
      alias: {
        TweenLite: path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
        TweenMax: path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
        TimelineLite: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
        TimelineMax: path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
        ScrollMagic: path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animation.gsap': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'debug.addIndicators': path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'),
      },
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'public/bower_components'),
          path.resolve(__dirname, 'public/vendors'),
          path.resolve(__dirname, 'node_modules')
        ],
        use: [{
            loader: 'babel-loader',
          },
          // {
          //   loader: 'template-cache-loader',
          //   options: {
          //     app: 'App',
          //   },
          // },
          {
            loader: 'async-transform-loader',
          }
        ],
      },
      {
        test: /\.ts$/,
        use: [{
          loader: 'ts-loader',
        }, {
          loader: 'angular-router-loader',
        }],
        // loaders: [
        //   {
        //    loader: 'ng-router-loader'
        //    // options: {
        //    //  /* ng-router-loader options */
        //    // }
        // } ,
          // "ts-loader",
          // "angular-router-loader", // 否则路由会挂
          // 'ng-router-loader'
        // ]
      },
       {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true, // css压缩
            }
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader',
            options: {
              minimize: true, // css压缩
            },
          }, {
            loader: 'less-loader',
            options: {
              paths: [
                path.resolve(__dirname, 'node_modules')
              ],
            },
          }],
          fallback: 'style-loader',
        }),
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'url-loader',
      }, {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery',
        }, {
          loader: 'expose-loader',
          options: '$',
        }],
      }, {
        test: require.resolve('qrcode-generator'),
        use: [{
          loader: 'expose-loader',
          options: 'qrcode',
        }],
      }, {
        test: require.resolve('moment'),
        use: [{
          loader: 'expose-loader',
          options: 'moment',
        }],
      }],
    },
    plugins,
    resolveLoader: {
      modules: [
        'node_modules',
        path.resolve(__dirname, 'public/loaders')
      ],
    },
  };
};
