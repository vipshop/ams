import ams from '@/ams';
import mockXHR from '../mock/XMLHttpRequest';

mockXHR.create();

describe('request', () => {
    it('ams.param', () => {
        expect(ams.param({a:1,b:2})).toBe('a=1&b=2');
        expect(ams.param({a:1,b:null})).toBe('a=1&b=');
    });

    it('ams.formData', () => {
        let formData = ams.formData({a: 1,b: null});
        formData.append('name', 'edward');
        expect(formData.get('a')).toBe('1');
        expect(formData.get('name')).toBe('edward');
    });

    it('ams.request get', (done) => {
        ams.request({
            url: 'https://easy-mock.com/mock/5cda4fb7ae238e6feb61eb97/test/get',
            params: {a: 'edward'}
        }).then((res)=>{
            expect(res.data).toEqual({code: 0, data: {a: 'edward'}});
            done();
        });
        mockXHR.response({code: 0, data: {a: 'edward'}});
    });


    it('ams.request post', (done) => {
        ams.request({
            url: 'https://easy-mock.com/mock/5cda4fb7ae238e6feb61eb97/test/post',
            method: 'post',
            data: {a: 'edward'}
        }).then((res)=>{
            expect(res.data).toEqual({code: 0, data: {a: 'edward'}});
            done();
        });
        mockXHR.response({code: 0, data: {a: 'edward'}});
    });
});
