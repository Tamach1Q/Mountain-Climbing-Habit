import { STATUS_META } from '../utils/gameLogic';

export function StatusPill({ status }) {
  const meta = STATUS_META[status];

  return (
    <span className={`status-pill status-pill--${status}`}>
      {meta?.label || '不明'}
    </span>
  );
}
