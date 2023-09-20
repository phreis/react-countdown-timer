import { useState } from 'react';

let timer;

export default function App() {
  const [targetTime, setTargetTime] = useState('2023-12-31T24:00:00');

  const [timeLeft, setTimeLeft] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  function countDown() {
    setTimeLeft((timeLeftActual) => {
      if (timeLeftActual <= 0) {
        clearInterval(timer);
        timer = 0;
        setIsFinished(true);

        return 0;
      }
      return timeLeftActual - 1;
    });
  }

  function startTimer() {
    const date1 = new Date();
    const date2 = new Date(targetTime);

    setTimeLeft(Math.round((date2.getTime() - date1.getTime()) / 1000));

    if (!timer) timer = setInterval(countDown, 1000);
  }

  return (
    <>
      <h1>Countdown Timer</h1>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <label htmlFor="topText">
          <p>
            Date/Time to count down <br /> Format: [YYYY-MM-DDTHH:MM:SS]
          </p>
        </label>
        <input
          onInput={(event) => {
            setTargetTime(event.target.value);
          }}
          value={targetTime}
          id="topText"
        />
      </form>
      <br />
      <button onClick={() => startTimer()}>Start Timer</button>
      {!isFinished ? (
        <h1>{`${Math.floor(timeLeft / 86400)} Day(s) ${Math.floor(
          (timeLeft / 3600) % 60,
        )} Hour(s) ${Math.floor((timeLeft / 60) % 60)} Minute(s) ${
          timeLeft % 60
        } Seconds`}</h1>
      ) : (
        <h1>Finished!</h1>
      )}
    </>
  );
}
