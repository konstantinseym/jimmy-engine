import { formatDate } from "../../utils/formatDate";
import Calendar from "./svg/Calendar";

export default function TimeStamp({ time }) {
  return (
    <div className="text-accent flex items-start gap-2 text-xs lg:text-sm">
      <div className="hidden lg:block">
        <Calendar width="18" />
      </div>
      <p>{formatDate(time)}</p>
    </div>
  );
}
