import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IFridgeList } from "shared/api/fridge";

export const useMoveToFirstFridge = (fridgeList: IFridgeList[] | undefined) => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!Object.keys(params).length && fridgeList) {
      navigate(`${fridgeList[0]._id}`);
    }
  }, [fridgeList, params, navigate]);
};
