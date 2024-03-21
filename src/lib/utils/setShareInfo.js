import share from '@baidu/xbox-share';
// 二次分享
export const setShareInfo = ({title, description, link, icon}) => {
    document.title = title;

    // window.BoxShareData = {
    //     options: {
    //         type: 'url',
    //         mediaType: 'all',
    //         linkUrl: link,
    //         title,
    //         content: description,
    //         iconUrl: icon,
    //         imageUrl: icon
    //     },
    //     // eslint-disable-next-line
    //     successcallback: 'console.log',
    //     // eslint-disable-next-line
    //     errorcallback: 'console.log'
    // };
    share({
        channel: 'feed_topic',
        title,
        content: description,
        iconUrl: icon,
        linkUrl: link,
        bdbox: {
            source: 'feed_topic'
        },
        wx: {
            jsApiList: []
        }
    }, function () {}, function () {});
};
