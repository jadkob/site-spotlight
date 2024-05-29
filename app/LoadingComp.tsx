export default function Loading({ className }: { className?: string }) {
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <span className={"loading loading-spinner w-[40vw]" + className}></span>
    </div>
  );
}
