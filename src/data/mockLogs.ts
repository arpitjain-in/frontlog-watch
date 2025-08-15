import { LogEntry } from "@/types/logs";

export const mockLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2025-08-15T10:30:15Z",
    level: "error",
    message: "Uncaught TypeError: Cannot read property 'foo' of undefined",
    stack: "TypeError: Cannot read property 'foo' of undefined\n    at handleClick (main.js:45:12)\n    at onClick (Button.tsx:23:8)",
    url: "https://myapp.com/dashboard",
    userId: "user_12345",
    sessionId: "sess_abcde67890",
    browser: "Chrome 119.0.0.0",
    os: "macOS 14.1",
    appVersion: "v2.3.1",
    type: "error",
    customData: {
      component: "UserDashboard",
      action: "button_click"
    }
  },
  {
    id: "2",
    timestamp: "2025-08-15T10:28:43Z",
    level: "error",
    message: "Network request failed: 500 Internal Server Error",
    url: "https://myapp.com/api/users",
    userId: "user_67890",
    sessionId: "sess_fghij12345",
    browser: "Firefox 118.0.2",
    os: "Windows 11",
    appVersion: "v2.3.1",
    type: "network",
    customData: {
      endpoint: "/api/users",
      method: "GET",
      status: 500,
      responseTime: 2340
    }
  },
  {
    id: "3",
    timestamp: "2025-08-15T10:25:22Z",
    level: "warning",
    message: "Slow page load detected: LCP 4.2s",
    url: "https://myapp.com/products",
    sessionId: "sess_klmno67890",
    browser: "Safari 17.1",
    os: "iOS 17.1",
    appVersion: "v2.3.1",
    type: "performance",
    customData: {
      metric: "LCP",
      value: 4200,
      threshold: 2500
    }
  },
  {
    id: "4",
    timestamp: "2025-08-15T10:22:10Z",
    level: "error",
    message: "Payment processing failed",
    url: "https://myapp.com/checkout",
    userId: "user_11111",
    sessionId: "sess_pqrst98765",
    browser: "Chrome 119.0.0.0",
    os: "Windows 10",
    appVersion: "v2.3.1",
    type: "custom",
    customData: {
      feature: "checkout",
      cartValue: 149.99,
      paymentMethod: "credit_card",
      errorCode: "PAYMENT_DECLINED"
    }
  },
  {
    id: "5",
    timestamp: "2025-08-15T10:20:05Z",
    level: "info",
    message: "User logged in successfully",
    url: "https://myapp.com/login",
    userId: "user_22222",
    sessionId: "sess_uvwxy54321",
    browser: "Edge 118.0.2088.76",
    os: "Windows 11",
    appVersion: "v2.3.1",
    type: "interaction",
    customData: {
      loginMethod: "email",
      userAgent: "Mozilla/5.0..."
    }
  },
  {
    id: "6",
    timestamp: "2025-08-15T10:18:33Z",
    level: "error",
    message: "React Error Boundary: ChunkLoadError",
    stack: "ChunkLoadError: Loading chunk 2 failed.\n    at Object.webpack_require [as __webpack_require__] (runtime.js:1:1)",
    url: "https://myapp.com/settings",
    userId: "user_33333",
    sessionId: "sess_abcde11111",
    browser: "Chrome 118.0.5993.88",
    os: "macOS 13.6",
    appVersion: "v2.3.0",
    type: "error",
    customData: {
      chunk: "settings-page",
      component: "SettingsForm"
    }
  }
];