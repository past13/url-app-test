import * as shortid from "shortid";

const  ShortId = {
    generate: () => {
        return shortid.generate();
    }
};

export default ShortId;