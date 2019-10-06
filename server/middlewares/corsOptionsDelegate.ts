const whitelist = ['http://amazon.com', 'http://ebay.com, http://google.com']
const notInList = -1;

const CorsOptionsDelegate = (req, callback) => {
    let corsOptions: { origin: boolean; };
    if (whitelist.indexOf(req.header('Origin')) !== notInList) {
        corsOptions = { origin: true } 
    } else {
        corsOptions = { origin: false } 
    }
    callback(null, corsOptions) 
}

export default CorsOptionsDelegate;