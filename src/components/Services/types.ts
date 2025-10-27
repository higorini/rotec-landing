import type { ComponentType, SVGProps } from "react";

export type SegmentList = string[];

export type ServiceIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  residential?: SegmentList;
  business?: SegmentList;
  industrial?: SegmentList;
  Icon: ServiceIcon;
};
