/*
 * @Author: Brightness
 * @Date: 2021-08-06 15:02:32
 * @LastEditors: Brightness
 * @LastEditTime: 2021-08-27 14:12:31
 * @Description:
 */
import { h } from "vue";
import { NIcon } from "naive-ui";
import { VXETable } from "vxe-table";
import { setStorage, removeStorage } from "@/utils/localStorage";
export const renderIcon = (icon) => {
    return () => h(NIcon, null, { default: () => h(icon) });
};

export const zMessage = (content = "", status = "success") => {
    if (window.$message) {
        window.$message[status](content);
    } else {
        VXETable.modal.message({
            content,
            status,
        });
    }
};
//保存登录信息
export const login = (userId, userName, token) => {
    setStorage("user", { userId, userName });
    setStorage("token", token);
};
//清除登录信息
export const logout = () => {
    removeStorage("user");
    removeStorage("token");
};
//检查是否登录
export const isLogin = () => {
    return localStorage.getItem("token") && localStorage.getItem("user");
};
//数组分页
export const pagination = (currentPage, pageSize, array) => {
    let offset = (currentPage - 1) * pageSize;
    let res = [];
    if (offset + pageSize >= array.length) {
        res = array.slice(offset, array.length);
    } else {
        res = array.slice(offset, offset + pageSize);
    }
    return res;
};
//组合tree数据
export const parseTreeData = (
    arr,
    keyStr,
    labelStr,
    newKeyStr = "key",
    newLabelStr = "label",
    childStr = "children",
    icon = null
) => {
    for (const i in arr) {
        if (Object.hasOwnProperty.call(arr, i)) {
            arr[i][newKeyStr] = arr[i][keyStr];
            arr[i][newLabelStr] = arr[i][labelStr];
            if (icon) {
                arr[i].icon = renderIcon(icon);
            }
            if (arr[i][childStr]) {
                parseTreeData(arr[i][childStr], keyStr, labelStr);
            }
        }
    }
    return arr;
};

/**
 * 和PHP一样的时间戳格式化函数
 * @param {string} format 格式
 * @param {int} timestamp 要格式化的时间 默认为当前时间
 * @return {string}   格式化的时间字符串
 */
export const zDate = (format, timestamp) => {
    let a,
        jsdate = timestamp ? new Date(timestamp) : new Date();
    let pad = (n, c) => {
        if ((n = n + "").length < c) {
            return new Array(++c - n.length).join("0") + n;
        } else {
            return n;
        }
    };
    let txt_weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let txt_ordin = {
        1: "st",
        2: "nd",
        3: "rd",
        21: "st",
        22: "nd",
        23: "rd",
        31: "st",
    };
    let txt_months = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let f = {
        //Day
        d: () => {
            return pad(f.j(), 2);
        },
        D: () => {
            return f.l().substr(0, 3);
        },
        j: () => {
            return jsdate.getDate();
        },
        l: () => {
            return txt_weekdays[f.w()];
        },
        N: () => {
            return f.w() + 1;
        },
        S: () => {
            return txt_ordin[f.j()] ? txt_ordin[f.j()] : "th";
        },
        w: () => {
            return jsdate.getDay();
        },
        z: () => {
            return (
                ((jsdate - new Date(jsdate.getFullYear() + "/1/1")) / 864e5) >>
                0
            );
        },
        // Week,周数，从星期一开始的周数查询
        W: () => {
            var a = f.z(),
                b = 364 + f.L() - a;
            var nd2,
                nd =
                    (new Date(jsdate.getFullYear() + "/1/1").getDay() || 7) - 1;
            if (b <= 2 && (jsdate.getDay() || 7) - 1 <= 2 - b) {
                return 1;
            } else {
                if (a <= 2 && nd >= 4 && a >= 6 - nd) {
                    nd2 = new Date(jsdate.getFullYear() - 1 + "/12/31");
                    return date("W", Math.round(nd2.getTime() / 1000));
                } else {
                    return (
                        (1 + (nd <= 3 ? (a + nd) / 7 : (a - (7 - nd)) / 7)) >> 0
                    );
                }
            }
        },
        // Month
        F: () => {
            return txt_months[f.n()];
        },
        m: () => {
            return pad(f.n(), 2);
        },
        M: () => {
            return f.F().substr(0, 3);
        },
        n: () => {
            return jsdate.getMonth() + 1;
        },
        t: () => {
            var n;
            if ((n = jsdate.getMonth() + 1) == 2) {
                return 28 + f.L();
            } else {
                if ((n & 1 && n < 8) || (!(n & 1) && n > 7)) {
                    return 31;
                } else {
                    return 30;
                }
            }
        },
        // Year
        L: () => {
            var y = f.Y();
            return !(y & 3) && (y % 1e2 || !(y % 4e2)) ? 1 : 0;
        },
        //o not supported yet
        Y: () => {
            return jsdate.getFullYear();
        },
        y: () => {
            return (jsdate.getFullYear() + "").slice(2);
        },
        // Time
        a: () => {
            return jsdate.getHours() > 11 ? "pm" : "am";
        },
        A: () => {
            return f.a().toUpperCase();
        },
        B: () => {
            // peter paul koch:
            var off = (jsdate.getTimezoneOffset() + 60) * 60;
            var theSeconds =
                jsdate.getHours() * 3600 +
                jsdate.getMinutes() * 60 +
                jsdate.getSeconds() +
                off;
            var beat = Math.floor(theSeconds / 86.4);
            if (beat > 1000) beat -= 1000;
            if (beat < 0) beat += 1000;
            if (String(beat).length == 1) beat = "00" + beat;
            if (String(beat).length == 2) beat = "0" + beat;
            return beat;
        },
        g: () => {
            return jsdate.getHours() % 12 || 12;
        },
        G: () => {
            return jsdate.getHours();
        },
        h: () => {
            return pad(f.g(), 2);
        },
        H: () => {
            return pad(jsdate.getHours(), 2);
        },
        i: () => {
            return pad(jsdate.getMinutes(), 2);
        },
        s: () => {
            return pad(jsdate.getSeconds(), 2);
        },
        //u not supported yet

        // Timezone
        //e not supported yet
        //I not supported yet
        O: () => {
            var t = pad(Math.abs((jsdate.getTimezoneOffset() / 60) * 100), 4);
            if (jsdate.getTimezoneOffset() > 0) t = "-" + t;
            else t = "+" + t;
            return t;
        },
        P: () => {
            var O = f.O();
            return O.substr(0, 3) + ":" + O.substr(3, 2);
        },
        //T not supported yet
        //Z not supported yet

        // Full Date/Time
        c: () => {
            return (
                f.Y() +
                "-" +
                f.m() +
                "-" +
                f.d() +
                "T" +
                f.h() +
                ":" +
                f.i() +
                ":" +
                f.s() +
                f.P()
            );
        },
        //r not supported yet
        U: () => {
            return Math.round(jsdate.getTime() / 1000);
        },
    };
    //return

    return format.replace(/[\]?[a-zA-Z]/g, (t, s) => {
        return f[t]();
    });
};
