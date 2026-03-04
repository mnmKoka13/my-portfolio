export interface Availability {
  status: 'available' | 'limited' | 'unavailable';
  from?: string; // YYYY/MM
  message: string;
}
