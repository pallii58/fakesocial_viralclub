import { toJpeg, toPng } from "html-to-image";

export interface CaptureOptions {
  pixelRatio?: number;
  transparent?: boolean;
}

export async function captureElement(
  element: HTMLElement,
  format: "png" | "jpeg",
  options: CaptureOptions = {}
): Promise<string> {
  const { pixelRatio = 2, transparent = false } = options;

  const base = {
    pixelRatio,
    cacheBust: true,
    backgroundColor:
      format === "jpeg" ? "#ffffff" : transparent ? undefined : "#ffffff",
  };

  if (format === "png") {
    return toPng(element, base);
  }
  return toJpeg(element, { ...base, quality: 0.92 });
}

export function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

export async function exportMock(
  element: HTMLElement | null,
  platform: string,
  format: "png" | "jpeg",
  suffix = "",
  options: CaptureOptions = {}
) {
  if (!element) return;
  const ext = format === "png" ? "png" : "jpg";
  const timestamp = Date.now();
  const dataUrl = await captureElement(element, format, options);
  downloadDataUrl(
    dataUrl,
    `fake-social-${platform}${suffix}-${timestamp}.${ext}`
  );
}

export async function exportTransparentPng(
  element: HTMLElement | null,
  platform: string,
  suffix = "-messaggi"
) {
  if (!element) return;
  const timestamp = Date.now();
  const dataUrl = await captureElement(element, "png", { transparent: true });
  downloadDataUrl(
    dataUrl,
    `fake-social-${platform}${suffix}-${timestamp}.png`
  );
}
