import React, { useEffect, useRef, useState } from 'react';
import "./form.css";

const FileUpload = (props) => {
  const { label, onUploadHook, value, onlyPlaceholder, disabled } = props;

	const [isDrop, setDropState] = useState(false)
	const [file, setFile] = useState(null)
	const inputRef = useRef(null);

	useEffect(() => {
    value && value !== "" && setFile(value) 
  },[value])

	const onDragOver = (e) => {
		e.preventDefault();
		setDropState(true);
	}
	const onDragLeave = (e) => {
		e.preventDefault();
		setDropState(false)
	}

  const setAndValidateFile = (file) => {
		var validExtensions = ["image/jpeg", "image/jpg", "image/png"];
		if(!validExtensions.some(i=> file.type === i)) {
			return alert("Wrong format upload")
		} else {
			let fileReader = new FileReader();
			fileReader.onload = () => {
				let fileUrl = fileReader.result;
				setFile(fileUrl)
			}
			fileReader.readAsDataURL(file);
		}
	}

	const onDrop = (e) => {
		e.preventDefault();
		setDropState(false)
		var file = e.dataTransfer.files[0];
		setAndValidateFile(file);
	}
	const fileUpload = (e) => {
		e.preventDefault();
		var file = e.target.files[0];
		setAndValidateFile(file);
	}

	const handleUpload = () => {
    onUploadHook && onUploadHook(file);
  }
  
  return (
    <div class={"mb-32"}>
      {label && <lable class="form-group">{label}</lable> }
      {!file ? 
        <div 
          class={`drag-area ${isDrop && !disabled ? "active" : ""}`} 
          onDragOver={onDragOver} 
          onDragLeave={onDragLeave}
          onDrop={!disabled && onDrop}
        >
          <div class="icon">
            <i class='bx bxs-file-image' ></i>
          </div>

          { !onlyPlaceholder && 
            <>
              { isDrop ?
                <span class="drag-header">Release to Upload</span>
                :
                <span class="drag-header">Drop your image here or <span class="button" onClick={()=> inputRef.current.click()}>browse</span></span>}
              <input ref={inputRef} type="file" onChange={fileUpload} hidden/>
              <span class="drag-header-subtitle">Supports: JPG, JPEG, PNG</span>
            </>
          }
        </div>
        :
        <div class="drag-area">
          <img class={`uploaded-file pt-24 pl-16 pr-16 ${onlyPlaceholder && "pb-16 "}`} src={file} />
          { !onlyPlaceholder && <div class="d-flex align-items-center pt-24 pb-16">
            <button class="btn btn-sm btn-outline-danger d-flex align-items-center mr-8" type='button' onClick={()=> setFile(null)}><i class='bx bx-x-circle mr-8 fs-24'></i> Cancel</button>
            <button class="btn btn-sm btn-outline-primary d-flex align-items-center ml-8" type='button' onClick={()=> handleUpload()}><i class='bx bx-cloud-upload mr-8 fs-24'></i> Upload</button>
          </div> }
        </div>
        }
    </div>
  );
};

export default FileUpload;