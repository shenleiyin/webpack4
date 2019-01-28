const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

 
module.exports = {
    entry: {    // 多文件入口
        index: "./src/index.js",
        test: "./src/test.js"
    },
    output: {                   // 出口
        filename: "[name].bundle.js",      // 生成打包文件的名字  ==>注意这里，因为是多文件入口，所有需要[name]来区分文件
        path: path.join(__dirname, "dist")  // 打包文件的路径，__dirname指当前根目录
    },
    devServer: {
       // 设置基本目录结构
       contentBase: path.join(__dirname, "dist"),
       // 服务器的ip地址，也可以使用localhost
       host: "localhost",
       // 服务端压缩是否开启
       compress: true,
       // 配置服务端口号
       port: 8080
   },
   plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
             // chunks: ['index'],  // 多入口时需要用到
            hash: true      // 插入的文件后面加一段随机数
        }), 
        new ExtractTextPlugin({
      		filename: "index.css"
		})
    ],
    module: {
        rules:[
             // css loader
           {
               test: /\.css$/,
               use: ExtractTextPlugin.extract({
                   fallback: "style-loader", 
                   use: "css-loader"
               })
           },
           // 图片 loader
           {
               test: /\.(png|jpg|gif|jpeg)/,
               use: [{
                   loader: 'url-loader',
                   options: {
                       limit: 500,   //是把小于500B的文件打成Base64的格式，写入JS
                       outputPath: 'images/'  //打包后的图片放到images文件夹下
                   }
               }]
           },
           {
            	test: /\.(htm|html)$/i,
            	use: ["html-withimg-loader"]
        	},
        	// less loader  不分离
       		// {
         //   		test: /\.less$/,
         //   		use: ["style-loader", "css-loader", "less-loader"]
       		// },
       		
       		// lessloader分离出来less文件，像分离css文件一样
			// 　　其实和分离css文件配置基本是一样的
           {
               test: /\.less$/,
                
               use: ExtractTextPlugin.extract({
                   fallback: "style-loader",
                   use: ["css-loader", "less-loader"]
               }),
                
           }
        ]
    }
}