// import { Wrap } from "@chakra-ui/react";
import { NavBar } from "./NavBar";
import { Wrapper } from "./Wrapper";

interface LayoutProps {
  varient?: "small" | "large";
  size?: any;
}

export const Layout: React.FC<LayoutProps> = ({ children, size }) => {
  return (
    <>
      <NavBar />
      <Wrapper size={size} varient={"small"}>
        {children}
      </Wrapper>
    </>
  );
};
