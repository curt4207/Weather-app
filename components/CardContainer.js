import React from "react";
import { CssBaseline, Box, Container } from "@mui/material";
import styled from "styled-components";



// const StyledCardContainer = styled(Container)`
//     /* display: flex; */
//     position: fixed;
//     left: 20rem;
//     bottom: 5rem;
//     `;


 const CardContainer = ({children}) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" >
                <Box sx={{backgroundColor: "gray", height: "fit-content", padding: "3px", margin: "3px", border: "solid black 4px", display: "flex", flexDirection: "row", padding: "2px"}}>{children}</Box>
            </Container>
        </React.Fragment>
    )
 };

export default CardContainer;