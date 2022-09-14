import React from "react";
import styled from "styled-components";

function UserProfile(props) {
  const { userData, signInStatus } = props;

  if (signInStatus) {
    return (
      <div>
        {userData.additionalUserInfo.profile.name}
      </div>
    );
  } else {
    return <></>;
  }
}

export default UserProfile;
