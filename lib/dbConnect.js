const mongoose = require("mongoose");

const dbConnect = async () => {
    if (mongoose.connections[0].readyState) {
        return;
    }

    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
};

module.exports = dbConnect;
