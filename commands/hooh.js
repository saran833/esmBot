// really don't like this file

const gm = require("gm").subClass({
  imageMagick: true
});

exports.run = async (message) => {
  const image = await require("../utils/imagedetect.js")(message);
  if (image === undefined) return `${message.author.mention}, you need to provide an image to mirror!`;
  message.channel.sendTyping();
  const data = `/tmp/${Math.random().toString(36).substring(2, 15)}.${image.type}`;
  const data2 = `/tmp/${Math.random().toString(36).substring(2, 15)}.${image.type}`;
  gm(image.data).gravity("South").crop(0, "50%").strip().write(data2, (error) => {
    if (error) console.error;
    gm(data2).flip().strip().write(data, async (error) => {
      if (error) console.error;
      gm(data).append(data2).toBuffer(image.type, (error, resultBuffer) => {
        if (error) console.error;
        return message.channel.createMessage("", {
          file: resultBuffer,
          name: `hooh.${image.type}`
        });
      });
    });
  });
};

exports.aliases = ["magik6", "mirror4"];