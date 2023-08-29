import React from 'react'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function AddRes() {

    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [imageURL, setImageURL] = useState("")

    const navigate = useNavigate();

    const insertRestaurant = async (e) => {
        e.preventDefault()

        if (!name || !type || !imageURL) {
            alert("Please provide all value !")
            return
        }

        const result = await Axios.post(
            "http://localhost:5000/api/v1/restaurant/",
            { name: name, type: type, img: imageURL }
        );
        setName("")
        setType("") 
        setImageURL("")
        
        navigate('/')
    }
    return (
        <div>
            <form action="">
                <div className='main-form'>
                    <input type="text" name='name' className='form-control' placeholder="ชื่อ" onChange={e => setName(e.target.value)} value={name}  />
                    <input type="text" name='type' className='form-control' placeholder="ชนิด" onChange={e => setType(e.target.value)} value={type} />
                    <input type="text" name='imageURL' className='form-control' placeholder="รูปภาพ" onChange={e => setImageURL(e.target.value)} value={imageURL} />
                    <input type="submit" onClick={(e) => insertRestaurant(e)} />
                </div>
            </form>
        </div>
    )
}
