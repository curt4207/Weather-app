import styled from "styled-components";

const StyledSpan = styled.span`
background-color:  #034c8c;
display: flex;

text-align: center;
position: relative;
bottom: 0px;
width: 100vw;
@media screen {
    position: fixed;
    bottom: 0px;
    width: 100vw;
}
`;

const Footer = ({children}) => {
    return(
    <StyledSpan>
        {children}
    </StyledSpan>
    )
};

export default Footer; 