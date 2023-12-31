import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import { exit } from "node:process";
import { CONFIG } from "./config";
import prismaClient from "./prismaClient";
import cardRouter from "./router/cardRouter";
import openQuestionRouter from "./router/openQuestionRouter";
import subjectRouter from "./router/subjectRouter";
import testRouter from "./router/testRouter";
import themeRouter from "./router/themeRouter";
import statisticsRouter from "./router/statisticsRouter";
import userRouter from "./router/userRouter";
import UserEndpoints from "./api/users/endpoints";
import CardEndpoints from "./api/cards/endpoints";
import OpenQuestionEndpoints from "./api/openQuestions/endpoints";
import SubjectEndpoints from "./api/subjects/endpoints";
import TestEndpoints from "./api/tests/endpoints";
import ThemeEndpoints from "./api/themes/endpoints";
import StatisticsEndpoints from "./api/statistics/endpoints";
import errorMiddleware from "./mid/error";
import SessionEndpoints from "./api/sessions/endpoints";
import sessionRouter from "./router/sessionRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: CONFIG.CLIENT_URL,
  })
);

app.use(UserEndpoints.BASE, userRouter);
app.use(CardEndpoints.BASE, cardRouter);
app.use(OpenQuestionEndpoints.BASE, openQuestionRouter);
app.use(SubjectEndpoints.BASE, subjectRouter);
app.use(TestEndpoints.BASE, testRouter);
app.use(ThemeEndpoints.BASE, themeRouter);
app.use(StatisticsEndpoints.BASE, statisticsRouter);
app.use(SessionEndpoints.BASE, sessionRouter);
app.use(errorMiddleware);

const main = async () => {
  try {
    await prismaClient.$connect();
    app.listen(CONFIG.PORT, () =>
      console.log(`Server started on port ${CONFIG.PORT}`)
    );
  } catch (e) {
    console.error("Connection error. Stopping process...");
    await prismaClient.$disconnect();
    console.error(e);
  }
};

main().catch(() => console.log("Process stopped"));

process.on("SIGINT", async () => {
  await prismaClient.$disconnect();
  console.log("Disconnected with SIGINT");
  exit(0);
});
