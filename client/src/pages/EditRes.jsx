import React, { useContext } from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams,Navigate, useNavigate ,generatePath} from "react-router-dom";
import { Context } from "../App";

export default function EditRes() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [imageURL, setImageURL] = useState("");

  const {editId,setEditId} = useContext(Context)

  const navigate = useNavigate();

  const getOne = async () => {
    
    if (!editId) {
      navigate("/");
    }
    try {
      const {data} = await Axios.get(`http://localhost:5000/api/v1/restaurant/${editId}`);
      setName(data.name);
      setType(data.type);
      setImageURL(data.img);
    } catch (err) {
      console.log(err);
    }
  };

  const editRes = async (e) =>{
    e.preventDefault()
    if(!name||!type||!imageURL){
        alert("กรอกข้อมูลให้ครบถ้วน")
        return 
    }
    try {
        const result = await Axios.put(
          `http://localhost:5000/api/v1/restaurant/${editId}`,
          { name: name, type: type, img: imageURL }
        );
        navigate('/')
      } catch (err) {
        console.log(err);
      }
  }

  useEffect(() => {
    getOne();
  }, []);

  const insertRestaurant = async (e) => {
    e.preventDefault();

    if (!name || !type || !imageURL) {
      alert("Please provide all value !");
      return;
    }

    const result = await Axios.post(
      "http://localhost:5000/api/v1/restaurant/",
      { name: name, type: type, img: imageURL }
    );
    setName("");
    setType("");
    setImageURL("");
  };
  return (
    <div>
      <form action="">
        <div className="main-form">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="ชื่อ"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <input
            type="text"
            name="type"
            className="form-control"
            placeholder="ชนิด"
            onChange={(e) => setType(e.target.value)}
            value={type}
          />
          <input
            type="text"
            name="imageURL"
            className="form-control"
            placeholder="รูปภาพ"
            onChange={(e) => setImageURL(e.target.value)}
            value={imageURL}
          />
          <input type="submit" onClick={(e) => editRes(e)} />
        </div>
      </form>
    </div>
  );
}
