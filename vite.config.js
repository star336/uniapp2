import path from "path";
import {defineConfig} from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import {
    UnifiedViteWeappTailwindcssPlugin as uvwt
} from "weapp-tailwindcss/vite";

const resolve = (p) => {
    return path.resolve(__dirname, p);
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [uni(), uvwt({
        // 由于 hbuilderx 会改变 process.cwd 所以这里必须传入当前目录的绝对路径
        // 上面参考视频没有这一个,但是不加的话会报错
        tailwindcssBasedir: __dirname
    })], css: {
        postcss: {
            plugins: [require("tailwindcss")({
                // 注意此处，手动传入你 `tailwind.config.js` 的绝对路径
                config: resolve("./tailwind.config.js"),
            }), require("autoprefixer"),],
        },
    }
})
