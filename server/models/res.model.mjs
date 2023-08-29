import { DataTypes } from "sequelize";
import sequelize from "../db/connect.mjs";

const Restaurant = sequelize.define("restaurants", {
  id:{
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey:true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
});

// Restaurant.sync({force:false}).then(()=>{
//   console.log('Tabel created !')
// }).catch(err=>{
//   console.log(err)
// })

export default Restaurant;
