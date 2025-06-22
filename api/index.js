const namedColors = {
  red: 0xFF0000,
  blue: 0x3498DB,
  green: 0x2ECC71,
  yellow: 0xF1C40F,
  orange: 0xE67E22,
  purple: 0x9B59B6,
  pink: 0xFFC0CB,
  black: 0x000000,
  white: 0xFFFFFF,
  gray: 0x95A5A6
};

function parseColor(colorParam) {
  if (!colorParam) return undefined;

  const color = decodeURIComponent(colorParam).toLowerCase().trim();

  // Named color
  if (namedColors[color]) return namedColors[color];

  // Hex color (with or without #)
  const hex = color.startsWith('#') ? color.slice(1) : color;
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return parseInt(hex, 16);
  }

  return undefined; // Invalid color
}

export default function handler(req, res) {
  const {
    Title = 'Default Title',
    BigImage,
    SmallImage,
    hidelink,
    color
  } = req.query;

  const embed = {
    title: decodeURIComponent(Title),
    image: BigImage ? { url: decodeURIComponent(BigImage) } : undefined,
    thumbnail: SmallImage ? { url: decodeURIComponent(SmallImage) } : undefined,
    color: parseColor(color)
  };

  // Clean undefined fields
  Object.keys(embed).forEach(
    (key) => embed[key] === undefined && delete embed[key]
  );

  const response = {
    embeds: [embed],
    ...(hidelink === 'true' && {
      content: '​',
      files: [{
        attachment: 'https://via.placeholder.com/1x1.png',
        name: 'hidden.png'
      }]
    })
  };

  res.setHeader('Content-Type', 'application/json');
  res.status(200).json(response);
}
