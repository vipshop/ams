
/**
 * 加载js
 * @url 需要加载的js链接
 */
export function loadJS(url) {
    return new Promise(function(resolve, reject) {
        const script = document.createElement('script');
        script.type = 'text/javascript';

        if (script.readyState) { // IE
            script.onreadystatechange = function() {
                if (script.readyState === 'loaded' ||
                        script.readyState === 'complete') {
                    script.onreadystatechange = null;
                    resolve({
                        code: 0,
                        msg: 'success: ' + url
                    });
                }
            };
        } else { // Others
            script.onload = function() {
                resolve({
                    code: 0,
                    msg: 'success: ' + url
                });
            };
        }

        script.onerror = function() {
            reject(Error(url + 'load error!'));
        };

        script.src = url;
        document.body.appendChild(script);
    });
}
