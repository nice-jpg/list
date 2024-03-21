/**
 * @file app.js
 */
import san from 'san';

/**
 *
 * @param {SanComponent} Component san的 component
 * @param {string|DOM} selector attach 的节点
 * @param {boolean} append true 表示追加节点，否则是完全替换（先清空）
 */
function hulk(Component, selector, {data = {}, append = true} = {}) {
    const doc = document;
    let app;
    if (Component instanceof san.Component) {
        app = Component;
    }
    else {
        const AppComponent = san.defineComponent(Component);
        app = new AppComponent({
            data
        });
    }
    let $node;


    switch (typeof selector) {
        case 'string':
            $node = doc.querySelector(selector);
            break;
        case 'undefined':
            $node = doc.body;
            break;
        default:
            if (selector.nodeType && selector.nodeName) {
                $node = selector;
            }
            else {
                throw new Error(selector + ' must be an DOM or DOM-selector!');
            }
    }
    if (!append && $node) {
        $node.innerHTML = '';
    }
    app.attach($node);
    return app;
}

export default hulk;
