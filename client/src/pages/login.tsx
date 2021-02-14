import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useLoginMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import NextLink from "next/link";
import { Button } from "baseui/button";
import { StyledLink } from "baseui/link";

export const Login: React.FC<{}> = ({}) => {
  const router = useRouter();

  const [, login] = useLoginMutation();

  return (
    <>
      <Wrapper varient="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField name="usernameOrEmail" label="Username or Email" />
              <InputField name="password" label="Password" type="password" />
              <NextLink href="/forgot-password">
                <StyledLink $style={{ marginTop: "0", display: "block" }}>
                  Reset Password
                </StyledLink>
              </NextLink>
              <Button
                $style={{ marginTop: "20px" }}
                type="submit"
                isLoading={isSubmitting}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
