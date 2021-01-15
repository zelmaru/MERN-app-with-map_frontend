import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

import Button from "./Button";

function ImageUpload(props) {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedImgHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImgHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        onChange={pickedImgHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div
          onClick={pickImgHandler}
          className={
            props.round
              ? "image-upload__preview--round"
              : "image-upload__preview"
          }
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" />
          ) : (
            <p>
              {props.change ? "You can change image" : "Image is required."}
            </p>
          )}
        </div>
        <Button type="button" onClick={pickImgHandler}>
          {props.change ? "Change image" : "Upload image"}
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default ImageUpload;
