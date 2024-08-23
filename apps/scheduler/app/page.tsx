import { Dock, DockItem } from "@vim/ui/dock";
import { Github, House, Pencil } from "lucide-react";

export default function Home() {
  return (
    <div className="flex items-center h-full">
      <Dock>
        <DockItem tooltip="Home">
          <House />
        </DockItem>
        <DockItem tooltip="Edit">
          <Pencil />
        </DockItem>
        <DockItem tooltip="Github">
          <Github />
        </DockItem>
      </Dock>
    </div>
  );
}
