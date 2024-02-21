export default function Upload() {
  return (
    <dialog
      open
      className="
    rounded border-2
    "
    >
      <h1>Upload a file</h1>
      <input
        type="file"
        name="file"
        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
      />
    </dialog>
  );
}
