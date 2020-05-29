import createBotBanner from "./index";

describe("createBotBanner", () => {
  it("creates a bot banner", () => {
    const banner = createBotBanner(
      [
        "Create Bot Banner",
        "",
        "                                                                                          ",
        "A generator function to build an ASCII header with a robot and the supplied text",
      ],
      { minWidth: 140 }
    );
    console.log(banner);
  });
  it("gens a min width", () => {
    const banner = createBotBanner([], { minWidth: 140 });
    expect(banner.split("\n").every(line => line.length === 140)).toEqual(true);
  });
});
