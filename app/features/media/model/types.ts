import type { UUID } from "~/shared/types/uuid";

export interface MediaItem {
  id: UUID;
  type: MediaType;
  data: Blob;
  size: number;
}

export type MediaType = "photo" | "video";
