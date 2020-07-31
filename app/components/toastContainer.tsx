import { useState } from "react";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import Immutable from "immutable";

enum ToastType {
  Success,
  Error,
  Info,
  Warning,
}

type Listener = {
  addToast: (toast: ToastInfo) => void;
  removeToast: (toasts: ToastInfo) => void;
};

type ToastInfo = {
  type: ToastType;
  id: number;
  title?: string;
  message: string;
};

class Context {
  private nextId = 0;
  private listener?: Listener;

  setListener(listener: Listener) {
    this.listener = listener;
  }

  clearListener() {
    this.listener = undefined;
  }

  info = (message: string, title?: string) =>
    this.toast(ToastType.Info, message, title);
  warning = (message: string, title?: string) =>
    this.toast(ToastType.Warning, message, title);
  success = (message: string, title?: string) =>
    this.toast(ToastType.Success, message, title);
  error = (message: string, title?: string) =>
    this.toast(ToastType.Error, message, title);

  private toast(type: ToastType, message: string, title?: string) {
    const listener = this.listener;
    if (!listener) return;

    const toast = { id: this.nextId++, type, message, title };
    listener.addToast(toast);
    setTimeout(() => listener.removeToast(toast), 1500);
  }
}

export const ToastContext = React.createContext(new Context());

export default function ToastContainer() {
  const context = useContext(ToastContext);
  const [toasts, setToasts] = useState(Immutable.Set<ToastInfo>());

  useEffect(() => {
    context.setListener({
      addToast: (toast) => setToasts(toasts.add(toast)),
      removeToast: (toast) => setToasts(toasts.remove(toast)),
    });
    return () => {
      context.clearListener();
    };
  }, [setToasts]);

  return (
    <>
      <style jsx={true}>{`
        .container {
          position: fixed;
          width: 100%;
          left: 50%;
          top: 25px;
          transform: translate(-50%, 0%);
          display: flex;
          flex-direction: column;
          z-index: 1;
          align-items: center;
          pointer-events: none;
        }

        .toast {
          width: 150px;
          display: flex;
          flex-direction: column;
          margin-top: 10px;
          color: #ffffff;
          background-color: #b45559;
          border-radius: 5px;
          text-align: center;
          box-shadow: 2px 1px 3px #b45559;
        }

        .toast_title {
          font-weight: bold;
          padding: 10px;
          font-size: 12pt;
        }

        .toast_message {
          padding: 10px;
          font-size: 10pt;
        }
      `}</style>
      <div className="container">
        {Array.from(toasts).map((toast) => {
          return (
            <div className="toast" key={`toast_${toast.id}`}>
              {toast.title ? (
                <div className="toast_title">{toast.title}</div>
              ) : null}
              <div className="toast_message">{toast.message}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
