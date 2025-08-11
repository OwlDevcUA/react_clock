type Props = {
  time: Date;
  timerId: string;
};

export const Clock: React.FC<Props> = ({ time, timerId }) => {
  return (
    <div className="Clock">
      <strong className="Clock__name">{timerId}</strong>

      {' time is '}

      <span className="Clock__time">{time.toUTCString().slice(-12, -4)}</span>
    </div>
  );
};
