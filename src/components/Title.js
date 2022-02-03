import React from 'react'

export default function Title() {
    return (
        <div>

            <button
                style={{ backgroundColor: 'red' }}
                className='btn'>
                {"Click Me"}
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