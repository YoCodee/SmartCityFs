import React , {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import CardGetEvent from '../../Components/CardGet/CardGetEvent'
import axios from 'axios'

function GetEvent() {
    const {user, token} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`https://web-city-server.vercel.app/api/event/user/${user._id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
    <div>GetEvent</div>
    <div className="flex flex-wrap gap-5">
    <CardGetEvent data={data}/>
    </div>
    </>

  )
}

export default GetEvent