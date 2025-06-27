import { getTab } from "../src/api";

const EXISTING_TAB_ID = "872588"
const EXPECTED_SONG_NAME = "Scratches"

describe('getTab()', () => {
  it('should run without throwing', async () => {
    const actualTabs = await getTab(EXISTING_TAB_ID)

    expect(actualTabs.song_name).toBe(EXPECTED_SONG_NAME)
  });
});