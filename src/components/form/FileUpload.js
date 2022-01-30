import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { setToastr } from '../../redux/actions/ToastrMessageActions';
import "./form.css";

const FileUpload = (props) => {
  const { label, onUploadHook, value, onlyPlaceholder, disabled, wrapperClass, isStandalone } = props;

	const [isDrop, setDropState] = useState(false)
	const [file, setFile] = useState(null)
	const [isUploaded, setUpload] = useState(false)
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
		if(!validExtensions.some(i => file.type === i)) {
			return props.dispatch(setToastr(`${file.type.split('/')[1]} format not supported`, "danger"));
		} else {
			let fileReader = new FileReader();
			fileReader.onload = () => {
				let fileUrl = fileReader.result;
				setFile(fileUrl)
        !isStandalone && onUploadHook && onUploadHook(fileUrl);
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
    setUpload(true);
  }
  
  return (
    <div class={wrapperClass ? wrapperClass : "mb-32"}>
      {label && <label class="form-group">{label}</label> }
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
        <div class="drag-area p-16">
          <img class={`uploaded-file ${onlyPlaceholder && "pb-16 "}`} src={file} />
          { !onlyPlaceholder && !isUploaded && isStandalone ? 
              <div class="d-flex align-items-center pt-24 pb-16">
                <button class="btn btn-sm btn-outline-danger d-flex align-items-center mr-8" type='button' onClick={()=> setFile(null)}><i class='bx bx-x-circle mr-8 fs-20'></i> Cancel</button>
                <button class="btn btn-sm btn-outline-primary d-flex align-items-center ml-8" type='button' onClick={()=> handleUpload()}><i class='bx bx-cloud-upload mr-8 fs-20'></i> Upload</button>
              </div>
              :
              !disabled && <button class="btn btn-sm btn-link d-flex align-items-center remove-close" type='button' onClick={()=> { setUpload(false); setFile(null)}}><i class='bx bx-x-circle fs-20'></i></button>
          }
        </div>
        }
    </div>
  );
};

export default connect()(FileUpload);