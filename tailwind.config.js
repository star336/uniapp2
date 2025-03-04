const path = require("path");

const resolve = (p) => {
    return path.resolve(__dirname, p);
};

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{html,js,vue}'].map(resolve),
    theme: {
        extend: {},
    },
    plugins: [],
    corePlugins: {
        // 跨多端可以 h5 开启，小程序关闭
        preflight: false,
    }
}

