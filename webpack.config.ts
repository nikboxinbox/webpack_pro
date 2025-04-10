import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildPath } from "./config/build/types/types";


interface EnvVariables {
  mode: "development" | "production";
  port: number;
}

export default (env: EnvVariables) => {

  const buildPath: BuildPath = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html')
  } 

  const config:webpack.Configuration =  buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? 'development',
    paths: buildPath
  });

  return config 
};
