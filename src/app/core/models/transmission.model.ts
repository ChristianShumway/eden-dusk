export interface TransmisionModel {
  id: number;
  title: string;
  description: string;
  date: string; // Formato: 'yyyy/MM/dd'
  type: string;
  time: string; // "12:00:00"
  imageUrl: string;
  imageUrlThumbnail: string;
  imageUrlMedium: string;
  color: string;
  platform: string;
}
