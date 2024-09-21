interface Metadata {
    elementId: string;
    elementTag: string;
    textContent: string;
    elementClasses: string;
  }
  
  interface EventObject {
    id: number;
    eventType: string;
    metadata: Metadata;
    visitorId: string;
    createdAt: string;
  }

  export type { Metadata, EventObject };