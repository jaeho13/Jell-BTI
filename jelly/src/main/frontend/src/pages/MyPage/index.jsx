import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const MyPage = ()=>{
    const userToken = useSelector((state)=> state);
    let token = userToken.userToken
    console.log(token)

    useEffect(()=>{
        axios({
            method : "GET",
            url : `/oauth/login/userInfo?token=${token}`
        }).then((res)=>{
            console.log(res);
        })

    },[])

    return(
        <>
            <h1>프로필 페이지 입니다.</h1>
        </>
    )
}

export default MyPage;
