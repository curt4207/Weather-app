import styled from "styled-components";

const StyledDiv = styled.div`
background-color:  #034c8c;
color: #F2A057;
display: flexbox;
flex-direction: row;
/* position: fixed;
top: 0px; */
`;

const Header = ({children}) => {
    return (
        <StyledDiv>
           {children}
        </StyledDiv>
    )
};

export default Header;