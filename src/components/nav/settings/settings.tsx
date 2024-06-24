import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import React from "react";
import { Switch } from "@/components/ui/switch";
import SidebarTooltip from "../sidebar-tooltip";
import GenericDialog from "@/components/ui/custom-dialog";

const Settings = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <GenericDialog
      open={open}
      onOpenChange={setOpen}
      title="Settings"
      description="Customize your app settings to fit your preferences."
      trigger={
        <SidebarTooltip content="Settings">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg fill-foreground hover:border-2 hover:border-blue-500 hover:text-blue-600 dark:hover:text-white"
          >
            <Settings2 className="size-5" />
          </Button>
        </SidebarTooltip>
      }
    >
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-semibold text-slate-700">Notifications</h3>
            <p className="text-xs">Receive updates and alerts.</p>
          </div>
          <Switch id="notifications" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-semibold text-slate-700">Sync Data</h3>
            <p className="text-xs">Keep your data synchronized across devices.</p>
          </div>
          <Switch id="sync-data" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-semibold text-slate-700">Enable Skynet</h3>
            <p className="text-xs">Let AI takeover us.</p>
          </div>
          <Switch id="enable-skynet" />
        </div>
      </div>
      <div className="flex justify-center w-full mt-4">
        <Button> Save preferences </Button>
      </div>
    </GenericDialog>
  );
};

export default Settings;
