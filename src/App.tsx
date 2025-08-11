import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';
function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockVisibility: boolean;
  time: Date;
  timerId: string;
};

export class App extends React.Component {
  state: State = {
    clockVisibility: true,
    time: new Date(),
    timerId: 'Clock-0',
  };

  timeIntervalId?: number;

  timerIdIntervalId?: number;

  isRunning = false;

  clickHandler = () => this.handleClick();

  contextMenuHandler = (event: MouseEvent) => {
    event.preventDefault();

    this.handleContextMenu();
  };

  handleClick() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    if (this.timeIntervalId) {
      clearInterval(this.timeIntervalId);
      this.timeIntervalId = undefined;
    }

    if (this.timerIdIntervalId) {
      clearInterval(this.timerIdIntervalId);
      this.timerIdIntervalId = undefined;
    }

    let now = new Date();
    let newName = getRandomName();

    this.setState({
      clockVisibility: true,
      time: now,
      timerId: newName,
    });

    this.timeIntervalId = window.setInterval(() => {
      now = new Date();

      this.setState({ time: now });
    }, 1000);

    this.timerIdIntervalId = window.setInterval(() => {
      newName = getRandomName();

      this.setState({ timerId: newName });
    }, 3300);
  }

  handleContextMenu() {
    this.isRunning = false;
    this.setState({ clockVisibility: false });
    window.clearInterval(this.timeIntervalId);
    window.clearInterval(this.timerIdIntervalId);
    this.timeIntervalId = undefined;
    this.timerIdIntervalId = undefined;
  }

  componentDidMount() {
    if (this.state.clockVisibility) {
      this.handleClick();
    }

    window.addEventListener('click', this.clickHandler);
    window.addEventListener('contextmenu', this.contextMenuHandler);
  }

  componentDidUpdate(_prevProps: {}, prevState: State) {
    if (prevState.time !== this.state.time) {
      // eslint-disable-next-line no-console
      console.log(this.state.time.toUTCString().slice(-12, -4));
    }

    if (prevState.timerId !== this.state.timerId) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${prevState.timerId} to ${this.state.timerId}`,
      );
    }
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.clickHandler);
    window.removeEventListener('contextmenu', this.contextMenuHandler);
  }

  render() {
    const { clockVisibility, time, timerId } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {clockVisibility && <Clock time={time} timerId={timerId} />}
      </div>
    );
  }
}
