import React from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
font-size: 20px;
position: relative;
left: 35rem;
`;

function UserProfile(props) {
  const { userData, signInStatus } = props;

  if (signInStatus) {
    return (
      <StyledDiv>
        {userData.additionalUserInfo.profile.name}
      </StyledDiv>
    );
  } else {
    return <></>;
  }
}

export default UserProfile;
