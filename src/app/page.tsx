import {CVProvider} from "@/context/CVContext";
import CVBuilder from "@/components/templates/CVBuilder";

export default function Home() {
  return (
      <CVProvider>
        <CVBuilder />
      </CVProvider>
  );
}
