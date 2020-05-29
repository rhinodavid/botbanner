import createBotBanner from "./index";

const bannerText = `_______             __            _______                                               
/       \\           /  |          /       \\                                              
$$$$$$$  | ______  _$$ |_         $$$$$$$  | ______  _______  _______   ______   ______  
$$ |__$$ |/      \\/ $$   |        $$ |__$$ |/      \\/       \\/       \\ /      \\ /      \\ 
$$    $$</$$$$$$  $$$$$$/         $$    $$< $$$$$$  $$$$$$$  $$$$$$$  /$$$$$$  /$$$$$$  |
$$$$$$$  $$ |  $$ | $$ | __       $$$$$$$  |/    $$ $$ |  $$ $$ |  $$ $$    $$ $$ |  $$/ 
$$ |__$$ $$ \\__$$ | $$ |/  |      $$ |__$$ /$$$$$$$ $$ |  $$ $$ |  $$ $$$$$$$$/$$ |      
$$    $$/$$    $$/  $$  $$/       $$    $$/$$    $$ $$ |  $$ $$ |  $$ $$       $$ |      
$$$$$$$/  $$$$$$/    $$$$/        $$$$$$$/  $$$$$$$/$$/   $$/$$/   $$/ $$$$$$$/$$/       `;

describe("createBotBanner", () => {
  it("creates a banner", () => {
    console.info(createBotBanner(bannerText.split("\n"), { borderChar: "$" }));
  });
  it("renders text", () => {
    const banner = createBotBanner([
      "Create Bot Banner",
      "A generator function to build an ASCII header with a robot and the supplied text",
    ]);
    expect(banner).toContain("Create Bot Banner");
  });
  it("gens a min width", () => {
    const banner = createBotBanner([], { minWidth: 140 });
    expect(banner.split("\n").every((line) => line.length === 140)).toEqual(
      true
    );
  });
  it("makes a comment block", () => {
    const banner = createBotBanner(["Comment Banner"], {
      borderChar: "X",
      comment: true,
    });
    const lines = banner.split("\n");
    expect(lines[0]).toMatch(/^\/\*X+$/);
    expect(lines[lines.length - 1]).toMatch(/^X+\*\/$/);
  });
});
