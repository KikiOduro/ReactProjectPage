import React, { useState } from "react";

const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Crect width='600' height='600' rx='32' fill='%23f3f4f6'/%3E%3Cpath d='M140 390l92-92c10-10 26-10 36 0l44 44 98-98c10-10 26-10 36 0l114 114v70H140z' fill='%23d1d5db'/%3E%3Ccircle cx='220' cy='220' r='34' fill='%23cbd5e1'/%3E%3Ctext x='50%25' y='86%25' text-anchor='middle' fill='%236b7280' font-family='Arial, sans-serif' font-size='28'%3EImage unavailable%3C/text%3E%3C/svg%3E";

function SafeImage(props) {
  const [hasError, setHasError] = useState(false);

  const imageSource = hasError ? FALLBACK_IMAGE : props.src;

  return (
    <img
      src={imageSource}
      alt={props.alt}
      className={props.className}
      onError={function () {
        setHasError(true);
      }}
      loading={props.loading || "lazy"}
    />
  );
}

export default SafeImage;