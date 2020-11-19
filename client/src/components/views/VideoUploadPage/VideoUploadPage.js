import React, { useState } from 'react';
import Axios from 'axios';
import { Typography, Button, Form, message, Input, Icon } from 'antd';              // css를위한 라이브러리
import Dropzone from 'react-dropzone';                                              //  이미지 업로드를 위한 라이브러리

const { TextArea } = Input;
const { Title } = Typography;

// option값들의 Mapping
const PrivateOptions = [
    { value: 0, label: "Private" },
    { value: 1, label: "Public" },
];

const CategoryOptions = [
    { value: 0, label: "Film & Animation" },
    { value: 1, label: "Autos & Vehicles" },
    { value: 2, label: "Music" },
    { value: 3, label: "Pets & Animals" }
];

function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("");
    const [Description, setDescription] = useState("");

    const [ThumbnailPath, setThumnailPath] = useState("");
    const [FileDuration, setFileDuration] = useState("");
    const [FilePath,setFilePath] = useState("");

    const [Private, setPrivate] = useState(0);
    const [Category, setCategory] = useState("Film & Animation");

    const onTitleChange = (e) => {
        setVideoTitle(e.currentTarget.value);
    }

    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value);
    }

    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value);
    }

    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value);
    }

    const onDrop = (files) => {
        let formData = new FormData();

        // 파일전송을 위해서 정의
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }

        formData.append("file", files[0]);
        Axios.post('/api/video/uploadfiles', formData, config)                              // Client로 부터 전달받은 파일을 upload 폴더에 저장
            .then(response => {
                if (response.data.success) {
                    let variable = {
                        filePath: response.data.filePath,
                        fileName: response.data.fileName
                    }
                    
                    setFilePath(response.data.filePath);

                    Axios.post('/api/video/thumbnail', variable)                            // Thumbnail의 생성 / 저장 / 경로 얻어오기
                        .then(response => {
                            if (response.data.success) {
                                setThumnailPath(response.data.thumbnailPath);
                                setFileDuration(response.data.fileDuration);
                            } else {
                                alert("썸네일 생성에 실패 하였습니다.")
                            }
                        })
                } else {
                    alert("비디오 업로드를 실패했습니다.")
                }
            })
    }

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>                   
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000000}>
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'center', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize: '3rem' }} />
                            </div>
                        )}
                    </Dropzone>

                    {ThumbnailPath &&                           // ThumbnailPath가 True 인 경우만 실행
                        <div>
                            <img src={`http://localhost:5000/${ThumbnailPath}`} alt="thumbnail" />
                        </div>
                    }
                </div>

                <br />
                <br />

                <label>Title</label>
                <Input onChange={onTitleChange} value={VideoTitle} />

                <br />
                <br />

                <label>Description</label>
                <TextArea onChange={onDescriptionChange} value={Description} />

                <br />
                <br />

                <select onChange={onPrivateChange}>
                    {PrivateOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />

                <select onChange={onCategoryChange}>
                    {CategoryOptions.map((item, index) => (
                        <option key={index} value={item.value}>{item.label}</option>
                    ))}
                </select>

                <br />
                <br />

                <Button type="primary" size="large" onClick>
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage

