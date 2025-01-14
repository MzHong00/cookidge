import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";

import { AuthService } from "shared/api/auth";

export const useTestFormSubmit = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState<string>("");

  const onSubmit: SubmitHandler<{ code: string }> = async (data) => {
    const errMsg = await AuthService.testAccountLogin(data.code);
    if (errMsg) {
      return setErrMsg(errMsg);
    }

    navigate("/dashboard");
  };

  return {
    errMsg,
    onSubmit,
  };
};
