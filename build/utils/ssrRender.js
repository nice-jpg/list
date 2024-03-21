
const handlebars = require('handlebars');
const paths = require('../paths');
const fs = require('fs');
const devConfig = require('../../devConfig');

const vconsoleHTML = `
<script src="https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js"></script>
<script>
  // 初始化
  var vConsole = new VConsole();
  console.log('Hello world');
</script>
`;

// ${devConfig.injectVConsole ? vconsoleHTML : ''}
const replaceEndHTML = (html, pageName) => html.replace('</html>', `
    <script src="/${pageName}.js"></script>
    </html>`);


const getSSRContent = (sortsData, pageName = paths.entryName.TOPIC) => {
    const ssrEntry = paths.resolvePath(`output/ssr/${pageName}/ssr.js`);
    if (!fs.existsSync(ssrEntry)) {
        throw new Error(`ssr文件${paths.ssrFile}不存在!`);
    }
    delete require.cache[ssrEntry];
    const {default: SSRContentComponent, processInitData} = require(ssrEntry);
    const SanProject = require('san-ssr').SanProject;

    const project = new SanProject();

    const render = project.compileToRenderer(SSRContentComponent);

    const ssrData = processInitData(sortsData);

    const ssrContent = render(ssrData);

    return ssrContent;
};

const renderTpl = (data, pageName = paths.entryName.TOPIC) => {
    const templateFile = fs.readFileSync(paths.templatePathMap[pageName]);
    const template = handlebars.compile(templateFile.toString(), {
        noEscape: true
    });

    return template(data);
};

const ssrRender = (sortsData, pageName = paths.entryName.TOPIC) => {
    console.log(pageName, 'ssr渲染开始');
    const ssrContent = getSSRContent(sortsData, pageName);

    const html = renderTpl({
        sortsData: JSON.stringify(sortsData),
        ssrContent
    }, pageName);

    console.log(pageName, 'ssr渲染成功');

    return replaceEndHTML(html, pageName);
};

module.exports = {
    ssrRender,
    renderTpl,
    replaceEndHTML
};
