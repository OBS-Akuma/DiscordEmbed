import Head from 'next/head';

const HIDDEN_IMAGE = "https://grabify.link/images/pixel.png";

export default function BuildPage({ title, bigImage, smallImage, color, hidelink }) {
  const imageForEmbed = hidelink ? HIDDEN_IMAGE : bigImage;

  return (
    <>
      <Head>
        <title>{title}</title>

        {/* Discord Embed Meta Tags */}
        <meta property="og:title" content={title} />
        {imageForEmbed && <meta property="og:image" content={imageForEmbed} />}
        {smallImage && <meta property="og:thumbnail" content={smallImage} />}
        <meta name="theme-color" content={color || '#5865F2'} />
        <meta property="og:type" content="website" />
      </Head>

      <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
        <h1>{title}</h1>
        {bigImage && !hidelink && (
          <img src={bigImage} alt="Big Image" style={{ maxWidth: "100%" }} />
        )}
        {smallImage && (
          <img src={smallImage} alt="Small Image" style={{ width: 100, marginTop: 10 }} />
        )}
        {hidelink && (
          <img
            src={HIDDEN_IMAGE}
            width="1"
            height="1"
            style={{ display: "none" }}
            alt="Hidden Pixel"
          />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { Title, BigImage, SmallImage, color, hidelink } = query;

  return {
    props: {
      title: Title || "Default Title",
      bigImage: BigImage || null,
      smallImage: SmallImage || null,
      color: decodeURIComponent(color || "#5865F2"),
      hidelink: hidelink === "true",
    },
  };
}
