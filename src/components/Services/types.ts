import type { LucideIcon } from "lucide-react";

export type SegmentList = string[];

export type ServiceIcon = LucideIcon;

export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  residential?: SegmentList;
  business?: SegmentList;
  industrial?: SegmentList;
  Icon: ServiceIcon;
};
