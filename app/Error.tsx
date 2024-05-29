export default function Error({
  className,
  error,
}: {
  className?: string;
  error: string;
}) {
  return (
    <div
      className={("text-[2rem] text-red-600 text-center" + className) as string}
    >
      <h1 className="text-center">{error}</h1>
    </div>
  );
}
