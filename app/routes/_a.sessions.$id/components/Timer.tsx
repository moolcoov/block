import NumberFlow, { NumberFlowGroup, continuous } from "@number-flow/react";
import type { CSSProperties } from "react";

export const Timer = ({
  seconds,
  animated = true,
}: {
  seconds: number;
  animated?: boolean;
}) => {
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return (
    <NumberFlowGroup>
      <div
        style={
          {
            fontVariantNumeric: "tabular-nums",
            "--number-flow-char-height": "0.85em",
          } as CSSProperties
        }
        className="flex items-baseline text-7xl font-black"
      >
        <NumberFlow
          value={mm}
          digits={{ 1: { max: 5 } }}
          trend={-1}
          animated={animated}
        />
        <NumberFlow
          prefix=":"
          value={ss}
          trend={-1}
          digits={{ 1: { max: 5 } }}
          format={{ minimumIntegerDigits: 2 }}
          animated={animated}
        />
      </div>
    </NumberFlowGroup>
  );
};
