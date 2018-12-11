import UserStore from "../userStore";

const store = new UserStore();

describe("User Store", () => {
  it("should return user by login using store", async () => {
    const data = await store.getUserByLogin("qwerty");
    expect(data).toBeDefined();
    expect(data.login).toEqual("qwerty");
  });

  it("should return resume by id", async () => {
    const data = await store.getResumeById("5ad3d5410df4c729f4473ef4");
    expect(data).toBeDefined();
    expect(data.owner).toEqual("qwerty");
  });

  it('should return resumes of "koyta_qq" user', async () => {
    const user = "koyta_qq";
    const resumesIds = await store.getResumesByOwner(user);
    expect(resumesIds).toBeDefined();
  });
});
