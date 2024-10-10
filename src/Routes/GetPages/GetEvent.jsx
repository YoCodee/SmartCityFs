import React , {useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import CardGetEvent from '../../Components/CardGet/CardGetEvent'
import axios from 'axios'

function GetEvent() {
    const {user} = useSelector((state) => state.auth);
    const [data,setData] = useState();

    useEffect(() => {
        if(user){
            axios
            .get(`http://localhost:3000/api/event/user/${user.id}`)
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