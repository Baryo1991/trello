import { AES, enc } from 'crypto-js'

const STORAGE_ENCRYPTION_KEY = 'CHEQKEY';

export default class StorageService {

    static set(key, value) {
        let dataString = JSON.stringify(value);
        let encryptData = AES.encrypt(dataString, STORAGE_ENCRYPTION_KEY).toString();
        localStorage.setItem(key, encryptData);
    }

    static get(key) {
        let dataString = localStorage.getItem(key);
        if (!dataString) {
            return null;
        }
        let decryptData = AES.decrypt(dataString, STORAGE_ENCRYPTION_KEY).toString(enc.Utf8);
        if (decryptData && decryptData !== "") {
            return JSON.parse(decryptData);
        }
        return decryptData;
    }

    static getObjectField(key, fieldName) {
        let dataString = localStorage.getItem(key);
        if (!dataString) {
            return null;
        }
        let decryptData = AES.decrypt(dataString, STORAGE_ENCRYPTION_KEY).toString(enc.Utf8);
        let data = JSON.parse(decryptData);
        if (typeof data !== "object") {
            return null;
        }
        return data[fieldName];
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static deleteCookie(name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    static getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
}