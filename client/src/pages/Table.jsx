import React from "react";
import Axios from "axios";
import { useEffect, useState , useContext} from "react";
import { createSearchParams,useNavigate } from "react-router-dom";
import { Context } from "../App";
export default function Table() {
  const [restaurantList, setRestaurantList] = useState([]);

  const {editId,setEditId} = useContext(Context)

  const navigate = useNavigate();

  const getAllRestaurant = async () => {
    const { data } = await Axios.get(
      "http://localhost:5000/api/v1/restaurant/"
    );
    setRestaurantList(data);
  };

  const getEditIdAndSet = (id) =>{
    setEditId(id)
  }

  const deleteOne =  async (id) =>{
    await Axios.delete(
        `http://localhost:5000/api/v1/restaurant/${id}`
      ).then((result)=>{
        getAllRestaurant()
      })
  }

  useEffect(() => {
    getAllRestaurant();
  }, []);
  return (
    <div>
      <table id="restaurants">
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Image</th>
          <th>createdAt</th>
          <th>updatedAt</th>
          <th width="85px">option</th>
        </tr>
        {restaurantList.map((element, idx) => (
          <tr key={idx}>
            <td>{element.name}</td>
            <td>{element.type}</td>
            <td className="img">
              <img src={element.img} width="50" alt="" />
            </td>
            <td>{element.createdAt}</td>
            <td>{element.updatedAt}</td>
            <td className="option-colum">
              <div className="option">
                <button
                  className="btn-edit"
                  onClick={() => {
                    setEditId(element.id)
                    navigate("/edit");
                  }}
                >
                  แก้ไข
                </button>
                <button className="btn-delete" onClick={(e)=>{
                  deleteOne(element.id)
                }}>ลบ</button>
              </div>
            </td>
          </tr>
        ))}
      </table>
      <a href="/add">เพิ่มข้อมูลร้านค้า</a>
    </div>
  );
}


