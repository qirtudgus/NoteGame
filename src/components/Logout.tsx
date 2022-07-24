import { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../modules/login';

const Logout = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate()

    useEffect(()=>{
        localStorage.removeItem('token');
        alert("세션이 만료되어 로그아웃 되었습니다.")
        navigate('/')
    },[])

    return(
        <></>
    )
    

}

export default Logout