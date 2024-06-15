import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import Preview from "@/components/preview/preview";
import Chat from "@/components/chat/chat";
import { ToggleTheme } from "@/components/themes/toggle-theme";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="grid h-screen w-full pl-[56px]">
      <div className="flex flex-col">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Docusage</h1>
          <ToggleTheme/>
        </header>
        <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-4">
          <Preview />
          <Chat />
        </main>
      </div>
    </div>
  );
}
