// Modules
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/connection");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.route");
const experienceRouter = require("./routes/experience.route");
const aiRouter = require("./routes/ai.route");
const companyRouter = require("./routes/company.route");
const discussionRouter = require("./routes/discussion.route");
const resourceRouter = require("./routes/resource.route");
const jobsRouter = require("./routes/jobs.route");
const { initCronJobs } = require("./utils/cron");

const port = process.env.PORT || 3000;

// Middlewares
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use("/uploads", express.static(__dirname + "/uploads"));

// Connect to DB
connectDB().then(() => {
    initCronJobs();
});

// Routes
app.get("/", (req, res) => {
    res.send("Interview Experience API");
});

app.use("/api/user", userRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/ai", aiRouter);
app.use("/api/company", companyRouter);
app.use("/api/discussion", discussionRouter);
app.use("/api/resource", resourceRouter);
app.use("/api/jobs", jobsRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});