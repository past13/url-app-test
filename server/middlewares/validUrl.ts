import * as validUrl from "valid-url";

const IsValidUrl = (url: any): boolean => {
    if (validUrl.isUri(url)) {
        return true;
    }
    else {
        return false;
    }
};

export default IsValidUrl;