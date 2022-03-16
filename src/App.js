import React from "react";
import "./App.css";
import AppFilePicker from "./components/FilePicker/FilePicker";

function App() {

  const ref = React.useRef()

  const [imagePreview,setImagePreview] = React.useState()

  return (
    <div className="App">
      <div style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-around',height:'100vh'}}>
        
        {/* ! This is file picker component */}
        
        <AppFilePicker onChange={(file)=>{
        
          console.log(file);
          // !this is extra state for test mode to preview image
          setImagePreview(URL.createObjectURL(file))
          }}  
          />

        <img alt="" ref={ref} src={imagePreview} style={{width:'50vw',height:'50vh',objectFit:'contain'}} />
        
        </div>
    </div>
  );
}

export default App;
