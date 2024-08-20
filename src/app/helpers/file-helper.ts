import { STATIC_ASSERTS } from "../constants/static";

export const getProfileImage = (id: string) => STATIC_ASSERTS + "/profiles-images/" + id;
export const getCoverImage = (id: string) => STATIC_ASSERTS + "/cover-images/" + id;

export const getMedia = (id: string) => STATIC_ASSERTS + "/posts/" + id;

export const getGroupImage = (id: string) => STATIC_ASSERTS + "/groups-images/" + id;
export const getGroupCoverImage = (id: string) => STATIC_ASSERTS + "/groups-cover-images/" + id;
