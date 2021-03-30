// import React from 'react'
import {
    Form,
    Input,
    Button,
    message,
    Card, Avatar, Col, Typography, Row 
  } from 'antd';
  import './Home.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Map from '../Map/Map'
export default function Home(props) {
   
    const [massage, setMassage] = useState("");
    const [data, setData] = useState([]);

    const handleChangeMassage = (event) => {
        setMassage(event.currentTarget.value)
    }

    useEffect(() => {
        axios.get('http://localhost:8090/massage/')
        .then(response => {
            if (response.status==200) {
                setData(response.data)
                console.log(response.data)
                
            } else {
                alert('Failed to get Videos')
            }
        })
        
}, [])



    const onSubmit = (event) => {

        event.preventDefault();
        var variables={
            massage:massage
        }
  var t=0
        data.forEach(e=>{
            if(e.Massage==massage){
              t++;
            }
        })

        if(t==0){
            axios.post('http://localhost:8090/massage', variables)
            .then(response => {
                console.log(response.data.status)
                if (response.data.status=='ok') {
                    message.success('Message Added Successfully');
                } else {
                    message.error('Connection Failed');
                }
            })
        }
        else{
            message.warning('Duplicate values not allowed');
        }
        // axios.get(`http://localhost:8090/massage/${massage}`)
        // .then(response => {
        //     console.log(response.data.status)
        //     if (response.data.status=='ok') {
        //         message.warning('Duplicate values not allowed');
        //     } else {
        //         axios.post('http://localhost:8090/massage', variables)
        //         .then(response => {
        //             console.log(response.data.status)
        //             if (response.data.status=='ok') {
        //                 message.success('Message Added Successfully');
        //             } else {
        //                 message.error('Connection Failed');
        //             }
        //         })
        //     }
        // })
    
    }
   var deletenew=(id)=>{
    axios.delete(`http://localhost:8090/massage/${massage}`)
    .then(response => {
        console.log(response.data.status)
        if (response.data.status=='ok') {
            message.warning('Massage  Deteled Successfully ');
        } else {
           
            message.error('Connection Failed');
                
            
        }
    })
    }


    return (
        <div>
         <div id="home">
           <div id='data'>
               {
           data.map((myList) =>  
             < Card style={{ width: 200 ,height:60,padding:2}}>
                        <p>{myList.Massage} <Button type="danger" onClick={deletenew(myList.Massageid)}>Delete</Button> </p>
              </Card>

           )}
            </div>
            <div id="form">
               <Form onSubmit={onSubmit}>
                 <Input
                    onChange={handleChangeMassage}
                    value={massage}
                    placeholder="Massage"
                />
                 <br /><br />
                 <Button type="primary" style={{ marginLeft: 8 }} onClick={onSubmit}>
                Submit
                 </Button>
                </Form>
             </div>
            </div>
             <Map></Map>
        </div>
    )
}
