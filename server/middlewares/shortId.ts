import shortid from "shortid";

const ShortId = {
    generate: (): string => shortid.generate()
};

export default ShortId;