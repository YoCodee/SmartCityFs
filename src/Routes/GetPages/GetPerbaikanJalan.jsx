import React, {useState,useEffect} from 'react'
import CardGet from '../../Components/CardGet/CardGet'
import axios from 'axios'
import { useSelector } from 'react-redux';
function GetPerbaikanJalan() {
    const {user} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`http://localhost:3000/api/perbaikan/user/${user.id}`)
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