export interface EurovisionData {
  year: number;
  to_country_id: string;
  to_country: string;
  performer: string;
  song: string;
  place_contest: number;
  sf_num: number | null;
  running_final: number | null;
  running_sf: number | null;
  place_final: number | null;
  points_final: number | null;
  place_sf: number | null;
  points_sf: number | null;
  points_tele_final: number | null;
  points_jury_final: number | null;
  points_tele_sf: number | null;
  points_jury_sf: number | null;
  composers: string;
  lyricists: string;
  lyrics: string;
  youtube_url: string;
}
