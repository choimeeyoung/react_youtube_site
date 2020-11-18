import React from 'react'

import {Typography,Button,Form,message,Input,Icon} from 'antd';
const {Title} = Typography;

function VideoUploadPage() {
    return (
        <div style={{maxWidth:'700px',margin:'2rem auto'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                <div style={{display:'flex',justifyContent:'space-between'}}>
                    { /* Drop zone */}
                    {/* Thumnnail */}
                </div>
            </Form>
        </div>
    )
}

export default VideoUploadPage
