
import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';

const Banner = styled(Box)`
    background-image: url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px bottom 0px;
    background-size: cover;



`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;

const About = () => {

    return (
        <Box>
            <Wrapper>
            <Banner/>
                <Typography variant="h3">Blog -Application</Typography>
                <Text variant="h5">
"Welcome to Blog Application , where the power of words meets the limitless potential of the internet. Our platform is a vibrant and inclusive community that celebrates the art of blogging, where your unique stories, insights, and creativity find their voice. Whether you're an aspiring writer, a seasoned blogger, or simply someone with a story to tell, we invite you to be part of our diverse and supportive family. Blogging is not just a hobby; it's a canvas for your passions and a bridge to connect with a global audience. Join us in this exhilarating journey of self-expression, connection, and discovery. Your words have the power to inspire, educate, and entertain, and we're here to help you share them with the world."
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://github.com/Parvendrarajputt" color="inherit" target="_blank"><GitHub /></Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Reach out to me on
                    <Box component="span" style={{ marginLeft: 5 }}>
                        <Link href="https://www.instagram.com/wesle_y__/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>  
                        or send me an Email 
                        <Link href="mailto:prvenrjputs@gmail.com?Subject=This is a subject" target="_blank" color="inherit">
                            <Email />
                        </Link>.
                </Text>
            </Wrapper>
        </Box>
    )
}

export default About;