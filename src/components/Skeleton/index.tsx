import React from "react";
import {
  Skeleton as NativeBaseSkeleton,
  type ISkeletonProps,
} from "native-base";

interface SkeletonProps extends ISkeletonProps {
  children?: React.ReactNode;
}

export function Skeleton({ children, ...rest }: SkeletonProps) {
  return (
    <NativeBaseSkeleton
      {...rest}
      startColor="gray.300"
      endColor="gray.400"
      rounded="md"
    >
      {children}
    </NativeBaseSkeleton>
  );
}
