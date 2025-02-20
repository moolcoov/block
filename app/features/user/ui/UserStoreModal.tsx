import { Button } from "~/shared/ui/Button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
  Drawer,
} from "~/shared/ui/Drawer";
import { LottieCoinIcon, XmarkIcon } from "~/shared/ui/icons";
import { useUserStore } from "../model/store";
import NumberFlow from "@number-flow/react";
import type { CSSProperties } from "react";

export const UserStoreModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Drawer shouldScaleBackground={false}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="h-[85vh] overflow-hidden">
        <DrawerClose asChild>
          <Button
            variant={"secondary"}
            size={"icon"}
            className="fixed top-5 left-5 z-40"
          >
            <XmarkIcon size={19} />
          </Button>
        </DrawerClose>
        <Store />
      </DrawerContent>
    </Drawer>
  );
};

const Store = () => {
  const user = useUserStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 px-5 pb-14">
      <div className="flex items-center gap-3">
        <LottieCoinIcon size={64} />
        <NumberFlow
          className="text-lottie text-6xl font-black"
          value={user.coins ?? 0}
          trend={1}
          style={
            {
              fontVariantNumeric: "tabular-nums",
              "--number-flow-char-height": "0.85em",
            } as CSSProperties
          }
        />
      </div>
      <h2 className="text-lottie text-center text-3xl font-black">
        ЛОТТИ-КОИНОВ
      </h2>
    </div>
  );
};
