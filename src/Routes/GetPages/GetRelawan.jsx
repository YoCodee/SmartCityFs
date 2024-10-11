import React, { useState,useEffect} from 'react'
import CardGetRelawan from '../../Components/CardGet/CardGetRelawan'
import axios from 'axios'
import { useSelector } from 'react-redux'

function GetRelawan() {
  const {user, token} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`https://web-city-server.vercel.app/api/tasks/${user._id}`,{
              headers: {
                Authorization: `Bearer ${token}`
              }
            })
            .then((res) => {
                setData(res.data);
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [user]);
  return (
    <>
    <div>Get Relawan</div>
    <div className="flex flex-wrap gap-5">
        <CardGetRelawan data={data}/>

    </div>
    </>
  )
}

export default GetRelawan