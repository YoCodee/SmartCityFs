import React, { useState,useEffect} from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import CardGetPenangkapan from '../../Components/CardGet/CardGetPenangkapan'


function GetPenangkapan() {
    const {user, token} = useSelector((state) => state.auth);
    const [data,setData] = useState();


    useEffect(() => {
        if(user){
            axios
            .get(`http://localhost:3000/api/penangkapan/user/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            } )
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
    <div>GetPenangkapan</div>
    <div className="flex flex-wrap gap-5">
        <CardGetPenangkapan data={data}/>

    </div>
    </>
  )
}

export default GetPenangkapan