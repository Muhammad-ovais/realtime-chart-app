import io from 'socket.io-client';

import React from 'react';
import ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import {
    Line,
    CartesianGrid,
    BarChart,
    Bar,
    LineChart,
    XAxis,
    YAxis,
    Tooltip,
} from 'recharts'

const socket = io('http://localhost:8080',{
    transports: ['websocket', 'polling']
})

const  App= ()=>{
    const [ data, setData] = useState([])
    //1. listen for a cpu event and update the state
    useEffect(()=>{
        
        socket.on('cpu', (cpuPercent)=>{
            
            setData((val)=>[...val, cpuPercent])
            
        })
    }, [])
    return(
        <div>
            <h1>Real Time CPU Usage</h1>
            <LineChart width={500} height={300} data={data}>
             <XAxis dataKey="name"/>
                <YAxis/>
            {/* <CartesianGrid stroke="#eee" strokeDasharray="5 5"/> */}
            <Line  dataKey="value" />
  </LineChart>
    
        </div>
    )
}

export default App