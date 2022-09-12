import React from "react";

function UserProfile(props) {
  const { userData, signInStatus } = props;

  if (signInStatus) {
    return (
      <div>
        <p>{userData.additionalUserInfo.profile.name}</p>
      </div>
    );
  } else {
    return <></>;
  }
}

export default UserProfile;