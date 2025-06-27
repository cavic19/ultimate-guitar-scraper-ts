import { Tabs } from "./types";
import fetch from "./universalFetch";
import crypto from 'crypto';


const API_ROOT = "https://api.ultimate-guitar.com/api/v1"

export async function getTab(tabId: string): Promise<Tabs> {
    const deviceId = generateDeviceID();
    const apiKey = generateAPIKey(deviceId);

    const response = await fetch(
        API_ROOT + `/tab/info?tab_id=${encodeURIComponent(tabId)}&tab_access_type=private`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Connection: "close",
                "User-Agent": "UGT_ANDROID/4.11.1 (Pixel; 8.1.0)",
                "Accept-Charset": "utf-8",
                "X-UG-API-KEY": apiKey,
                "X-UG-CLIENT-ID": deviceId
            }
        }
    )
    
    return await response.json()
}



function generateDeviceID(): string {
  const raw = crypto.randomBytes(16);
  return raw.toString('hex').slice(0, 16);
}


/**
 * Generate the X-UG-API-KEY for this request.
 * The payload is the MD5 result of the concatenated value of:
 * deviceID + "2006-01-02:15" (UTC formatted) + "createLog()"
 */
function generateAPIKey(deviceID: string): string {
  const now = new Date();
  const utcYear = now.getUTCFullYear();
  const utcMonth = String(now.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const utcDate = String(now.getUTCDate()).padStart(2, '0');
  const utcHour = String(now.getUTCHours()).padStart(2, '0');

  // Format: 2006-01-02:15
  const formattedDate = `${utcYear}-${utcMonth}-${utcDate}:${utcHour}`;

  const payload = `${deviceID}${formattedDate}createLog()`;
  const hashed = crypto.createHash('md5').update(payload).digest('hex');

  return hashed;
}