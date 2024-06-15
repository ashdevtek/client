import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings2 } from "lucide-react";
import React from "react";
import SidebarTooltip from "../sdiebar-tooltip";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <SidebarTooltip content="Settings">
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg fill-foreground"
          >
            <Settings2 className="size-5" />
          </Button>
        </DialogTrigger>
      </SidebarTooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            <div className="grid gap-2 text-left">
              <h1 className="text-xl font-bold mb-5">Settings</h1>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div >
            <div className="space-y-4">
              <p>
                Customize your app settings to fit your preferences.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-slate-700">Notifications</h3>
                  <p className="text-xs">
                    Receive updates and alerts.
                  </p>
                </div>
                <Switch id="notifications" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-slate-700">Sync Data</h3>
                  <p className="text-xs">
                    Keep your data synchronized across devices.
                  </p>
                </div>
                <Switch id="sync-data" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-slate-700">Enable Skynet</h3>
                  <p className="text-xs">
                    Let AI takeover us.
                  </p>
                </div>
                <Switch id="sync-data" />
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default Settings;
