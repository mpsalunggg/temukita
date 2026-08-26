const BASE = "/images/template1";

const file = (n: number) => `${BASE}/pexels-fliqaindia-${n}.jpg`;

export const cover = file(35635685);

export const hero2 = file(35635686);

export const detail1 = file(35635687);

export const detail2 = file(35635693);

// Gallery images (remaining 9)
export const gallery = [
  file(35635694),
  file(35635695),
  file(35635696),
  file(35635697),
  file(35635698),
  file(35635699),
  file(35635700),
  file(35635701),
  file(35635702),
] as const;

/** Love-story milestones, in narrative order. */
export const story = [
  gallery[8],
  gallery[3],
  gallery[6],
  detail2,
] as const;
