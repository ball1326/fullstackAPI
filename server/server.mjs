import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import sequelize from "./db/connect.mjs";
const app = express();
//middleware
import notFoundMiddleware from "./middleware/not-found.mjs";

const myLogger = (req, res, next) => {
  console.log(req.method, req.path); 
  next();
};

//routers
import resRouter from "./routes/res.router.mjs";

const PORT = process.env.PORT || 5000;

app.use(myLogger);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1/restaurant",resRouter);

app.use(notFoundMiddleware)

const start = async () => {
  try {
    await sequelize.connectDB();
    app.listen(PORT, () => {
      console.log(`server is running on port : ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
