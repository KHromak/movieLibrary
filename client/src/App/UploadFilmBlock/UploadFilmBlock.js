import React, { useState } from "react";
import Message from './Message/Message';
import Progress from './Progress/Progress';
import filmService from "../../services/filmService";
import validate from "../../validations/validations";

export default function UploadFilmBlock({ message, setMessage, getFilms, setAlertColor, alertColor, pageSizeParamsObject }) {

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Upload your movie library (.txt)');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const redAlertColor = "alert alert-danger alert-dismissible fade show";
    
    const headerStyle={
        display: 'flex',
        'alignItems': 'flex-end'
    };

    const headingStyle = {'width': "70%"};

    const onChange = e => {
        if (validate.isFileTypeTxt(e.target.files[0])) {
            setFile(e.target.files[0]);
            setFileName(e.target.files[0].name);
        } else {
            setAlertColor(redAlertColor);
            setMessage('Please use file-type .txt for upload');
            setFile('');
            setFileName('');
        }
    }

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            let res = await filmService.uploadFile({
                formData,
                onUploadProgress: progress => {
                    setUploadPercentage(parseInt(Math.round(progress.loaded * 100) / progress.total))
                    setTimeout(() => setUploadPercentage(0), 10000)
                }
            });
            setAlertColor(res.data.color);
            getFilms(res.data.msg, pageSizeParamsObject);
           
            
            return fileName;

        } catch (error) {
            setAlertColor(redAlertColor);
            setMessage('Upload file error');
            setFile('');
            setFileName('');
        }
    }

    return (
        <div>
            <div className='header' style={headerStyle}>
            <h6 className='display-4 medium text-left mb-4' style={headingStyle}>Movie Library</h6>
            {message ? <Message msg={message} alertColor={alertColor}/> : null}
            </div>
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input className="custom-file-input" id="customFile" type='file' onChange={onChange}></input>
                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                    <input type='submit' value='Upload' className="btn btn-primary btn-block mt-3"></input>
                    <Progress percentage={uploadPercentage} />
                    
                </div>
            </form>
        </div>
    );

}