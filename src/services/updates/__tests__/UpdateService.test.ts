import {updateService, compareVersions, normalizeVersion} from '../UpdateService';
import {UpdateInfo} from '../types';

describe('UpdateService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('compareVersions', () => {
    it('correctly compares semantic versions', () => {
      expect(compareVersions('1.0.1', '1.0.0')).toBe(1);
      expect(compareVersions('1.0.0', '1.0.1')).toBe(-1);
      expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
      expect(compareVersions('1.1.0', '1.0.9')).toBe(1);
      expect(compareVersions('2.0.0', '1.9.9')).toBe(1);
      expect(compareVersions('v1.0.1', '1.0.0')).toBe(1);
    });
  });

  describe('checkForUpdates', () => {
    it('returns isUpdateAvailable true when a higher version is available on GitHub', async () => {
      const mockRelease = {
        tag_name: 'v1.0.1',
        name: 'Local LLM v1.0.1',
        body: 'Bug fixes and performance improvements.',
        html_url: 'https://github.com/smartworldarafath/Local-LLM/releases/tag/v1.0.1',
        published_at: '2026-08-15T00:00:00Z',
        assets: [
          {
            id: 1,
            name: 'LocalLLM-v1.0.1.apk',
            browser_download_url: 'https://github.com/smartworldarafath/Local-LLM/releases/download/v1.0.1/LocalLLM-v1.0.1.apk',
            size: 45000000,
            content_type: 'application/vnd.android.package-archive',
          },
        ],
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockRelease,
      });

      const update = await updateService.checkForUpdates();

      expect(update.isUpdateAvailable).toBe(true);
      expect(update.latestVersion).toBe('1.0.1');
      expect(update.currentVersion).toBe('1.0.0');
      expect(update.apkAsset?.name).toBe('LocalLLM-v1.0.1.apk');
      expect(update.releaseNotes).toBe('Bug fixes and performance improvements.');
    });

    it('returns isUpdateAvailable false when on the latest version', async () => {
      const mockRelease = {
        tag_name: 'v1.0.0',
        name: 'Local LLM v1.0.0 Initial Release',
        body: 'Initial release',
        html_url: 'https://github.com/smartworldarafath/Local-LLM/releases/tag/v1.0.0',
        published_at: '2026-08-14T00:00:00Z',
        assets: [],
      };

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockRelease,
      });

      const update = await updateService.checkForUpdates();

      expect(update.isUpdateAvailable).toBe(false);
      expect(update.latestVersion).toBe('1.0.0');
      expect(update.currentVersion).toBe('1.0.0');
    });

    it('handles network error gracefully', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      const update = await updateService.checkForUpdates();

      expect(update.isUpdateAvailable).toBe(false);
      expect(update.currentVersion).toBe('1.0.0');
      expect(update.latestVersion).toBe('1.0.0');
    });
  });
});
