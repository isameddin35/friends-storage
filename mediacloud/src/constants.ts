/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MediaItem, User } from './types';

export const MOCK_USER: User = {
  name: 'Alex Rivers',
  email: 'alex@mediacloud.inc',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNpbxteF2PceJLwrt3iQsEnCd2xa1k14us-oHM9nh84LlGVItEcKei38CslE5zIC0AwTsOqdjwByaw5XlImaucHXlpJL2vTGv_q7Tg-ukU50UUzyEz9kb_q6QKfyrlO5Td6x8qlCRzTbm2eIeEm2h3CiaX3FIEiaUyD8YDcggFJ6Lu-DFzKP75nxyPRRYUaEld9SL73Zm5CnJHNkZZT-B5yBNvAel4ou_qWaLtbHD-un2CmZvtZAV0pSr6eURFWfjBlROMsctRryw',
};

export const MOCK_MEDIA: MediaItem[] = [
  {
    id: '1',
    title: 'Iceland_Project_Final.mp4',
    type: 'video',
    url: '#',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_a8gyGXsGjo5oMnxxkqqFh5_55qHKib3mq5wbUCVDUjazpWwCQesa7tsWEmh-pUrmCtffmoe5Q5iznqMiovzCYAoWOfQEUGSv8Em-4GU_IFJ2CrjfBp_5kabXUIOZXGoJJblwpt1FmWqw06dEzdKbfwJmcduEqF4rW_eDQzUhJj2rwt8nJEFoibIyAgcePrSGIbCb7vsnDer9OpoFSBINTEWhjQyQbTuSk-ps8IirFGIzKAXmaTsTE94FbecLFX8h3LS6J365lR0',
    author: 'Alex Rivers',
    date: 'Oct 24, 2023',
    size: '1.2 GB',
    tags: ['Cinematic', '4K'],
    fileFormat: 'MP4',
    duration: '12:15',
    description: 'Final edit of our Amalfi Coast trip. Used the drone for the coastal shots near Positano. The lighting at 5 PM was absolutely incredible.',
  },
  {
    id: '2',
    title: 'Midnight_Jazz_Master.wav',
    type: 'audio',
    url: '#',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAn6RdS4SHf79Te3TaIL43ko_BMoMAkSAiIUa4f8rNwD9hEM2puL4FqJAgjaVzMVTh7VKX4_cqOmuQiYkKq9RKA15HCbkLiDyM9mrJhxIS4H5-41y1riWUnDyBsyYNwlqwL27bW3kRtUHl9r1DWJcs03vWHTRq_Q1kAd2LOkS52q-RJW2y6hGhXoB4v7_k2CCKVnmDWL-difZpSsibGnibknV8xgMe8GwwzTdVotNrts29MOTVOB3tFcuYtMZK7aInWv-iR3B3SPlY',
    author: 'Sarah Jenkins',
    date: 'Oct 22, 2023',
    size: '48 MB',
    tags: ['Lossless', 'Studio'],
    fileFormat: 'WAV',
    duration: '03:45',
  },
  {
    id: '3',
    title: 'Minimal_Exteriors_01.jpg',
    type: 'image',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmI1jFisSYTX11JFV8Wcvk485UKO5660E3TC1l0nOqkvJetMYlADWUXkymES_JkccJ8twP6p6gnSRHkEWsF7b2e5-FUdORqGQtDLyvKvfgOKLuEvbwBZeQx02yjTUi13SxgBgajibLjFEB3UAQsv_Mkp67OsTw30kMKORh0bOfagAnlYKxiCqCfkkYyJyEqMMuoCZ7knc3SssNjsnitKBioJjuFY181lCpAypIO43hEmBUT84VFP_LHhsSCL5IY4jKfWcowje6hOM',
    author: 'Alex Rivers',
    date: 'Oct 21, 2023',
    size: '24 MB',
    tags: ['RAW', 'Arch'],
    fileFormat: 'JPG',
  },
  {
    id: '4',
    title: 'Urban_Night_Vlog.mp4',
    type: 'video',
    url: '#',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBN9cLDAEHTEZG37aThw52qrxoPuykXWn-R3c4nFzOBPVLJKSI2r4EVE1ptom9uiUsHBQENhMWGb3CUhG8JUmNewZv86j3X7Y-xJ5PW8v2qsWaACLL6LnvmbE8Ua-5okvOhUaj3vh3e0V4MzEz_8_jwNBgIf0Hr37r3XNOi6eA7j2BWC1mQXgG54Udu7o4AYFRKwTELjmVwqfdKVvNtG_pIYkccnwivPN3Jw4EKDzwiJxA2vKefmoOUcJvN053gpfHE2-Yz7DDUy-Q',
    author: 'Alex Rivers',
    date: 'Oct 19, 2023',
    size: '840 MB',
    tags: ['Vlog', 'Night'],
    fileFormat: 'MP4',
    duration: '08:45',
  },
  {
    id: '5',
    title: 'Swiss_Alps_B-Roll.mp4',
    type: 'video',
    url: '#',
    thumbnailUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQaj94LEKols4BBP9zYa6R9EDiZ7jizrIx2Zv7HOAwcqwGzcGgL-YLq9L58tSgaVm25gOITqAJ552eTNdu2r63vfFdZK9UDYVlqM7uxE9iMFZ0tBE5ktbP0vNwZy2qElTpkZ6rgv91eTz_oSKFyH1_vDiO3_1i_pkFptkN_nHq3QchvrKlZbagtQvGqShwocYCvN619KYiUTEnIyd1A5rr1PQ3rAV12XkrcmK2n6r6iAGujcrOhVXIg5GopYOS7aUZ1QKripIWick',
    author: 'Jordan Smith',
    date: 'Oct 15, 2023',
    size: '2.1 GB',
    tags: ['Drone', 'Nature'],
    fileFormat: 'MP4',
    duration: '15:20',
  }
];


// Mock API fetch examples to be used in production
export async function fetchMedia() {
  const token = localStorage.getItem('token');
  const response = await fetch('/api/media', {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Failed to fetch media');
  return response.json();
}

export async function uploadFile(file: File) {
  const token = localStorage.getItem('token');
  const formData = new FormData();
  formData.append('file', file);
  const response = await fetch('/api/media/upload', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${token}` },
    body: formData,
  });
  return response.json();
}
