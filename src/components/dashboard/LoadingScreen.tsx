import { RiLoader2Fill } from "react-icons/ri";


export default function LoadingScreen() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <RiLoader2Fill className="h-12 w-12 animate-spin text-primary" />
    </div>
  );
}
