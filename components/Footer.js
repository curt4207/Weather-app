import styled from "styled-components";

const StyledDiv = styled.div`
background-color:  #034c8c;
display: flexbox;
/* display: block; */
text-align: center;

`;

const Footer = ({children}) => {
    return(
    <StyledDiv>
        {children}
    </StyledDiv>
    )
};

export default Footer; 