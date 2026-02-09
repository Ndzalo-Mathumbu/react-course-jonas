import { useState } from "react";
import "./style.css";

// import PropTypes from "prop-types";

const StarsRate = function ({ children }) {
  return (
    <>
      {/* <TextViewer /> */}
      {/* <StarRating size={25} maxRating={10} color="orange" onSetRating /> */}
      {/* {children} */}
    </>
  );
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
};

const starContainerStyle = {
  display: "flex",
  gap: "0px",
};

/* const fillStar = {
  backgrounColor: "yellow",
}; */

const StarRating = function ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  defaultRating = 0,
  onSetRating = () => {},
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(defaultRating);

  const textStyle = {
    lineHeight: "2px",
    margin: "0px",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i + 1}
            onClick={() => {
              setRating(i + 1);
              onSetRating(i + 1);
            }}
            onMouseEnter={() => setTempRating(i + 1)}
            onMouseLeave={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ""}</p>
    </div>
  );
};

const Star = function ({
  onClick,
  full,
  onMouseEnter,
  onMouseLeave,
  color = "#fcc419",
  size = 48,
}) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <>
      <span
        role="button"
        style={starStyle}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {full ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill={color}
            stroke={color}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke={color}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="{2}"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>
        )}
      </span>
    </>
  );
};

// Challenge: Text Expander Component 👇

/* function TextViewer() {
  const [toggleText, setToggleText] = useState(false);
  const [toggleText2, setToggleText2] = useState(false);
  const [toggleText3, setToggleText3] = useState(false);

  const handleHideText = function () {
    setToggleText((a) => !a);
  };

  const buttonStyle = {
    backgroundColor: "#f7f7f7",
    border: "none",
    color: "blue",
  };

  return (
    <div>
      <br />

      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds.{!toggleText && `..`}{" "}
        {!toggleText && (
          <Button onClick={handleHideText} style={buttonStyle}>
            <span>{toggleText ? "Show Less" : "Read More"}</span>
          </Button>
        )}{" "}
        {toggleText &&
          `It's the stuff of
          dreams and science fiction, but believe it or not, space travel is a
          real thing. Humans and robots are constantly venturing out into the
          cosmos to uncover its secrets and push the boundaries of what's
          possible.`}{" "}
        {toggleText && (
          <Button onClick={handleHideText} style={buttonStyle}>
            <span>{toggleText ? "Collapse text" : "Read More"}</span>
          </Button>
        )}
      </TextExpander>

      <br />

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's{!toggleText3 && `...`}{" "}
        {!toggleText3 && (
          <Button onClick={() => setToggleText3((a) => !a)} style={buttonStyle}>
            <span style={{ color: "#ff6622" }}>
              {toggleText3 ? "Collapse text" : "Read More"}
            </span>
          </Button>
        )}
        {toggleText3 &&
          `not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.`}{" "}
        {toggleText3 && (
          <Button onClick={() => setToggleText3((a) => !a)} style={buttonStyle}>
            <span style={{ color: "#ff6622" }}>
              {toggleText3 ? "Collapse text" : "Read More"}
            </span>
          </Button>
        )}
      </TextExpander>
      <br />
      <TextExpander expanded={true}>
        Space missions have given us incredible insights into our universe
        {!toggleText2 && `...`}{" "}
        {!toggleText2 && (
          <Button onClick={() => setToggleText2((a) => !a)} style={buttonStyle}>
            <span>{toggleText2 ? "Show Less" : "Read More"}</span>
          </Button>
        )}
        {toggleText2 &&
          `and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!`}{" "}
        {toggleText2 && (
          <Button onClick={() => setToggleText2((a) => !a)} style={buttonStyle}>
            <span>{toggleText2 ? "Show Less" : "Read More"}</span>
          </Button>
        )}
      </TextExpander>
    </div>
  );
}

function TextExpander({ children }) {
  return <div className="box">{children}</div>;
}

const Button = function ({ children, onClick, style }) {
  return (
    <>
      <button onClick={onClick} style={style}>
        {children}
      </button>
    </>
  );
};
// export default AppTwo; */
// export default StarsRate;
export default StarRating;
