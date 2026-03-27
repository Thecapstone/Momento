import { apiRequest } from "./client";

const CAPSULES_ROUTE = "/api/capsules";

export type CapsuleCreationPayload = {
  title: string;
  description?: string;
  teasers?: string;
  image?: string;
  image_alt_text?: string;
  video?: string;
  video_alt_text?: string;
  audio?: string;
  audio_alt_text?: string;
  private?: boolean;
};

export type CapsuleListItem = {
  id: number;
  title: string;
  description?: string;
  teasers?: string;
  url?: string;
  image_alt_text?: string;
  private: boolean;
  members: number;
  created_at: string;
};

export type CapsuleDetails = CapsuleListItem;

export type CapsuleViewResponse = {
  data: CapsuleDetails;
  message?: string;
};

export const fetchCapsules = () =>
  apiRequest<CapsuleListItem[]>(CAPSULES_ROUTE);

export const fetchCapsule = (capsuleId: number | string) =>
  apiRequest<CapsuleViewResponse>(`${CAPSULES_ROUTE}/${capsuleId}/`);

export const createCapsule = (payload: CapsuleCreationPayload) =>
  apiRequest<CapsuleListItem>(CAPSULES_ROUTE, {
    method: "POST",
    body: JSON.stringify(payload),
  });
