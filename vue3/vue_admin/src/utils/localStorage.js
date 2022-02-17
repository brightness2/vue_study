/*
 * @Author: Brightness
 * @Date: 2021-08-16 11:34:37
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-16 11:43:13
 * @Description:
 */
export const setStorage = (key, value) => {
    window.localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key) => {
    let data = window.localStorage.getItem(key);
    return JSON.parse(data);
};

export const removeStorage = (key) => {
    return window.localStorage.removeItem(key);
};

export const isSupper = () => {
    if (!window.localStorage) {
        return false;
    }
    return true;
};
