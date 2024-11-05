import { Router } from "express";
import isAuth from "../../middleware/isAuth";
import attachCurrentUser from "../../middleware/attachCurrentUser";
import { RefrigeratorService } from "../../../services/refrigerator";
import { IUser } from "../../../interface/IUser";

const route = Router();

export default (app: Router) => {
  app.use("/refrigerator", route);

  route.get("/read-list", isAuth, attachCurrentUser, async (req, res) => {
    const user = req.user as IUser;

    try {
      const refrigeratorList = await RefrigeratorService.readList(user?._id);
      res.status(200).json(refrigeratorList);
    } catch (error) {
      console.error("냉장고 목록 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  });

  route.get("/read-detail", isAuth, attachCurrentUser, async (req, res) => {
    const user = req.user as IUser;
    const { targetId } = req.query;

    try {
      const refrigerator = await RefrigeratorService.readDetail(
        targetId as string,
        user?._id
      );
      if (!refrigerator) {
        return res.status(200).json({ message: "냉장고를 찾을 수 없습니다." });
      }
      res.status(200).json(refrigerator);
    } catch (error) {
      console.error("냉장고 상세 조회 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  });

  route.post("/create", isAuth, attachCurrentUser, async (req, res) => {
    const user = req.user;
    const refrigeratorName = req.body.name;
    try {
      const newRefrigerator = await RefrigeratorService.createRefrigerator(
        refrigeratorName,
        user?._id
      );

      if (!newRefrigerator) {
        return res.status(401).json({ message: "냉장고 생성 실패" });
      }

      res.status(201).json(newRefrigerator);
    } catch (error: any) {
      if (error.code === 11000) {
        console.error("중복된 필드:", error.keyValue);
        res.status(422).json({ message: "중복된 냉장고 이름입니다." });
      } else {
        console.error("냉장고 저장 중 오류가 발생했습니다:", error);
        res.status(500).json({ message: "서버 오류" });
      }
    }
  });

  route.patch("/update", isAuth, attachCurrentUser, async (req, res) => {
    const user = req.user as IUser;
    const updateBody = req.body.refrigerator;
    const refrigeratorId = req.body.id; // 요청에서 ID를 가져옵니다.

    try {
      const result = await RefrigeratorService.updateRefrigerator(
        refrigeratorId,
        updateBody,
        user?._id
      );
      res.status(200).json(result);
    } catch (error) {
      console.error("냉장고 업데이트 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  });

  route.delete("/delete", isAuth, attachCurrentUser, async (req, res) => {
    const user = req.user as IUser;
    const target = req.body.id;

    try {
      const result = await RefrigeratorService.deleteRefrigerator(
        target,
        user?._id
      );
      console.log(result);
      
      res.status(200).json({ message: "냉장고 삭제에 성공했습니다." });
    } catch (error) {
      console.error("냉장고 삭제 중 오류:", error);
      res.status(500).json({ message: "서버 오류" });
    }
  });
};
