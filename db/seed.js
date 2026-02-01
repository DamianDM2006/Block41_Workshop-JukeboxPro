import db from "#db/client";

import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createTrack } from "#db/queries/tracks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 1; i<= 3; i++) {
    await createUser(`Person-${i}-Name`, `${i}Password`);
  }

  for (let i = 1; i <= 20; i++) {
    const userId = Math.floor(Math.random() * 3) + 1;
    await createPlaylist("Playlist " + i, "lorem ipsum playlist description", userId);
    await createTrack("Track " + i, i * 50000,);
  }
  for (let i = 1; i <= 15; i++) {
    const playlistId = 1 + Math.floor(i / 2);
    await createPlaylistTrack(playlistId, i);
  }
};
