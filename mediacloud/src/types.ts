/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type MediaType = 'video' | 'image' | 'audio' | 'document';

// export interface MediaItem {
//   id: string;
//   title: string;
//   type: MediaType;
//   url: string;
//   thumbnailUrl?: string;
//   author: string;
//   date: string;
//   size: string;
//   tags: string[];
//   description?: string;
//   duration?: string;
//   fileFormat: string;
// }

export interface MediaItem {
  id: string;
  title: string;
  type: 'VIDEO' | 'IMAGE' | 'AUDIO' | 'DOCUMENT';  // uppercase to match backend
  url: string;
  thumbnailUrl?: string;
  description?: string;
  duration?: string;
  fileFormat: string;
  size: number;                                        // number, not string
  createdAt: string;                                   // ISO date string from backend
  author: { username: string };                        // object, not string
  tags: string[];
}

export type ViewState = 'home' | 'upload' | 'detail';

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}
