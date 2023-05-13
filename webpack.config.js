const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // tạo ra 1 file html từ config webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // tách ra một file css riêng
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = (env) => {
  // const isDev = Boolean(env.development)
  const envDevelopment = "development";
  const isDev = process.env.NODE_ENV === envDevelopment;
  const basePlugin = [
    new HtmlWebpackPlugin({
      title: "Webpack App",
      filename: "index.html",
      template: "src/template.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name][contenthash].css",
    }),
  ];
  return {
    mode: isDev === isDev ? envDevelopment : "production",
    entry: {
      app: path.resolve("./src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name][contenthash].js",
      clean: true, // đoạn clear file cũ sau mỗi lần build
      assetModuleFilename: "[file][query]",
    },
    devtool: isDev === isDev ? "source-map" : false,
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: true, //Hiển thị debug lên terminal để dễ debug
                    useBuiltIns: "usage", //Dùng cái này thì đơn giản nhất vì không cần import core-js vào code
                    corejs: "3.30.2", //nên quy định version core-js để babel-preset-env có hoạt động tối ưu
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|pdf)$/i,
          type: "asset/resource",
        },
      ],
    },
    plugins: isDev ? [...basePlugin, new BundleAnalyzerPlugin()] : basePlugin,
    devServer: {
      static: {
        directory: "dist", // đường dẫn tương đối đến với thư mục chứa index.html
      },
      port: 4200, //Port thay cho port mặc định (8080)
      open: true, //mở trang webpack khi chạy terminal
      hot: true, //Bật tính năng reload nhanh Hot Module Replacement
      compress: true, // Bật Gzip cho các tài nguyên
      historyApiFallback: true, //Set true nếu bạn dùng cho ác SPA và sử dụng History API của HTML5
    },
    optimization: {
      runtimeChunk: "single",
    },
  };
};
