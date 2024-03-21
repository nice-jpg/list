#!/usr/bin/env bash
# 保证build.sh脚本有任何错误就退出
set -e
export PATH=$NODEJS_BIN_V10:$YARN_BIN_LATEST:$PATH
echo "node: $(node -v)"
echo "npm: v$(npm -v)"

function pack() {
    cd ./output

    # 检查 es6 代码
    static_output='./static'
    es6_num=`find $static_output -type f -name '*.js' | xargs egrep '\b(const|let)\s' | wc -l`

    # 复制spec文件
    cp -rf ../spec .

    # 创建抗疫的html的文件夹
    mkdir -p nodeapp/views/multi-pages/kangyi
    mkdir -p nodeapp/views/multi-pages/olympic
    mkdir -p nodeapp/views/multi-pages/virusMap
    mkdir -p nodeapp/views/multi-pages/rebang

    cp kangyi/index.html nodeapp/views/multi-pages/kangyi/
    cp olympic/index.html nodeapp/views/multi-pages/olympic/
    cp virusMap/index.html nodeapp/views/multi-pages/virusMap/

    # 热榜
    mkdir -p nodeapp/views/multi-pages/rebang
    cp rebang/index.html nodeapp/views/multi-pages/rebang/

    # 新闻页
    mkdir -p nodeapp/views/multi-pages/news
    cp news/index.html nodeapp/views/multi-pages/news/

    # 预告页
    mkdir -p nodeapp/views/multi-pages/newsNotice
    cp newsNotice/index.html nodeapp/views/multi-pages/newsNotice/

    # 热议榜
    mkdir -p nodeapp/views/multi-pages/hotComment
    cp hotComment/index.html nodeapp/views/multi-pages/hotComment/

    # 新热聚合页
    mkdir -p nodeapp/views/multi-pages/recommend
    cp recommend/index.html nodeapp/views/multi-pages/recommend/

    # 高考征文
    mkdir -p nodeapp/views/multi-pages/exampublish
    cp exampublish/index.html nodeapp/views/multi-pages/exampublish/

    # 高考征文-红包
    mkdir -p nodeapp/views/multi-pages/examwallet
    cp examwallet/index.html nodeapp/views/multi-pages/examwallet/

    # 创建静态资源用于上传到BOS CDN
    mkdir -p webroot
    cp -r static webroot/static

    # 潘多拉配置文件
    mkdir -p multi-pages
    # cp ../conf/pandora.ini multi-pages
    # cp -r ../bin/* multi-pages

    # 删除没用的编译产物数据～
    rm -rf ssr static multi-pages hotComment kangyi newsNotice news rebang olympic virusMap
    cd ..
    mkdir -p multi-pages
}

NODE_ENV=development yarn

NODE_ENV=production npm run build

pack

