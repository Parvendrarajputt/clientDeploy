import React, { useState, useEffect, useContext } from 'react';
import { Box, styled, TextareaAutosize, Button, FormControl, InputBase } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { API } from '../../service/api';
import { ThemeContext } from '../../context/ThemeProvider';

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    padding: '20px',
    borderRadius: '10px',
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
}));

const InputTextField = styled(InputBase)(({ theme }) => ({
    flex: 1,
    margin: '0 30px',
    fontSize: '25px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    padding: '10px',
    '&:focus': {
        outline: 'none',
    },
}));

const StyledTextArea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    border: `2px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    padding: '10px',
    fontSize: '18px',
    marginTop: '50px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    '&:focus-visible': {
        outline: 'none',
    },
}));

const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: 'codeforinterview',
    categories: 'Tech',
    createdDate: new Date(),
};

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isDarkMode } = useContext(ThemeContext);

    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');

    const url = 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    useEffect(() => {
        const fetchData = async () => {
            let response = await API.getPostById(id);
            if (response.isSuccess) {
                setPost(response.data);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        const getImage = async () => {
            if (file) {
                const data = new FormData();
                data.append('name', file.name);
                data.append('file', file);

                const response = await API.uploadFile(data);
                if (response.isSuccess) {
                    post.picture = response.data;
                }
            }
        };
        getImage();
    }, [file, post]);

    const updateBlogPost = async () => {
        await API.updatePost(post);
        navigate(`/details/${id}`);
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <Image src={post.picture || url} alt="post" />

            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color="action" />
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <InputTextField
                    onChange={(e) => handleChange(e)}
                    value={post.title}
                    name="title"
                    placeholder="Title"
                />
                <Button onClick={() => updateBlogPost()} variant="contained" color="primary">
                    Update
                </Button>
            </StyledFormControl>

            <StyledTextArea
                rowsMin={5}
                placeholder="Tell your story..."
                name="description"
                onChange={(e) => handleChange(e)}
                value={post.description}
            />
        </Container>
    );
};

export default Update;
