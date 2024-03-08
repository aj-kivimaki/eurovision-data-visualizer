import mongoose, { Schema, Document } from "mongoose";

interface EurovisionData extends Document {
  // Define an interface for the Eurovision data
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

const eurodataSchema: Schema<EurovisionData> = new Schema({
  // Define a schema for the Eurovision data
  year: { type: Number, required: true },
  to_country_id: { type: String, required: true },
  to_country: { type: String, required: true },
  performer: { type: String, required: true },
  song: { type: String, required: true },
  place_contest: { type: Number, required: true },
  sf_num: { type: Number, required: false },
  running_final: { type: Number, required: false },
  running_sf: { type: Number, required: false },
  place_final: { type: Number, required: false },
  points_final: { type: Number, required: false },
  place_sf: { type: Number, required: false },
  points_sf: { type: Number, required: false },
  points_tele_final: { type: Number, required: false },
  points_jury_final: { type: Number, required: false },
  points_tele_sf: { type: Number, required: false },
  points_jury_sf: { type: Number, required: false },
  composers: { type: String, required: false },
  lyricists: { type: String, required: false },
  lyrics: { type: String, required: false },
  youtube_url: { type: String, required: false },
});

const EurovisionModel = mongoose.model<EurovisionData>(
  "Eurovision",
  eurodataSchema
);

export default EurovisionModel;
export { EurovisionData };
