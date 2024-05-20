import React from "react";
import Svg, { SvgProps, Path, Polyline, Rect } from "react-native-svg";

export default function ArrowRight(props: SvgProps): React.ReactNode {
  return (
    <Svg width={12} height={12} viewBox="-0.075 0 0.375 0.375" {...props}>
      <Path
        d="M0.052 0.008 0.214 0.165l0.002 0.002q0.007 0.007 0.008 0.02v0.003A0.03 0.03 0 0 1 0.214 0.21L0.052 0.367a0.03 0.03 0 0 1 -0.043 0 0.03 0.03 0 0 1 0 -0.043L0.15 0.188 0.009 0.051a0.03 0.03 0 0 1 0 -0.043 0.03 0.03 0 0 1 0.043 0"
        fill="#1C1C1F"
      />
    </Svg>
  );
}
