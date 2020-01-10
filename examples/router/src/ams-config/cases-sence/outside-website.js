import ams from '@ams-team/ams';

ams.block('outside-website', {
    type: 'component',
    style: {
        height: 'calc(100vh - 110px)'
    },
    options: {
        is: 'iframe'
    },
    props: {
        src: 'https://www.baidu.com/',
        frameborder: 0
    }
});
