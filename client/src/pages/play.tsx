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
import { Code } from "../components/survey_components/Code";

interface registerProps {}

export const Play: React.FC<registerProps> = ({}) => {
  const router = useRouter();

  return <Code></Code>;
};

export default withUrqlClient(createUrqlClient)(Play);
