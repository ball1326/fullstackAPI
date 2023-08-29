import { HOST, DB, USER, PASSWORD } from "../config/db.Config.mjs";
import Sequelize from "sequelize";

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: "mysql",
});

sequelize.connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has be en established successfully.");
  } catch (err) {
    if (err.original.errno === -4078)
      return console.log("Please start Apache && MySQL");
    console.error("Unable to connect to the database: ", err);
  }
};

export default sequelize;
