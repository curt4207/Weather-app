import React from "react";
import { CssBaseline, Box, Container } from "@mui/material";
import styled from "styled-components";


 const CardContainer = ({children}) => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="100%" >
                <Box sx={{backgroundColor: "#F2E205", height: "fit-content", width: "fit-content",maxWidth: "100%", padding: "0.5rem", border: "solid black 3px", display: "flex", flexDirection: "row", marginLeft: "auto", marginRight: "auto", overflow: "scroll", "&::-webkit-scrollbar": {
                    display: "none"
                }}}>{children}</Box>
            </Container>
        </React.Fragment>
    )
 };

export default CardContainer;
// position: "absolute", left: "10vw",top: "600px"