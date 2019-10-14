export default function(request) {
    return {
        /**
       * @return {String} 用户名，默认为 ''
       */
        getUsername() {
            // return request({ url: '' })
            //     .then(({ data }) => data)
            return Promise.resolve({ userName: 'ams.oa' });
        }
    };
}