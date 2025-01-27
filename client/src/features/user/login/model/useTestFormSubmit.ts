import { useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { AuthService } from "shared/api/auth";

export const useTestFormSubmit = () => {
  const [errMsg, setErrMsg] = useState<string>("");

  const onSubmit: SubmitHandler<{ code: string }> = async (data) => {
    const errMsg = await AuthService.testAccountLogin(data.code);
    if (errMsg) return setErrMsg(errMsg);

    window.location.reload();
  };

  return {
    errMsg,
    onSubmit,
  };
};
