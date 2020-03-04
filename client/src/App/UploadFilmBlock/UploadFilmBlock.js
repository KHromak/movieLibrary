import React, { useState } from "react";
import Message from './Message/Message';
import Progress from './Progress/Progress';
import filmService from "../../services/filmService";

export default function UploadFilmBlock({ message, setMessage, getFilms, alertColor }) {

    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Загрузите библиотеку фильмов (.txt)');
    const [uploadPercentage, setUploadPercentage] = useState(0);
    

    const onChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
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

            const { fileName } = res.data;

            
            getFilms(res.data.msg);
            // setMessage(res.data.msg);

            return fileName;

        } catch (error) {
            setMessage('Ошибка загрузки файла')
        }
    }

    return (
        <div>
            {message ? <Message msg={message} alertColor={alertColor}/> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input className="custom-file-input" id="customFile" type='file' onChange={onChange}></input>
                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                    <Progress percentage={uploadPercentage} />
                    <input type='submit' value='Загрузить' className="btn btn-primary btn-block mt-4"></input>
                </div>
            </form>
        </div>
    );

}