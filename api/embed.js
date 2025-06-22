export default async function handler(req, res) {
  const { Title, BigImage, SmallImage, color, hidelink } = req.query;

  const title = Title || "Untitled Embed";
  const embedImage = hidelink === "true" ? "https://via.placeholder.com/1x1.png" : BigImage || "";
  const displayImage = hidelink === "true" ? "https://grabify.link/images/pixel.png" : null;
  const colorMeta = color ? `<meta name="theme-color" content="${color}">` : "";

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <meta property="og:title" content="${title}">
      ${embedImage ? `<meta property="og:image" content="${embedImage}">` : ""}
      ${SmallImage ? `<meta property="og:thumbnail" content="${SmallImage}">` : ""}
      ${colorMeta}
      <meta property="og:type" content="website">
    </head>
    <body>
      <h1>${title}</h1>
      ${
        displayImage
          ? `<img src="${displayImage}" width="1" height="1" alt="hidden link">`
          : BigImage
          ? `<img src="${BigImage}" style="max-width:100%;">`
          : ""
      }
    </body>
    </html>
  `);
}
