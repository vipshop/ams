import { deepExtend } from './index';
export function watermark({
    container = document.body,
    uid = 'uid',
    width = '300px',
    height = '200px',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '18px Microsoft Yahei',
    fillStyle = 'rgba(236, 234, 234, 0.8)',
    content = '请勿外传',
    rotate = '30',
    zIndex = 1000
} = {}) {
    const args = arguments[0];
    const canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    const ctx = canvas.getContext('2d');
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate(Math.PI / 180 * rotate);
    ctx.fillText(content, parseFloat(width) / 2, parseFloat(height) / 2);
    const base64Url = canvas.toDataURL();
    const __vm_uid = `__wm_${uid}`;
    const __wm = document.querySelector(`.${__vm_uid}`);
    const watermarkDiv = __wm || document.createElement('div');
    const styleStr = `          
        position:absolute;          
        top:0;          
        left:0;          
        width:100%;          
        height:100%;          
        z-index:${zIndex};          
        pointer-events:none;          
        background-repeat:repeat;          
        background-image:url('${base64Url}')`;
    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add(__vm_uid);
    if (!__wm) {
        container.style.position = 'relative';
        container.insertBefore(watermarkDiv, container.firstChild);
    }
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (MutationObserver) {
        let mo = new MutationObserver(function() {
            const __wm = document.querySelector(`.${__vm_uid}`);
            // 只在__wm元素变动才重新调用 watermark
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                // 避免一直触发
                mo.disconnect();
                mo = null;
                watermark(deepExtend({}, args));
            }
        });
        mo.observe(container, {
            attributes: true,
            subtree: true,
            childList: true
        });
    }
}