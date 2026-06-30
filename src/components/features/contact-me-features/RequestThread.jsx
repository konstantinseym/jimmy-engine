import Btn from "../../UI/Btn";
import Trash from "../../UI/svg/Trash";

export default function RequestThread({
  request,
  reply = null,
  onDeleteRequest,
}) {
  return (
    <div className="flex w-full flex-1 flex-col items-center justify-between gap-4">
      {reply ? (
        <div className="w-full">
          <p className="text-text-muted border-palette-white/50 mr-auto mb-4 h-full w-3/4 overflow-y-auto rounded-3xl border p-3 text-left">
            {request}
          </p>
          <p className="border-palette-white/50 ml-auto h-full w-3/4 rounded-3xl border p-4 text-left">
            {reply}
          </p>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-text-muted border-palette-white/50 h-full w-3/4 rounded-3xl border p-4 text-left">
            {request}
          </p>
        </div>
      )}
      <div className="flex w-full items-center justify-between lg:px-8">
        <p className="text-text-muted">Deleting can not be undone!</p>
        <Btn variant="pill" onClick={onDeleteRequest}>
          <Trash width="18" />
        </Btn>
      </div>
    </div>
  );
}
