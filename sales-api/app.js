import express from "express";

const app = express();
const env = process.env;
const PORT = env.PORT || 8082;

app.listen(PORT, () => {
    console.info(`sales-api successfully started on port ${PORT}!`);
});

app.get("/api/v1/status", (req, res) => {
    return res.status(200).json({
        "service": "Sales-API",
        "status": "up",
        "HttpStatus": 200
    });
});