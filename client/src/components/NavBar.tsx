import { AppNavBar, setItemActive } from "baseui/app-nav-bar";
import { Block } from "baseui/block";
import { Button } from "baseui/button";
import {
  ALIGN,
  HeaderNavigation,
  StyledNavigationItem,
  StyledNavigationList,
} from "baseui/header-navigation";
import { StyledLink } from "baseui/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const router = useRouter();
  const [mainItems, setMainItems] = useState([
    { label: "Create a survey" },
    { label: "Dashboard" },
  ]);

  let body = null;

  if (fetching) {
    body = null;
  } else if (true) {
    //!data?.me
    body = (
      <>
        <HeaderNavigation>
          <StyledNavigationList $align={ALIGN.left}>
            <StyledNavigationItem>Survlow</StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.center} />
          <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
              <StyledLink href="/login">Login</StyledLink>
            </StyledNavigationItem>
          </StyledNavigationList>
          <StyledNavigationList $align={ALIGN.right}>
            <StyledNavigationItem>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  router.push("/register");
                }}
              >
                Get started
              </Button>
            </StyledNavigationItem>
          </StyledNavigationList>
        </HeaderNavigation>
      </>
    );
  } else {
    body = (
      // <Flex>
      //   <Box mr={2}>{data.me.username}</Box>
      //   <Button
      //     variant="link"
      //     onClick={() => {
      //       logout();
      //     }}
      //     isLoading={logoutFetching}
      //   >
      //     Logout
      //   </Button>
      // </Flex>
      <AppNavBar
        title="Survlow"
        mainItems={mainItems}
        onMainItemSelect={(item) => {
          setMainItems((prev) => setItemActive(prev, item));
        }}
        username="Belal"
        usernameSubtitle="5 Stars"
        userItems={[
          { label: "Settings" },
          { label: "Logout" },
          // { icon: Overflow, label: "User A" },
          // { icon: Overflow, label: "User B" },
        ]}
        onUserItemSelect={(item) => {
          if (item.label == "Logout") {
            logout();
          }
        }}
        onMainItemSelect={(item) => {
          if (item.label == "Dashboard") {
            router.push("/dashboard");
          } else if (item.label == "Create a survey") {
            router.push("/survey-creator");
          }
        }}
      />
    );
  }

  // return (
  //   <HeaderNavigation>
  //     <StyledNavigationList $align={ALIGN.left}>
  //       <StyledNavigationItem>Prewser</StyledNavigationItem>
  //     </StyledNavigationList>
  //     <StyledNavigationList $align={ALIGN.center} />
  //     <StyledNavigationList $align={ALIGN.right}>
  //       <StyledNavigationItem>
  //         <StyledLink href="/login">Login</StyledLink>
  //       </StyledNavigationItem>
  //     </StyledNavigationList>
  //     <StyledNavigationList $align={ALIGN.right}>
  //       <StyledNavigationItem>
  //         <Button
  //           onClick={(e) => {
  //             e.preventDefault();
  //             router.push("/register");
  //           }}
  //         >
  //           Get started
  //         </Button>
  //       </StyledNavigationItem>
  //     </StyledNavigationList>
  //   </HeaderNavigation>
  // );

  return <Block margin="0">{body}</Block>;
};
