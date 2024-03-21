
let mcpCreater = null;
export const getMcpCreater = () => {
    const {IvkAppCreator} = require('@baidu/wise-invoke-app');
    if (!mcpCreater) {
        mcpCreater = new IvkAppCreator();
        // 设置公共打点参数
        mcpCreater.setCommonParams({
            app: 'wise',
            scene: 'sharepage'
        });
    }
    return mcpCreater;
}
export const getInvokeInfo = async (params = {}) => {
    const mcpCreater = getMcpCreater();
    return await mcpCreater.getInvokeInfo(params);
};