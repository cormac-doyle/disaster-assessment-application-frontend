import React from "react";
const steps = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
const Step = ({ currentIndex }) => {
  return (
    <div className="steps-container">
      {steps.map((step, index) => {
        let color = currentIndex === index ? "#00d4ff" : "black";
        console.log("color", color);
        return (
          <div className="steps-item">
            <h3
              style={{
                margin: 0,
                color: color,
              }}
            >
              {step}
            </h3>
          </div>
        );
      })}
    </div>
  );
};
export default Step;