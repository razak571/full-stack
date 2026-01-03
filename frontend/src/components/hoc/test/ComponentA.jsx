import { useState } from "react";
import urlParser from "js-video-url-parser";

function ComponentA() {
  const [inputUrl, setInputUrl] = useState("");
  const [imgId, setImgId] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  const [downloading, setDownloading] = useState(false);

  const getIt = (e) => {
    e.preventDefault();

    const info = urlParser.parse(inputUrl);

    if (info && info.id) {
      setImgId(info.id);
      setInputUrl(`https://youtube.com/watch?v=${info.id}`);
      setIsDirty(false); // search completed
    } else {
      alert("Please enter a valid YouTube URL");
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      margin: "20px auto",
    },
    input: {
      padding: "12px 20px",
      width: "70%",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      marginBottom: "10px",
      outline: "none",
    },

    thumbnailCard: {
      borderBottom: "15px solid #eee",
    },
    label: {
      fontSize: "14px",
      color: "#666",
      marginBottom: "8px",
      fontWeight: "600",
    },
  };

  // 1. URL builder (REUSABLE)
  const getThumbnailUrl = (id, quality) =>
    `https://img.youtube.com/vi/${id}/${quality}.jpg`;

  // 2. Download logic (WORKING one)
  const downloadWithFetch = async (url, filename) => {
    const res = await fetch(url);
    const blob = await res.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  const THUMBNAILS = [
    { quality: "maxresdefault", label: "HD" },
    { quality: "sddefault", label: "SD" },
    { quality: "hqdefault", label: "HQ" },
    { quality: "mqdefault", label: "MQ" },
    { quality: "default", label: "DEF" },
  ];

  const downloadAllThumbnails = async () => {
    if (!imgId || downloading) return;

    setDownloading(true);

    for (const t of THUMBNAILS) {
      await downloadWithFetch(
        getThumbnailUrl(imgId, t.quality),
        `${imgId}-${t.label}.jpg`
      );
      await new Promise((r) => setTimeout(r, 400));
    }

    setDownloading(false);
  };

  return (
    <div style={styles.container}>
      {/* Headlines and Info for Visitors */}
      <h1>YouTube Thumbnail Grabber</h1>
      <p style={{ color: "#555", marginBottom: "30px" }}>
        Paste any YouTube link below to instantly extract all available
        thumbnail resolutions.
      </p>

      <form onSubmit={getIt}>
        <input
          type="text"
          value={inputUrl}
          placeholder="e.g. www.youtube.com..."
          // style={styles.input}
          className="input-field"
          onChange={(e) => {
            setInputUrl(e.target.value);
            setIsDirty(true); // user typed something new
          }}
        />
        <br />
        <button
          type="submit"
          className="button"
          disabled={!isDirty}
          style={{
            cursor: isDirty ? "pointer" : "not-allowed",
            opacity: isDirty ? 1 : 0.6,
          }}
        >
          ⬇ Get Thumbnails
        </button>
        {imgId && (
          <a
            href={`https://www.youtube.com/watch?v=${imgId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            ▶ Watch on YouTube
          </a>
        )}{" "}
        <br />
        {imgId && (
          <button
            type="button"
            disabled={downloading}
            onClick={() => downloadAllThumbnails()}
            className="button"
            style={{
              marginBottom: "-20px",
              backgroundColor: "#1e90ff",
            }}
          >
            {downloading ? "Downloading..." : "Download All Thumbnails"}
          </button>
        )}
      </form>

      {/* Only display images if we have an ID */}
      {imgId && (
        <section
          style={{
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <hr />

          <div style={styles.thumbnailCard}>
            <p style={styles.label}>
              Quality: Maximum Resolution - HD (1280 x 720)
            </p>
            <button
              style={{
                color: "#1e90ff",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bolder",
                border: "1px solid",
                margin: "5px",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={() =>
                downloadWithFetch(
                  getThumbnailUrl(imgId, "maxresdefault"),
                  `${imgId}-HD.jpg`
                )
              }
            >
              Download HD Thumbnail Image
            </button>

            <img
              src={`https://img.youtube.com/vi/${imgId}/maxresdefault.jpg`}
              alt="Max Resolution"
              style={styles.image}
            />
          </div>

          <div style={styles.thumbnailCard}>
            <p style={styles.label}>
              Quality: High/Standard Definition - SD (640 x 480)
            </p>
            <button
              style={{
                color: "#1e90ff",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bolder",
                border: "1px solid",
                margin: "5px",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={() =>
                downloadWithFetch(
                  getThumbnailUrl(imgId, "sddefault"),
                  `${imgId}-SD.jpg`
                )
              }
            >
              Download SD Thumbnail Image
            </button>
            <img
              src={`https://img.youtube.com/vi/${imgId}/sddefault.jpg`}
              alt="SD Resolution"
              style={styles.image}
            />
          </div>

          <div style={styles.thumbnailCard}>
            <p style={styles.label}>Quality: Standard - HQ (480 x 360)</p>
            <button
              style={{
                color: "#1e90ff",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bolder",
                border: "1px solid",
                margin: "5px",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={() =>
                downloadWithFetch(
                  getThumbnailUrl(imgId, "hqdefault"),
                  `${imgId}-HQ.jpg`
                )
              }
            >
              Download HQ Thumbnail Image
            </button>
            <img
              src={`https://img.youtube.com/vi/${imgId}/hqdefault.jpg`}
              alt="HQ Resolution"
              style={styles.image}
            />
          </div>

          <div style={styles.thumbnailCard}>
            <p style={styles.label}>Quality: Medium - MQ (320 x 180)</p>
            <button
              style={{
                color: "#1e90ff",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bolder",
                border: "1px solid",
                margin: "5px",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={() =>
                downloadWithFetch(
                  getThumbnailUrl(imgId, "mqdefault"),
                  `${imgId}-MQ.jpg`
                )
              }
            >
              Download MQ Thumbnail Image
            </button>
            <img
              src={`https://img.youtube.com/vi/${imgId}/mqdefault.jpg`}
              alt="MQ Resolution"
              style={styles.image}
            />
          </div>

          <div style={styles.thumbnailCard}>
            <p style={styles.label}>Quality: Small / Default (120 x 90)</p>
            <button
              style={{
                color: "#1e90ff",
                fontFamily: "Arial, sans-serif",
                fontWeight: "bolder",
                border: "1px solid",
                margin: "5px",
                padding: "5px",
                borderRadius: "5px",
              }}
              onClick={() =>
                downloadWithFetch(
                  getThumbnailUrl(imgId, "default"),
                  `${imgId}-def.jpg`
                )
              }
            >
              Download Small Thumbnail Image
            </button>
            <img
              src={`https://img.youtube.com/vi/${imgId}/default.jpg`}
              alt="Default Resolution"
              style={{ ...styles.image, margin: "0px auto" }}
            />
          </div>
        </section>
      )}
    </div>
  );
}

export default ComponentA;
