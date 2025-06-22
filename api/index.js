// pages/index.js

const HIDDEN_IMAGE = "https://grabify.link/images/pixel.png";

export default function Page({ title, bigImage, smallImage, color, hidelink }) {
  const mainImage = hidelink ? HIDDEN_IMAGE : bigImage;

  return (
    <>
      <head>
        <title>{title}</title>

        {/* Open Graph Embed Meta Tags */}
        <meta property="og:title" content={title} />
        {mainImage && <meta property="og:image" content={mainImage} />}
        {smallImage && <meta property="og:thumbnail" content={smallImage} />}
        {color && <meta name="theme-color" content={color} />}
        <meta property="og:type" content="website" />
      </head>

      <body>
        <h1>{title}</h1>

        {bigImage && !hidelink && (
          <img src={bigImage} alt="Big Embed Image" style={{ maxWidth: '100%' }} />
        )}

        {smallImage && (
          <img src={smallImage} alt="Small Image" style={{ width: 100, marginTop: 10 }} />
        )}

        {hidelink && (
          <img src={HIDDEN_IMAGE} width="1" height="1" style={{ display: 'none' }} alt="Hidden Pixel" />
        )}
      </body>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { Title, BigImage, SmallImage, color, hidelink } = query;

  return {
    props: {
      title: Title || ' ',
      bigImage: BigImage || null,
      smallImage: SmallImage || null,
      color: decodeURIComponent(color || '#5865F2'),
      hidelink: hidelink === 'true',
    },
  };
}
