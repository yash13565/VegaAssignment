import React, { useEffect, useState } from 'react'
import style from './SearchPage.module.css'
import { FaClosedCaptioning } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../Redux/Action'
import { useNavigate } from 'react-router-dom'
function SearchPage() {
    const dispatch = useDispatch()
    const data = useSelector(state => state)
    const navigate = useNavigate()
    console.log(data, 'Hii')
    const [photo, setPhoto] = useState('')
    const [clientId, setClientId] = useState('N7DH-IeS6SN7KYhLKhkB4dymSC0wkyt5BeUH6Al5JxI')
    console.log(setClientId)

    function handleChange(e) {
        setPhoto(e.target.value)
    }
   useEffect(()=>{
    handleSubmit(photo)
   },[])
    function handleSubmit(e) {
        try{
        const url = "https://api.unsplash.com/search/photos/?page=1&query=" + photo + "&client_id=" + clientId;
        return async (dis) => {
            const res = await fetch(url);
            const jsonData = await res.json();
            console.log(jsonData,'Myerror')
            dis({ type: actions.API, payload: jsonData.results });
    
        };
    }catch(err){
        console.error("error in searching images",err)
    }
    }
    function handleCaption(pics){
        navigate("/caption",{state:pics})
    }
    return (
        <div className={style.maincont}>
            <div className={style.header}>
                <p><FaClosedCaptioning className={style.icons} />captioner</p>
                <p>caption Your Images</p>
            </div>
            <div>
                <h3><span style={{ color: "#6C541E" }}>Name:</span>Yashwardhan Jaiswal</h3>
                <h3><span style={{ color: "#6C541E" }}>Email: </span>jaiswalyashwardhan20@gmail.com</h3>
            </div>
            <div className={style.searchcont}>
                <input className={style.inputbtn} value={photo} type='text' onChange={handleChange} name='photo' placeholder='search here...' />
                <button className={style.btn} onClick={() => dispatch(handleSubmit())} type='submit'>search</button>
            </div>
            <div className={style.imgcont}>
                {
                    data.map((pics) => {
                        return (
                            <div key={pics.id} className={style.pic}>
                                {console.log(pics)}
                                <img style={{ borderRadius: '10px', boxShadow: '0px 0px 5px 4px lightblue' }} src={pics.urls.small} width='350vw' height='350vh' alt='search,jpeg' />
                                <div className={style.btncont}>
                                    <button onClick={() =>handleCaption(pics.urls.small)}>Add Caption</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default SearchPage