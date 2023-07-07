import React, { useEffect, useState } from 'react';
import './App.css';

function Counter() {
  const [countdown, setCountdown] = useState('');
  const [stars, setStars] = useState([]);
  const getNStarts = (numberOfStarts, maxOpacity, minOpacity, maxSize, isSolid) => {
    const newStars = [];

    for (let i = 0; i < numberOfStarts; i++) {
      const size = Math.random() * (maxSize - 1) + 1; // Random size between 1 and 5
      const x = Math.random() * 100; // Random X position within the container
      const y = Math.random() * 100; // Random Y position within the container
      const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity; // Random Y position within the container

      newStars.push({ size, x, y, opacity, isSolid });
    }
    return newStars;
  }

  const formatToTwoDigits = (num) => {
    return (num).toString().padStart(2, 0);
  }
  const constantStarts = getNStarts(250, 65, 40, 2, true);
  const defaultQuote = '"Time waits for no one"'
;
  useEffect(() => {
    const targetDate = new Date('January 1, 2024 00:00:00').getTime();
    const generateStars = () => {
      const numStars = Math.random() * 20 + 50; // Number of stars to generate
      setStars(constantStarts.concat(...getNStarts(numStars, 95, 75, 5, false)));
    };
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setCountdown('Countdown Over!');
        clearInterval(interval);
      } else {
        const days = formatToTwoDigits(Math.floor(distance / (1000 * 60 * 60 * 24)));
        const hours = formatToTwoDigits(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = formatToTwoDigits(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = formatToTwoDigits(Math.floor((distance % (1000 * 60)) / 1000));

        setCountdown({ days, hours, minutes, seconds });
      }
    }, 1000);
    setStars(constantStarts.concat(...getNStarts(15, 95, 75, 5, false)));
    const starsInterval = setInterval(() => {
      generateStars();
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(starsInterval);
    };
  }, []);

  return (
    <div className="counter-container">
      <h1>{defaultQuote}</h1>
      <div className="countdown">
        <section>
          <ul>
            <li><span class="days timenumbers">{countdown.days}</span>
              <p class="timeRefDays timedescription">days</p>
            </li>
            <li><span class="hours timenumbers">{countdown.hours}</span>
              <p class="timeRefHours timedescription">hours</p>
            </li>
            <li><span class="minutes timenumbers">{countdown.minutes}</span>
              <p class="timeRefMinutes timedescription">minutes</p>
            </li>
            <li><span class="seconds timenumbers yellow-text">{countdown.seconds}</span>
              <p class="timeRefSeconds timedescription">seconds</p>
            </li>
          </ul>
        </section>
      </div>
      {stars.filter(star => star.isSolid).map((star, index) => (
        <div
          key={index}
          className="star-solid"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: `${star.opacity}%`,
            borderRadius: '2px',
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        ></div>
      ))}
      {stars.filter(star => !star.isSolid).map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: '2px',
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
        ></div>
      ))}
    </div>
  );
}

export default Counter;