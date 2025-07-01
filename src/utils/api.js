import axios from "axios";
import { baseUrl } from "./url";
import { useDispatch } from "react-redux";
import store from "../store";
import ComponentActions from "../store/actions/component-actions";
import CommonActions from "../store/actions/common-actions";


const instance = axios.create({
    baseURL: baseUrl,
    headers: {
        "Content-Type": "application/json",
        // "timeout": 1000
    }
});

const axiosInstanceblobFile = axios.create({
    baseURL: baseUrl,
    responseType: 'blob',
    headers: {
        "Content-Type": "application/json",
        "timeout": 1000
    }
});


instance.interceptors.request.use((request) => {
    request.headers['Authorization'] = "Bearer " + localStorage.getItem("token")

    store.dispatch(ComponentActions.loaders(true))
    return request
}, (error) => {
    store.dispatch(ComponentActions.loaders(false))
    // console.error(error.message, 'hgfhjdhgf')
})

instance.interceptors.response.use((response) => {
    if (response.config.show === 1) {
        store.dispatch(ComponentActions.loaders(false));
    }
    return response;
}, (error) => {
    store.dispatch(ComponentActions.loaders(false))
    if (error?.response?.status == 401) {
        store.dispatch(CommonActions.logoutCaller(() => {
            window.location.href = '/login';
        }))
    }

    return error?.response

})




axiosInstanceblobFile.interceptors.request.use((request) => {
    request.headers['Authorization'] = "Bearer " + localStorage.getItem("token")
    return request
}, (error) => {
    // console.error(error.message, 'hgfhjdhgf')
    // store.dispatch(Notify.loading(false))
    // store.dispatch(Notify.error(error.message))
})


axiosInstanceblobFile.interceptors.response.use((response) => {
    store.dispatch(ComponentActions.loaders(false))
    return response
}, (error) => {

    store.dispatch(ComponentActions.loaders(false))
    if (error?.response?.status == 401) {
        store.dispatch(CommonActions.logoutCaller(() => {
            window.location.href = '/login';
        }))
    }

    return error?.response
})




const Api = {
    
    get: ({ url, contentType = "application/json", show = 1 }) => {

        return instance({
            method: "GET",
            url,
            headers: {
                'Content-Type': contentType
            },
            show
        })
    },

    post: ({ data, url, contentType = "application/json", show = 1, upload = false, cb = () => { } }) => {
        console.log("uhjuhjrfuhujuhyuhyui",data,url,contentType)
        return instance({
            method: "POST",
            data,
            url,
            headers: {
                'Content-Type': contentType
            },
            show
        }).then(res => {
            console.log(res)
            // store.dispatch(Notify.progress(null));
            cb();
            return res;
        }).catch(err => {
            console.log(err)
            // store.dispatch(Notify.progress(null));
            return err.response
        })
    },
    delete: ({ data, url, contentType = "application/json", show = 1 }) => {
        return instance({
            method: "DELETE",
            data,
            url,
            headers: {
                'Content-Type': contentType
            },
            show
        })
    },
    patch: ({ data, url, contentType = "application/json", show = 1, upload = false, cb = () => { } }) => {
        return instance({
            method: "PATCH",
            data,
            url,
            headers: {
                'Content-Type': contentType
            },
            show,
            ...(upload && {
                onUploadProgress: e => {
                    store.dispatch(Notify.progress((parseInt((e.loaded * 100) / e.total))));
                }
            })
        }).then(res => {
            // store.dispatch(Notify.progress(null));
            cb();
            return res;
        }).catch(err => {
            // store.dispatch(Notify.progress(null));
            return
        })
    },
    put: ({ data, url, contentType = "application/json", show = 1 }) => {
        return instance({
            method: "PUT",
            data,
            url,
            headers: {
                'Content-Type': contentType
            }
        })
    },
    blobFile: ({ url, method, data, contentType = "application/json", show = 1 }) => {
        return axiosInstanceblobFile({
            method: method,
            url,
            data,
            responseType: 'blob',
            headers: {
                'Content-Type': contentType
            }
        })
    }
}


export default Api;