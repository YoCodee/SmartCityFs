import React , {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import CardGetPembuangan from '../../Components/CardGet/CardGetPembuangan'
import axios from 'axios'

function GetPembuangan() {
    const {user, token} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`https://web-city-server.vercel.app/api/pembuangan/user/${user._id}`
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
    <div className="flex flex-wrap gap-5">
        <CardGetPembuangan data={data}/>

    </div>
    </>
  )
}

export default GetPembuangan