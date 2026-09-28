export function TrustBar() {
  return (
    <div className="border-y border-border bg-surface py-8">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-10">
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-12 text-sm sm:text-base font-medium text-text-secondary">
          <span className="flex items-center gap-2">Real-Time Monitoring</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-border" />
          <span className="flex items-center gap-2">Risk Detection</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-border" />
          <span className="flex items-center gap-2">Investigation</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-border" />
          <span className="flex items-center gap-2">Alert Management</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-border" />
          <span className="flex items-center gap-2">Case Management</span>
        </div>
      </div>
    </div>
  );
}
