import React , {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import CardGetPembuangan from '../../Components/CardGet/CardGetPembuangan'
import axios from 'axios'

function GetPembuangan() {
    const {user} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`http://localhost:3000/api/pembuangan/user/${user.id}`)
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