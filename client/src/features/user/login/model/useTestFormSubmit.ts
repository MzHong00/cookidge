import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { UserQueries } from "entities/user";
import { useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { AuthService } from "shared/api/auth";

export const useTestFormSubmit = () => {
  const navigate = useNavigate();
  const queryclient = useQueryClient();
  const [errMsg, setErrMsg] = useState<string>("");

  const onSubmit: SubmitHandler<{ code: string }> = async (data) => {
    try {
      await AuthService.testAccountLogin(data.code);
      queryclient.invalidateQueries({ queryKey: [UserQueries.keys.me] });
      navigate(-1);
    } catch (error) {
      const errData = (error as AxiosError).response?.data as {
        message: string;
      };

      if (errData) return setErrMsg(errData?.message);
    }
  };

  return {
    errMsg,
    onSubmit,
  };
};
