import React from "react";
import { CssBaseline, Box, Container } from "@mui/material";
import styled from "styled-components";


 const CardContainer = ({children}) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" >
                <Box sx={{backgroundColor: "#F2E205", height: "fit-content", width: "fit-content", padding: "1px", margin: "1px", border: "solid black 4px", display: "flex", flexDirection: "row", position: "relative", left: "100px"}}>{children}</Box>
            </Container>
        </React.Fragment>
    )
 };

export default CardContainer;