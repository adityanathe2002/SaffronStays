import React from 'react'
import useStore from './store';

const Zustand = () => {
    let {count,increments, decrement,fetchApi,reset,api} = useStore((state)=>state);
    console.log(count)
    
    
  return (
    <div>
        <h1>Hello</h1>
        <h1>{count}</h1>
        <button onClick={increments}>Increment</button>
        <button onClick={reset}>Reset</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={fetchApi}>Fetch API</button>
        <div>
            {api.map((val,i)=>(
                <div key={i}>
                    <h1>{val.campName}</h1>
                </div>
            ))}
        </div>
              
    </div>
  )
}

export default Zustand