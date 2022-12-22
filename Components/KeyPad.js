import React, { useEffect, useState } from 'react'

function KeyPad() {
    const [letters, setLetters] = useState([]);

    useEffect(()=>{
        const fetchLetters = ()=>{
            const res = require("../public/db.json");
            const ress = res.letters;
            setLetters(ress);
        }
        fetchLetters();
    },[])

  return (
    <div className='keypad'>
        {
            letters && letters.map((l) => {
                return(
                    <div key={l.key}>
                        {l.key}
                    </div>
                )
            })
        }
    </div>
  )
}

export default KeyPad