import * as createAsciiBot from "asciibots";

function fill<T>(char: T, length: number): string {
  let result = "";
  while (result.length < length) {
    result += char;
  }
  return result;
}

/**
 * The bot sometimes has her own padding, so take it away so our paddings are honored
 * and consistent between bot and text
 */
function depadBot(botByLine: Array<string>): Array<string> {
  let b = Array.from(botByLine);
  const botWidth = Math.max(...b.map((x) => x.length));
  b.forEach((_line, i) => {
    while (b[i].length < botWidth) {
      b[i] += " ";
    }
  });
  while (/^\s$/.test(b[0])) {
    b = b.slice(1);
  }
  while (/^\s$/.test(b[b.length - 1])) {
    b = b.slice(0, b.length - 1);
  }
  while (b.every((line) => line[0] === " ")) {
    b = b.map((line) => line.slice(1));
  }
  while (b.every((line) => line[line.length - 1] === " ")) {
    b = b.map((line) => line.slice(0, line.length - 1));
  }
  return b;
}

/**
 * Create a banner with a robot and the provided text
 * 
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 * XX                 XX                                                                XX
 * XX                 XX                                                                XX
 * XX                 XX                                                                XX
 * XX       __i       XX                                                                XX
 * XX      [d b]      XX   Create Bot Banner                                            XX
 * XX       ]e[       XX                                                                XX
 * XX     /| []|\     XX                                                                XX
 * XX   ()/|___|\()   XX   Creates an ASCII header with a robot and the supplied text   XX
 * XX      /  |       XX                                                                XX
 * XX     _\  |_      XX                                                                XX
 * XX                 XX                                                                XX
 * XX                 XX                                                                XX
 * XX                 XX                                                                XX
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 * XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 *
 * @param {Array<string>} text Lines of the banner text
 * @param {string?}  options.borderChar Character to use as the border [default "@"]
 * @param {number?} options.borderWidth  [default 1]
 * @param {number?} options.botId See https://github.com/rhinodavid/asciibots#specifying-a-bot
 * @param {boolean?} options.comment Add characters at the start and end to make the banner a JS comment
 * @param {number?} options.minWidth Right-pads the text area to achive an overall width
 * @param {number?} options.padding The padding around the robot and text [default 1]
 * 
 * @returns {string}
 */
export default function createBotBanner(
  text: Array<string>,
  options?: {
    borderChar?: string; 
    borderWidth?; 
    botId?: number;
    comment?: boolean;
    minWidth?: number;
    padding?: number;
  }
): string {
  options = options ?? {};
  const { botId } = options;
  const borderChar = options.borderChar ?? "@";
  const padding = options.padding ?? 1;
  const borderWidth = options.borderWidth ?? 1;
  const comment = !!options.comment;
  const bot = createAsciiBot(botId);
  const minWidth = options.minWidth ?? 0;
  if (borderChar.length !== 1) {
    throw new Error(
      `Use a single character for the border, otherwise things go crazy. Received: ${borderChar}`
    );
  }
  let botByLine = depadBot(bot.split("\n"));

  const botHeight = botByLine.length;
  const botWidth = Math.max(...botByLine.map((x) => x.length));
  const maxTextWidth = Math.max(...text.map((x) => x.length));
  text.forEach((_line, i) => {
    while (text[i].length < maxTextWidth) {
      text[i] += " ";
    }
  });
  const contentHeight = Math.max(botHeight, text.length);

  while (botByLine.length < contentHeight) {
    botByLine.push(fill(" ", botWidth));
    if (botByLine.length < contentHeight) {
      botByLine = [fill(" ", botWidth), ...botByLine];
    }
  }

  while (text.length < contentHeight) {
    text.push(fill(" ", maxTextWidth));
    if (text.length < contentHeight) {
      text = [fill(" ", maxTextWidth), ...text];
    }
  }

  const width = Math.max(
    botWidth + maxTextWidth + padding * 4 + borderWidth * 3,
    minWidth
  );

  let resultArray = [];
  for (let i = 0; i < contentHeight; i++) {
    let lineWithoutRightBorder = `${fill(borderChar, borderWidth)}${fill(
      " ",
      padding
    )}${botByLine[i]}${fill(" ", padding)}${fill(
      borderChar,
      borderWidth
    )}${fill(" ", padding)}${text[i]}${fill(" ", padding)}`;
    lineWithoutRightBorder += fill(
      " ",
      width - (lineWithoutRightBorder.length + borderWidth)
    );
    resultArray.push(
      `${lineWithoutRightBorder}${fill(borderChar, borderWidth)}`
    );
  }
  for (let i = 0; i < padding; i++) {
    let lineWithVerticalBordersNoRightBorder = `${fill(
      borderChar,
      borderWidth
    )}${fill(" ", botWidth + 2 * padding)}${fill(
      borderChar,
      borderWidth
    )}${fill(" ", maxTextWidth + 2 * padding)}`;
    lineWithVerticalBordersNoRightBorder += fill(
      " ",
      width - (lineWithVerticalBordersNoRightBorder.length + borderWidth)
    );
    const lineWithVerticalBorders = `${lineWithVerticalBordersNoRightBorder}${fill(
      borderChar,
      borderWidth
    )}`;
    resultArray = [
      lineWithVerticalBorders,
      ...resultArray,
      lineWithVerticalBorders,
    ];
  }
  for (let i = 0; i < borderWidth; i++) {
    resultArray = [
      fill(borderChar, width),
      ...resultArray,
      fill(borderChar, width),
    ];
  }
  if (comment) {
    if (!borderWidth) {
      throw new Error("Add a border width to enable comment block");
    }
    if (width < 2) {
      throw new Error(
        "The banner isn't wide enough for comment indicator symbols"
      );
    }
    resultArray[0][0] = "/";
    resultArray[0][1] = "*";
    const lastLine = resultArray[resultArray.length - 1];
    lastLine[lastLine.length - 1] = "/";
    lastLine[lastLine.length - 2] = "*";
  }
  return resultArray.join("\n");
}
