import request from "supertest";
import { app } from "../server";

describe("Fitness Recommendations API", () => {
  it("should return exercise recommendations based on fitness data", async () => {
    const response = await request(app)
      .post("/api/v1/fitness/predict-fitness")
      .send({ fitnessData: "abs" })
      .expect("Content-Type", /json/)
      .expect(200);

    // Check the structure of the response
    expect(response.body).toHaveProperty("exeData");
    expect(Array.isArray(response.body.exeData)).toBe(true);
    expect(response.body.exeData.length).toBeGreaterThan(0);
  });

  it("should handle errors gracefully", async () => {
    const response = await request(app)
      .post("/api/v1/fitness/predict-fitness")
      .send({ fitnessData: "unknown" })
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body).toHaveProperty(
      "error",
      "Error processing data with FastAPI"
    );
  });
});
