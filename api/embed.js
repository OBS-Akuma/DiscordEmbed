export default async function handler(req, res) {
  const { Title, BigImage, SmallImage, color, hidelink } = req.query;

  const title = Title || "Untitled Embed";
  const bigImage = hidelink === "true" ? "https://grabify.link/images/pixel.png" : BigImage || "";
  const colorMeta = color ? `<meta name="theme-color" content="${color}">` : "";

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <meta property="og:title" content="${title}">
      ${bigImage ? `<meta property="og:image" content="${bigImage}">` : ""}
      ${SmallImage ? `<meta property="og:thumbnail" content="${SmallImage}">` : ""}
      ${colorMeta}
      <meta property="og:type" content="website">
    </head>
    <body>
      <h1>Embed generated for Discord</h1>
      <p>${title}</p>
    </body>
    </html>
  `);
}
