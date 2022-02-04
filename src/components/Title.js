import React from 'react'

export default function Title() {
    return (
        <div>

            <button
                style={{
                    fontSize: 25,
                    color: "white",
                    justifyContent: "center",
                    backgroundColor: 'teal',
                    position: 'absolute',
                    right: 7,
                    top: 7,
                    borderRadius: 5
                }}
                className='btn'>
                {"Emergency Services Login"}
            </button>

            <button
                style={{
                    fontSize: 25,
                    justifyContent: "center",
                    backgroundColor: 'fuchsia',
                    position: 'absolute',
                    left: 7,
                    top: 7,
                    borderRadius: 5
                }}
                className='btn'>
                {"Help"}
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

        </div >

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