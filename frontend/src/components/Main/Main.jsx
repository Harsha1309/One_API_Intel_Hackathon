import React, { useState, useEffect } from "react";
import "./Main.css";

const Main = () => {
  const [list, setList] = useState([
    { id: 1, text: "Table", distance: 2.0 },
    { id: 2, text: "Chair", distance: 3.0 },
    { id: 3, text: "Stair", distance: 3.0 },
  ]);

  const [warning, setWarning] = useState("");
  const [lastWarningTime, setLastWarningTime] = useState(0);

  const [infoMode, setInfoMode] = useState(false);

  useEffect(() => {
    let interval;

    interval = setInterval(() => {
      list.forEach((item) => {
        if (item.distance < 1.5) {
          const currentTime = new Date().getTime();
          if (currentTime - lastWarningTime >= 1000) {
            speak(
              `Warning: You are going to collide with ${item.text} and its distance is ${item.distance}`
            );
            setLastWarningTime(currentTime);
          }
        }
      });
    }, 1000); // Check distance every 1 second

    return () => clearInterval(interval);
  }, [list, lastWarningTime]);

  useEffect(() => {
    if (infoMode) {
      speakAllInformation();
    } else {
      window.speechSynthesis.cancel();
    }
  }, [infoMode]);

  const speakAllInformation = () => {
    list.forEach((item) => {
      speak(`${item.text} is at a distance of ${item.distance} meters`);
    });
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
  };

  const handleStartInfoMode = () => {
    setInfoMode(true);
  };

  const handleStopInfoMode = () => {
    setInfoMode(false);
  };

  return (
    <div>
      
      <div className="row">
        <div className="col-6 object">
          <div className="common">
            <h4 className="text-center">Objects</h4>
            {list.map((item) => (
              <p key={item.id}>{item.text}</p>
            ))}
          </div>
        </div>
        <div className="col-6 distance">
          <div className="common">
            <h4 className="text-center">Distance</h4>
            {list.map((item) => (
              <p key={item.id}>Distance: {item.distance} meters</p>
            ))}
          </div>
        </div>
      </div>
      <div className="buttons mt-4">
      <button type="button" className="btn btn-info mx-2"  onClick={handleStartInfoMode}>Start Info Mode</button>
      <button type="button" className="btn btn-info mx-2" onClick={handleStopInfoMode}>Cancel Info Mode</button>
      </div>
    </div>
  );
};

export default Main;
