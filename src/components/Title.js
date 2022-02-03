import React from 'react'

export default function Title() {
    return (
        <div>

            <button
                style={{
                    fontSize: 25,
                    fontWeight: 200,
                    justifyContent: "center",
                    backgroundColor: 'red'
                }}
                className='btn'>
                {"Report Disaster"}
            </button>

            <div
                style={{
                    fontSize: 30,
                    fontWeight: 200,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white"
                }}

            >
                Disaster Assesment Application
            </div>
        </div>

    )
}
/*
<button 
onClick={onClick}
style={{backgroundColor:'red' }} 
className='btn'>
{"Click Me"}
</button>
*/