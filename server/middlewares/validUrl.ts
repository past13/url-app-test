import * as validUrl from "valid-url";

const IsValidUrl = (url) => {
    if (validUrl.isUri(url)) {
        return true;
    }
    else {
        return false;
    }
};

export default IsValidUrl;