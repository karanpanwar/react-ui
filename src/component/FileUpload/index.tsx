import React, { useState, useCallback } from 'react';
import axios from 'axios';

import {
    Box,
    Input,
    IconButton,
    Typography,
    Card,
    Stack,
    LinearProgress,
} from '@mui/material';

import UploadFileIcon from '@mui/icons-material/UploadFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CancelIcon from '@mui/icons-material/Cancel';

import uploadService from 'src/service/uploadService';
import { convertXmlToJson } from 'src/helpers/utils';

// types
interface UploadFile {
    name: string;
    type: string;
    location: string;
    size: number;
}

type UploadCardProps = {
    fileName: string;
    progress: number;
    error?: boolean;
};

const UploadFileCard = ({ fileName, progress, error }: UploadCardProps) => {
    return (
        <Card>
            <Stack direction={'row'} sx={{ p: 2 }} spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <InsertDriveFileIcon fontSize='large' />
                </Box>
                <Box sx={{ flex: 1, alignSelf: 'center' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1,
                        }}>
                        <Typography variant='subtitle2' noWrap>
                            {fileName}
                        </Typography>
                        <Typography variant='body2' color={'text.secondary'}>
                            {progress}%
                        </Typography>
                    </Box>
                    <LinearProgress variant='determinate' value={progress} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <IconButton area-aria-label='cancel-upload' color='error'>
                        <CancelIcon />
                    </IconButton>
                </Box>
            </Stack>
        </Card>
    );
};

const FileUpload = () => {
    const [currentFile, setCurrentFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(false);

    const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onUploadProgress = useCallback((progressEvent: any) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);
        setProgress(percent);
    }, []);

    const handleOnFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        console.log('onFileChange:', event);
        const fileList = event.target.files;
        if (fileList instanceof FileList && fileList.length > 0) {
            const file = fileList[0]; // uploading single file
            setCurrentFile(file);
            setProgress(0);

            const data = await uploadService.getPresignedPostData(file);
            if (!axios.isAxiosError(data)) {
                const response = await uploadService.uploadFileToS3(
                    data,
                    file,
                    onUploadProgress
                );
                if (!axios.isAxiosError(response)) {
                    const xmlString = String(response)
                        .replaceAll('\\<\\?xml(.+?)\\?\\>', '')
                        .trim();
                    const location = convertXmlToJson(xmlString);

                    setUploadedFiles((prevUploadedFiles) => [
                        ...prevUploadedFiles,
                        {
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            location,
                        },
                    ]);
                } else {
                    console.log('error uploading file', response);
                    setError(true);
                    setProgress(0);
                }
            } else {
                console.log('upload failed while presigned data', data);
                setError(true);
                setProgress(0);
            }
        }
    };

    return (
        <Box sx={{ maxWidth: '380px' }}>
            <Box
                sx={{
                    p: 2,
                    border: '1px dashed',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <label htmlFor='file-upload'>
                    <Input
                        type='file'
                        id='file-upload'
                        name='file-upload'
                        sx={{ display: 'none' }}
                        onChange={handleOnFileChange}
                    />
                    <IconButton
                        aria-label='upload-file'
                        component='span'
                        sx={{ fontSize: '3rem' }}>
                        <UploadFileIcon fontSize='inherit' />
                    </IconButton>
                </label>
                <Typography>Browse to Choose a file</Typography>
            </Box>
            <Box py={2}>
                <Typography variant='body2' color='text.secondary' gutterBottom>
                    Uploaded
                </Typography>
                {/* upload file cards */}
                {currentFile && (
                    <UploadFileCard
                        fileName={currentFile.name}
                        progress={progress}
                        error={error}
                    />
                )}
                {uploadedFiles.length > 0 &&
                    uploadedFiles.map((file) => (
                        <UploadFileCard
                            key={'uploadedFiles' + file.name}
                            fileName={file.name}
                            progress={100}
                        />
                    ))}
            </Box>
        </Box>
    );
};

export default FileUpload;
