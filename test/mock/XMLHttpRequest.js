const mockXHR = {
    mockData: {code: 1, data: {}, msg: ''},
    response(data){
        // 当指定返回数据，修改responseText
        if (data) {
            mockXHR.xhr.responseText = JSON.stringify(data)
        }
        // 调用onreadystatechange 回掉函数
        mockXHR.xhr.onreadystatechange()
    },
    create(){
        this.getXhr();
    },
    xhr: null,
    getXhr(){
        // mock xhr对象各项数据
        const xhr = {
            open: jest.fn(),
            send: jest.fn(),
            setRequestHeader: jest.fn(),
            onerror: jest.fn(),
            withCredentials: jest.fn(),
            readyState: 4,
            status: 200,
            responseText: JSON.stringify(
                this.mockData
            )
        };
        // const oldXMLHttpRequest = window.XMLHttpRequest;
        window.XMLHttpRequest = jest.fn(() => xhr);
        mockXHR.xhr = xhr;
        return xhr;
    }
}

export default mockXHR;
