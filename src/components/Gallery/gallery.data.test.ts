import { describe, expect, it } from "vitest";
import { EQUIPMENT_PHOTOS } from "./gallery.data";

describe("EQUIPMENT_PHOTOS", () => {
  it("has no repeated photos", () => {
    const ids = EQUIPMENT_PHOTOS.map((photo) => photo.id);
    const sources = EQUIPMENT_PHOTOS.map((photo) => photo.src);

    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(sources).size).toBe(sources.length);
  });

  it("describes every photo", () => {
    EQUIPMENT_PHOTOS.forEach((photo) => expect(photo.alt.trim()).not.toBe(""));
  });
});
