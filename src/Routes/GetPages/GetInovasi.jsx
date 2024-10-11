import React, { useState,useEffect } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CardGetInovasi from '../../Components/CardGet/CardGetInovasi'

function GetInovasi() {
    const {user} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`https://web-city-server.vercel.app/api/inovasi/user/${user.id}`)
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
    <div>Get Inovasi</div>
    <div className="flex flex-wrap gap-5">
        <CardGetInovasi data={data}/>

    </div>
    </>
  )
}

export default GetInovasi