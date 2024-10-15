import React, {useState,useEffect} from 'react'
import CardGet from '../../Components/CardGet/CardGet'
import axios from 'axios'
import { useSelector } from 'react-redux';
function GetPerbaikanJalan() {
    const {user , token} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`https://web-city-server.vercel.app/api/perbaikan/user/${user._id}`
                , {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
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
    <div>PerbaikanJalan</div>
    <div className="flex  gap-6">
        <CardGet data={data}/>

    </div>
    </>
  )
}

export default GetPerbaikanJalan