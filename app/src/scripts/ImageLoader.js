import React, { useState } from 'react';
import ImageUploader from 'react-images-upload';
import ClipLoader from "react-spinners/ClipLoader";
import Tesseract from "tesseract.js";
import "./ImageLoader.css";
// https://stackoverflow.com/questions/48851807/how-to-get-jpg-image-from-heic-format-in-react-native 
// ^ kanskje detta du ser itte.

function ImageLoader() {
    const [picUrl, setPicUrl] = useState([]); 
    const [ocrText, setOcrText] = useState([]); 
    const [isLoading, setIsLoading] = useState(false); 

    
    
    
    const onDrop = (_, pictureURL) => {
        setPicUrl(pictureURL);
        console.log("picurl: " + picUrl);
        console.log("pictureURL: " + pictureURL);
    };
    
    
    
    const runOcr = () => {
        picUrl.forEach((picture) =>
         Tesseract.recognize(picture, "eng", "nor").then(({ data: { text } }) => {
             setOcrText((oldarray) => [...oldarray, text]);
         })
        );
        
        setIsLoading(true);
    };
    
    return (
        <div className="centered">
            <ImageUploader 
                className="button"
                withIcon={false}
                withPreview={true}
                buttonText="Last opp fil(er)."
                onChange={onDrop}
                background="#6B4F9B"
                maxFileSize={5242880}
                fileSizeError="File too big..."
                fileTypeError="Wrong filetype..."
                imgExtension={[".jpg", ".gif", ".png"]}
            />


            <div className="ocr-button" onClick={runOcr}>
                Skann tekst !
            </div>
            {ocrText.length > 0 ? (
                <ul className="ocr-list">
                    {ocrText.map((ot) => (
                        <li className="ocr-element" key={ocrText.indexOf(ot)}>
                            {ocrText.indexOf(ot) + 1}) 
                            <br/>
                            {ot}
                            <br/>
                            
                            <button onClick={() => {navigator.clipboard.writeText(ot)}}>
                                <div id="knapp__tekst">Kopier</div>
                            </button>
                            <br/>
                        </li>
                    ))}
                </ul>

            ) : (
                <ClipLoader color="#ffffff" loading={isLoading} size={150} />
            )}
        </div>
    );
}

export default ImageLoader