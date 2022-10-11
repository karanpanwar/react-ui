import axios, { AxiosResponse } from 'axios';

const getPresignedPostData = async (selectedFile: File) => {
    const { name } = selectedFile;
    const url =
        'https://nmruv9b3ai.execute-api.us-east-1.amazonaws.com/dev/v1/presigned-url';

    try {
        const response: AxiosResponse = await axios.get(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: { fileName: name, operation: 'caseAttachments' },
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const uploadFileToS3 = async (presignedPostData: any, file: File, onUploadProgress: (progressEvent: any) => void) => {
    const formData = new FormData();
    for (const [key, value] of presignedPostData.requestBodyparams) {
        formData.append(key, value);
    }
    formData.append('file', file);

    try {
        const response: AxiosResponse = await axios.post(
            presignedPostData.url,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress,
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
};

export default {
    getPresignedPostData,
    uploadFileToS3,
};
