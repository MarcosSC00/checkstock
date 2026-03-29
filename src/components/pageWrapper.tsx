import { Navigation } from "./navigation";

export function PageWrapper({children}: any) {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="md:flex-1 md:min-h-screen">
        <Navigation />
        <div className="max-w-360 w-full mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}