const RetroText = require("retrotext");

exports.run = async (message, args) => {
  if (args.length === 0) return `${message.author.mention}, you need to provide some text to generate some retro text!`;
  const [line1, line2, line3] = args.join(" ").split(",").map(elem => elem.trim());
  if (/^[\w ]+$/i.test(line1) === false || /^[\w ]+$/i.test(line2) === false || /^[\w ]+$/i.test(line3) === false) return `${message.author.mention}, only alphanumeric characters, spaces, and underscores are allowed!`;
  message.channel.sendTyping();
  let text;
  if (line3) {
    text = new RetroText().setLine(1, line1).setLine(2, line2).setLine(3, line3).setBackgroundStyle("outlineTri").setTextStyle("chrome");
  } else if (line2) {
    text = new RetroText().setLine(1, line1).setLine(2, line2).setBackgroundStyle("outlineTri").setTextStyle("chrome");
  } else {
    text = new RetroText().setLine(2, line1).setBackgroundStyle("outlineTri").setTextStyle("chrome");
  }
  const textImage = await text.fetchBuffer();
  return message.channel.createMessage("", {
    file: textImage,
    name: "retro.png"
  });
};