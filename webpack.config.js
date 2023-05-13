const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // tạo ra 1 file html từ config webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // tách ra một file css riêng

module.exports = () => {
  // const isDev = Boolean(env.development)
  const envDevelopment = "development";
  const isDev = process.env.NODE_ENV === envDevelopment;
  return {
    mode: isDev === isDev ? envDevelopment : "production",
    entry: {
      app: path.resolve("./src/index.js"),
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name][contenthash].js",
      clean: true, // doạn dẹp file cũ sau mỗi lần build
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
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: "Webpack App",
        filename: "index.html",
        template: "src/template.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name][contenthash].css",
      }),
    ],
    devServer: {
      static: {
        directory: "dist", // đường dẫn tương đối đến với thư mục chứa index.html
      },
      port: 4200, //Pỏt thay cho poẻ mặc định (8080)
      open: true, //mở trnag webpack khi chạy terminal
      hot: true, //Bật tính năng reload nhanh Hot Module Replacement
      compress: true, // Bật Gzip cho các tài nguyên
      historyApiFallback: true, //Set true nếu bạn dùng cho ác SPA và sử dụng History API của HTML5
    },
    optimization: {
      runtimeChunk: "single",
    },
  };
};
