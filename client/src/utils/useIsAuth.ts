import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import axios from "axios";

export const useIsAuth = () => {
  const [{ data, fetching }] = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    let config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    axios
      .post("https://survey-manager-v1.herokuapp.com/api/Surveys", {}, config)
      .catch((error) => {
        if (error.response.status == 401) {
          localStorage.removeItem("token");
        }
      });
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [fetching, data, router]);
};
