import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";


interface EnvVariables {
  mode: "development" | "production";
  port: number;
}

export default (env: EnvVariables) => {
  const isDev = env.mode === "development";
  const isProd = env.mode === "production";

  const config: webpack.Configuration = {
    mode: env.mode ?? "development",
    entry: path.resolve(__dirname, "src", "index.tsx"),

    output: {
      path: path.resolve(__dirname, "build"),
      filename: "[name].[contenthash].js",
      clean: true,
    },

    plugins: [
     isProd && new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public", "index.html"),
      }), new MiniCssExtractPlugin({
         filename: "[name].[contenthash:8].css",
         chunkFilename: "css/[name].[contenthash:8].css"
      }),
      isDev && new webpack.ProgressPlugin(),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            // mini-css-extract-plugin with the css-loader
         isDev ? 'style-loader' :    MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devServer: isDev
      ? {
        port: env.port ?? 3000,
        open: true,
      }
      : undefined,
    devtool: isDev ? "inline-source-map" : false,
  };
  return config;
};
