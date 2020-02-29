import React, { useState, useEffect } from "react";
import filmService from './services/filmService';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

export default function UploadFilmBlock({ message, setMessage }) {

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
            const res = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'text/plain'
                },

                onUploadProgress: ProgressEvent => {
                    setUploadPercentage(parseInt(Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total))

                    setTimeout(() => setUploadPercentage(0), 10000)
                }
            });

            const { fileName } = res.data;
            console.log(res.data);
            // console.log(JSON.parse(res.data));

            setMessage('Файл загружен');

            return fileName;

        } catch (error) {
            setMessage('Ошибка загрузки файла')
        }
    }

    return (
        <div>
            {message ? <Message msg={message} /> : null}
            <form onSubmit={onSubmit}>
                <div className="custom-file mb-4">
                    <input className="custom-file-input" id="customFile" type='file' onChange={onChange}></input>
                    <label className="custom-file-label" htmlFor="customFile">{fileName}</label>
                    <Progress percentage={uploadPercentage}/>
                    <input type='submit' value='Upload' className="btn btn-primary btn-block mt-4"></input>
                </div>
            </form>
        </div>
    );

}