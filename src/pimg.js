import React, { useState,useEffect } from 'react'
function Pimg(props) {
    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
        const binaryData = atob(props.imageHex);
        const blob = new Blob([binaryData], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        setImageSrc(url);
        console.log(props.imageHex)
    }, [props.imageHex]);
  return (
    <div>
        <img src={imageSrc} alt='profile pic'></img>
    </div>
  )
}

export default Pimg