
import { styled, Box, Typography } from '@mui/material';
const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    height: 350px;
    overflow: hidden; /* Add this to prevent borders from overlapping */
    transition: transform 0.2s, box-shadow 0.2s; /* Add a smooth hover effect */
    justify-content: center; /* Vertically center the content */
    text-align: center; /* Horizontally center the text */
    &:hover {
        transform: scale(1.02); /* Scale up the container on hover */
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2); /* Add a shadow on hover */
    }
`;

const Image = styled('img')({
    width: '100%',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
    height: 150
});

const Text = styled(Typography)`
    color: #878787;
    font-size: 12px;
    margin: 0; /* Remove margin to center the text vertically */
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600;
    padding: 5px;
    margin: 0; /* Remove margin to center the text vertically */
`;

const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
    padding: 5px;
    margin: 0; /* Remove margin to center the text vertically */
`;


const Post = ({ post }) => {
    const url = post.picture ? post.picture : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=752&q=80';
    
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 

    return (
        <Container>
            <Image src={url} alt="post" />
            <Text>{post.categories}</Text>
            <Heading>{addEllipsis(post.title, 20)}</Heading>
            <Text>Author: {post.username}</Text>
            <Details>{addEllipsis(post.description, 100)}</Details>
        </Container>
    )
}

export default Post;