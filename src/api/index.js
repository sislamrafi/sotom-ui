import axios from "axios";

class ApiLoaderSotom {
    static ApiDebug = true;
    static printConsole(str) {
        if (ApiLoaderSotom.ApiDebug) {
            console.log(str);
        }
    }

    constructor() {
        this.host = ApiLoaderSotom.getHostURL()
    }

    static getHostURL() {
        if (window.location.host.includes('localhost:')) {
            return process.env.REACT_APP_API_URL
        } else {
            return window.location.origin + '/api/';
        }
    }

    static getSessionIfNoSession() {
        axios
            .get(ApiLoaderSotom.getHostURL() + "get_session/")
            .then(res => {
                this.printConsole(res)
                window.miniTerminal.updateText("\n>> Session Get Success", true)
            })
            .catch(err => {
                window.miniTerminal.updateText("\n>> Session Get Error", true)
            })
    }

    static getDevice(onSuccessCallback, onFailureCallback) {
        axios
            .get(ApiLoaderSotom.getHostURL() + "get_device/", {
                params: {
                }
            })
            .then(res => {
                onSuccessCallback(res);
                window.miniTerminal.updateText("\n>> Get Device Successs", false)
            })
            .catch(err => {
                onFailureCallback(err);
                window.miniTerminal.updateText("\n>> Device Error", false)
            })
    }

    static commandDevice(command, address, value, onSuccessCallback, onFailureCallback) {
        axios
            .get(ApiLoaderSotom.getHostURL() + "command_device/", {
                params: {
                    'command': command,
                    'address': address,
                    'value': value,
                }
            })
            .then(res => {
                console.log(res.data);

                if (command != null)
                    window.miniTerminal.updateText("\n>> " + command + "  done", false)
                if (address != null)
                    window.miniTerminal.updateText(' , 0x' + (address.toString(16)), false)
                if (value != null)
                    window.miniTerminal.updateText(' , ' + value, false)
                if (onSuccessCallback != null)
                    onSuccessCallback(res);
            })
            .catch(err => {

                window.miniTerminal.updateText("\n>> Failed " + command, false)
                onFailureCallback(err,command)
            })
    }

    static getMemoryInfo(onSuccessCallback, onFailureCallback) {
        axios
            .get(ApiLoaderSotom.getHostURL() + "get_memory_info/", {
                params: {

                }
            })
            .then(res => {
                onSuccessCallback(res)
            })
            .catch(err => {
                onFailureCallback(err)
            })
    }

    static searchMemory(value, onSuccessCallback, onFailureCallback) {
        axios
            .get(ApiLoaderSotom.getHostURL() + "search_memory/", {
                params: {
                    'value': value
                }
            })
            .then(res => {
                onSuccessCallback(res)
            })
            .catch(err => {
                onFailureCallback(err)
            })
    }

    static readMemoryBlock(address, size, onSuccessCallback, onFailureCallback) {
        axios
            .get(ApiLoaderSotom.getHostURL() + "read_memory_block/", {
                params: {
                    'address': address,
                    'size':size
                }
            })
            .then(res => {
                onSuccessCallback(res)
            })
            .catch(err => {
                onFailureCallback(err)
            })
    }

    static getPeripherals(onSuccessCallback, onFailureCallback) {
        axios
            .get(ApiLoaderSotom.getHostURL() + "get_peripherals/", {
                params: {
                    
                }
            })
            .then(res => {
                console.log(res);
                onSuccessCallback(res)
            })
            .catch(err => {
                onFailureCallback(err)
            })
    }

    static getPeripheralById(id,onSuccessCallback, onFailureCallback) {
        axios
            .get(ApiLoaderSotom.getHostURL() + "get_peripheral-by-id/", {
                params: {
                    id:id,
                }
            })
            .then(res => {
                console.log(res);
                onSuccessCallback(res)
            })
            .catch(err => {
                onFailureCallback(err)
            })
    }
}

export default ApiLoaderSotom;