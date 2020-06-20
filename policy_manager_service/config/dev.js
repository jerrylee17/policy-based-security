module.exports = {
    PORT: 5000,
    mongodbHOST: process.env.MONGODB_HOST,
    mongodbPORT: process.env.MONGODB_PORT,
    mongoPassword: process.env.MONGODB_PASS,
    mongoURI: "mongodb://mongo:27017/policy_manager"
}