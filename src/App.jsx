import React,{useState} from "react";
import Footer from "./Footer";
import imageCompression from 'browser-image-compression';
import {Container,Grid,Image,Item,Button} from "semantic-ui-react";
import "./index.css";

const App=()=>{

    const [originalImage,setOriginalImage]= useState('');
    const [originalImageFile,setOriginalImageFile]= useState('');
    const [compressedImage,setCompressedImage]= useState('');
    const [fileName,setfileName]= useState('');

    function handleChange(e){
        const file=e.target.files[0];
        setOriginalImage(file);
        setOriginalImageFile(URL.createObjectURL(file));
        setfileName(file.name);

    }

    function handleCompress(e){
        e.preventDefault();

        const options={
            maxSizeMB:1,
            maxWidthOrHeight:500,
            useWebWorker:true
        }

        if(options.maxSizeMB>=originalImage/1024){
            alert("Image is too large cannot be Compressed");
            return 0;
        }


        let compress;
        imageCompression(originalImage,options).then((c)=>{
            compress=c;
            
            const link=URL.createObjectURL(compress);
            setCompressedImage(link);
        })

        };

    return (
    <>
    <h1 className="header">Image Compressor</h1>
    <Container> 
        <Grid.Column width={6}> 
        <Item> 
            {
                originalImageFile ? <Image src={originalImageFile} /> :  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgC4RszYZwlndjEI41DS3tay-AFYmGK2s8cEaGYRffLzFwYnOk4psE3eAYLiUrsUw4_Q8&usqp=CAU"/>
            }
        </Item>
       
        </Grid.Column>
        <Grid.Column width={4}> 
        &nbsp;&nbsp;&nbsp;<input 
        type="file"
        accept="images/*"
        className="mt-2 btn btn-dark w-75"
        onChange={handleChange}
        />
        {originalImageFile && <Button positive onClick={handleCompress}> Compress </Button>}
        {compressedImage && <Button className="Button">
            <a href={compressedImage} download={fileName}>
             Download </a>
             </Button>}
        </Grid.Column>

        <Grid.Column width={6}> 
        <Item> 
            {
                compressedImage ? <Image src={compressedImage} /> :  <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgC4RszYZwlndjEI41DS3tay-AFYmGK2s8cEaGYRffLzFwYnOk4psE3eAYLiUrsUw4_Q8&usqp=CAU"/>
            }
        </Item>
        </Grid.Column>
    </Container>
     
    <Footer/>
    </>
    );
}

export default App;