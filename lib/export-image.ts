import { toJpeg, toPng } from "html-to-image";

export async function captureElement(
  element: HTMLElement,
  format: "png" | "jpeg"
): Promise<string> {
  const options = {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: format === "jpeg" ? "#ffffff" : undefined,
  };

  if (format === "png") {
    return toPng(element, options);
  }
  return toJpeg(element, { ...options, quality: 0.92 });
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
  format: "png" | "jpeg"
) {
  if (!element) return;
  const ext = format === "png" ? "png" : "jpg";
  const timestamp = Date.now();
  const dataUrl = await captureElement(element, format);
  downloadDataUrl(dataUrl, `fake-social-${platform}-${timestamp}.${ext}`);
}
