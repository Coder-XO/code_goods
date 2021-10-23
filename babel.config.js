module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    // vant 配置文件  按需引入
    plugins: [
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant']
    ]
}
