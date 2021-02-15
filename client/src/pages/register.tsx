import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";
import { Button } from "baseui/button";
import axios from "axios";
import { isServer } from "../utils/isServer";

interface registerProps {}

export const register: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  const register = () => {};

  if (!isServer() && localStorage.getItem("token")) {
    router.push("/");
  }

  return (
    <Wrapper varient="small">
      <Formik
        initialValues={{ email: "", username: "", password: "", org: "" }}
        onSubmit={async (values, { setErrors }) => {
          console.log(values);
          const response = await axios
            .post("https://survey-manager-v1.herokuapp.com/api/Users", {
              firstName: values.username,
              lastName: values.org,
              email: values.email,
              password: values.password,
            })
            .catch((err) => console.log(err));
          router.push("/login");

          if (response) {
            if (response.data) {
              localStorage.setItem("token", response.data.token.accessToken);
              localStorage.setItem("user", JSON.stringify(response.data.user));
              router.push("/dashboard");
            }
          }
          // const response = await register({ options: values });
          // if (response.data?.register.errors) {
          //   setErrors(toErrorMap(response.data.register.errors));
          // } else if (response.data?.register.user) {
          //   router.push("/");
          // }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="username" label="Username *" />
            <InputField name="email" label="Email*" />
            <InputField name="password" label="Password*" type="password" />
            <InputField
              name="org"
              label="Institution/Company name "
              type="password"
            />
            <Button type="submit" isLoading={isSubmitting}>
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(register);
