import { formatDate } from "../../utils/formatDate";
import Calendar from "./svg/Calendar";

export default function TimeStamp({ time }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-palette-green">
        <Calendar width="18" />
      </span>
      <span className="text-palette-green">{formatDate(time)}</span>
    </div>
  );
}
