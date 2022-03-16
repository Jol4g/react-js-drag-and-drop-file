
import React from "react";
import { useRef, useState } from "react";
import DragAndDrop from "../DragAndDrop/DragAndDrop";

// interface appUploadInterface {
//   type?: TYPE.SINGLE | undefined;
//   onChange: (response: fileType | fileType[] | undefined) => void;
//   containerStyle?: any;
//   accept?: string;
//   maxSize?: number;
// }

// * Single file Upload by default
/**
 * @example
 * accept = 'image/png, image/jpg, .pdf, .csv, .doc',
 * @param onChange (file) => {}
 * @param  containerStyle
 * @param  accept = 'image/png, image/jpg, etc'
 * @param  maxSize = 2048
 * @returns
 */

const AppFilePicker = ({
  onChange,
  containerStyle,
  accept = "image/png, image/jpeg, application/pdf",
  maxSize = 2048,
}) => {
  const fileInputRef = useRef();

  const [file, setFile] = useState();

  const fileValidationPromise = (file) => {
    return new Promise((resolve) => {
      let message
      message = "File size must under 2MB";
      console.log("File Type: ", file.type);

      try {
        if (file.size / 1024 > maxSize) {
          throw message;
        } else if (accept?.toLowerCase()?.split(", ").includes(file.type)) {
          resolve(file);
        } else {
          console.log("File Type: ", file.type);

          message = "Type invalid";
          throw message;
        }
      } catch (error) {
        alert(error);
      }
    });
  };

  const pickFileHandler = async (event, drop = true) => {
    let file;
    if (await drop) {
      file = event[0];
    } else {
      file = event.target?.files?.[0];
    }
    await fileValidationPromise(file).then((res) => setFileHandler(res));
  };

  const setFileHandler = (file) => {
    setFile(file);
    onChange(file);
  };

  const browseFilesHandler = () => {
    // @ts-ignore
    fileInputRef.current?.click();
  };

  const removeFileHandler = () => {
    // @ts-ignore
    setFile({});
    onChange({})
  };

  return (
    <>
      <DragAndDrop handleDrop={(event) => pickFileHandler(event, true)}>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            minWidth: 500,
            borderRadius: 20,
            border: "1px dashed ",
            ...containerStyle,
          }}
        >
          {file?.name ? (
            <div className="center" key={file?.name}>
              <h3>
                {file?.name}
                <h3
                  onClick={removeFileHandler}
                  style={{ cursor: "pointer", color: "red" }}
                >
                  {"  "} Remove
                </h3>
              </h3>
            </div>
          ) : (
            <div className="center">
              {/* <img src={Confirm} /> */}
              <h6>
                Drop your image here, or{" "}
                <h6 onClick={browseFilesHandler} style={{ cursor: "pointer" }}>
                  {" "}
                  Browse
                </h6>
              </h6>
              <h6>Supports: {accept}</h6>
            </div>
          )}
        </div>
        <input
        type={"file"}
        onChange={(event) => pickFileHandler(event, false)}
        /* @ts-ignore */
        ref={fileInputRef}
        accept={accept}
        hidden
        /* @ts-ignore */
        maxSize={2048}
      />
      </DragAndDrop>
      
    </>
  );
};

export default AppFilePicker;
