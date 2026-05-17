"use client";

import { useState } from "react";
import type { BrandId } from "@/components/brand/NeonBrandLogo";
import { PushNotification } from "@/components/mockups/PushNotification";
import { EditorLayout } from "@/components/shared/EditorLayout";
import { ImageUploadField } from "@/components/shared/ImageUploadField";
import { defaultPushNotification } from "@/lib/defaults";
import { getNotificationConfig } from "@/lib/notification-config";
import type { PushNotificationState } from "@/lib/types";

interface NotificationEditorClientProps {
  brand: BrandId;
  title: string;
  backHref: string;
}

export function NotificationEditorClient({
  brand,
  title,
  backHref,
}: NotificationEditorClientProps) {
  const config = getNotificationConfig(brand);
  const [state, setState] = useState<PushNotificationState>(() =>
    defaultPushNotification(brand)
  );

  return (
    <EditorLayout
      title={title}
      platform={`${brand}-notification`}
      backHref={backHref}
      onReset={() => setState(defaultPushNotification(brand))}
      editor={
        <div className="editor-fields">
          <input
            value={state.contactName}
            onChange={(e) => setState({ ...state, contactName: e.target.value })}
            className="editor-input"
            placeholder="Nome contatto"
          />
          <ImageUploadField
            label="Immagine profilo"
            value={state.contactAvatar}
            onChange={(contactAvatar) => setState({ ...state, contactAvatar })}
          />
          <textarea
            value={state.message}
            onChange={(e) => setState({ ...state, message: e.target.value })}
            className="editor-input min-h-[80px]"
            placeholder="Testo notifica"
          />
          <input
            value={state.time}
            onChange={(e) => setState({ ...state, time: e.target.value })}
            className="editor-input"
            placeholder="Orario (es. ora, 2 min fa)"
          />
          {config.showGroup && (
            <>
              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  checked={state.isGroup ?? false}
                  onChange={(e) =>
                    setState({ ...state, isGroup: e.target.checked })
                  }
                  className="rounded border-violet-500/30"
                />
                Notifica di gruppo
              </label>
              {state.isGroup && (
                <input
                  value={state.groupName ?? ""}
                  onChange={(e) =>
                    setState({ ...state, groupName: e.target.value })
                  }
                  className="editor-input"
                  placeholder="Nome gruppo"
                />
              )}
            </>
          )}
        </div>
      }
      preview={<PushNotification brand={brand} state={state} />}
    />
  );
}
