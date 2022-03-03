import express from "express";

const app = express();
const env = process.env;
const PORT = env.PORT || 8080;

app.get("/api/v1/status", (req, res) => {
    return res.status(200).json({
        "service": "Auth-API",
        "status": "up",
        "httpStatus": 200
    });
});

app.listen(PORT, () => {
    console.info(`auth-api successfully started on port ${PORT}!`);
});