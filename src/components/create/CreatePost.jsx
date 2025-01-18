import React, { useState, useContext } from 'react';
import { styled, Box, TextareaAutosize, Button, InputBase, FormControl } from '@mui/material';
import { AddCircle as Add } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { API } from '../../service/api';
import { DataContext } from '../../context/DataProvider';
import { toast } from 'react-toastify';
import { useTheme } from '../../context/ThemeProvider'; // Import useTheme

const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
        margin: 0,
    },
    padding: '20px',
    backgroundColor: theme.palette.background.paper, // Adjust background color based on theme
    borderRadius: '10px',
    color: theme.palette.text.primary, // Text color based on theme
}));

const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
});

const StyledFormControl = styled(FormControl)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '20px',
    color: theme.palette.text.primary, // Text color for form elements
}));

const InputTextField = styled(InputBase)(({ theme }) => ({
    flex: 1,
    margin: '0 30px',
    fontSize: '25px',
    padding: '10px',
    border: `2px solid ${theme.palette.text.disabled}`, // Border color based on theme
    borderRadius: '5px',
    backgroundColor: theme.palette.background.default, // Input background color based on theme
    color: theme.palette.text.primary, // Input text color
}));

const Textarea = styled(TextareaAutosize)(({ theme }) => ({
    width: '100%',
    border: `2px solid ${theme.palette.text.disabled}`, // Border color based on theme
    borderRadius: '5px',
    padding: '10px',
    fontSize: '18px',
    minHeight: '150px',
    backgroundColor: theme.palette.background.default, // Input background color based on theme
    color: theme.palette.text.primary, // Text color
}));

const CreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { account } = useContext(DataContext);
    const { isDarkMode } = useTheme(); // Use the theme context

    const [post, setPost] = useState({
        title: '',
        description: '',
        picture: '',
        username: '',
        categories: '',
        createdDate: new Date(),
    });

    const [isLoading, setIsLoading] = useState(false);

    const savePost = async () => {
        setIsLoading(true);

        const updatedPost = {
            ...post,
            categories: location.search?.split('=')[1] || 'All',
            username: account.username,
        };

        await API.createPost(updatedPost);

        navigate('/');
        toast.success("Post is Published !");
    };

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPost({ ...post, picture: event.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Container>
            <Image src={post.picture} alt="post" />
            <StyledFormControl>
                <label htmlFor="fileInput">
                    <Add fontSize="large" color={isDarkMode ? 'action' : 'primary'} /> {/* Icon color based on theme */}
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <InputTextField 
                    onChange={(e) => handleChange(e)} 
                    name="title" 
                    placeholder="Title" 
                />
                <Button
                    onClick={() => savePost()}
                    variant="contained"
                    color="primary"
                    disabled={isLoading}
                >
                    {isLoading ? 'Publishing...' : 'Publish'}
                </Button>
            </StyledFormControl>
            <Textarea
                required
                placeholder="**Tell your story..."
                name="description"
                onChange={(e) => handleChange(e)}
            />
        </Container>
    );
};

export default CreatePost;
