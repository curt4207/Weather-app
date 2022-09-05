import styled from "styled-components";

const StyledDiv = styled.div`
background-color:  #034c8c;
`;

const Header = ({children}) => {
    return (
        <StyledDiv>
           {children}
        </StyledDiv>
    )
};

export default Header;