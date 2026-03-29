import { Navigation } from "./navigation";

export function PageWrapper({ children }: any) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="flex flex-col">
        <Navigation />
        <div className="max-w-360 w-full mx-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
