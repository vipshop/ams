import ams from '@ams-team/ams';

ams.block('outside-website', {
    style: {
        height: 'calc(100vh - 110px)'
    },
    type: 'component',
    options: {
        is: 'iframe'
    },
    props: {
        src: 'https://www.baidu.com/',
        frameborder: 0
    }
});
