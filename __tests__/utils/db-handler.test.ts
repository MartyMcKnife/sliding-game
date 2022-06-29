import { addToBoard } from "./../../utils/db-handlers";
import * as handler from "../../utils/db-handlers";

let sameID: string;

describe("creating levels", () => {
  test("should create a level, and return the settings passed", async () => {
    const output = await handler.createLevel(3, 3);
    sameID = output.levelID;
    expect(output).toStrictEqual({
      levelID: expect.anything(),
      rows: 3,
      columns: 4,
    });
  });

  test("should return level with same settings", async () => {
    expect((await handler.createLevel(3, 3)).levelID).toBe(sameID);
  });
});

describe("fetching level", () => {
  test("should fetch a level", async () => {
    expect(await handler.getLevel(sameID)).toHaveProperty("levelID");
  });
});

describe("updating leaderboard", () => {
  test("should add a score", async () => {
    expect(await addToBoard("Steve", 500, 150, sameID)).not.toThrowError();
  });
});

describe("fetching leaderboard", () => {
  test("should retrieve leaderboard", async () => {
    expect(await handler.getLeaderboard()).not.toThrowError();
  });
});
