// import { Wrap } from "@chakra-ui/react";
import { NavBar } from "./NavBar";
import { Wrapper } from "./Wrapper";

interface LayoutProps {
  varient?: "small" | "large";
}

export const Layout: React.FC<{}> = ({ children }) => {
  return (
    <>
      <NavBar />
      <Wrapper varient={"small"}>{children}</Wrapper>
    </>
  );
};
