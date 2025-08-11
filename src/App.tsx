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

  clickHandler = () => this.handleClick();

  contextMenuHandler = (event: MouseEvent) => {
    event.preventDefault();

    this.handleContextMenu();
  };

  handleClick() {
    if (this.timeIntervalId) {
      clearInterval(this.timeIntervalId);
    }

    if (this.timerIdIntervalId) {
      clearInterval(this.timerIdIntervalId);
    }

    this.setState({ clockVisibility: true });
    this.timeIntervalId = window.setInterval(() => {
      const now = new Date();

      this.setState({ time: now });
      // eslint-disable-next-line no-console
      console.log(now.toUTCString().slice(-12, -4));
    }, 1000);

    this.timerIdIntervalId = window.setInterval(() => {
      const newName = getRandomName();

      this.setState({ timerId: newName });
      // eslint-disable-next-line no-console
      console.warn(newName);
    }, 3300);
  }

  handleContextMenu() {
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
