import { ReactNode } from "react";
interface CalendarEvent {
  start: Date;
  end: Date;
  installationId: string,
  id: string;
  location?: string;
  type: "Blocked" | "Sequence"
}

interface CalendarProps {
  events: CalendarEvent[];
  setEvents: React.Dispatch<React.SetStateAction<CalendarEvent[]>>;
  deleteEvent: (installationId: string, id: string) => void;
  createEvent: (newEvent: CalendarEvent) => Promise<void>;
  editEvent: (updatedEvent: CalendarEvent) => void;
  location: string;
}
interface CalendarControlProps {
  addEvent: (event: CalendarEvent) => void;
}
interface ModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  save: (event: CalendarEvent) => void;
  event?: CalendarEvent | null;
  edit: (updatedEvent: CalendarEvent) => void;
  deleteEvent: (id: string) => void;
  calMode: CalendarMode["state"];
  selectedSlot?: { start: Date; end: Date } | null;
  location?: string;
}

interface CalendarMode {
  state: "view" | "create" | "edit";
}

interface ProfileCardProps {
  sellerName: string;
  storeName: string;
  monthlyUsage: string;
  onSignOut: any;
  lastMonth: string;
}
interface DateComponentProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  readonly?: boolean;
}

interface Installation {
  id: string;
  displayName: string;
  topic: string;
  installationId?: string;
}

interface EventResponse {
  begin: string;
  end: string;
  id: string;
  installationId: string;
  type: string;
}
interface DropdownMenuProps {
  toggleContent: React.ReactNode;
  children: React.ReactNode; 
  isInitiallyOpen?: boolean;
  onClick?: () => void;
  classSuffix?: 'language' | 'hamburger'
}

interface HoverModalProps {
  trigger: ReactNode;               // The element to hover on
  modalContent: ReactNode;  // The modal element to show on hover
}

export {
  CalendarEvent,
  CalendarProps,
  CalendarControlProps,
  ModalProps,
  CalendarMode,
  ProfileCardProps,
  DateComponentProps,
  Installation,
  EventResponse,
  DropdownMenuProps,
  HoverModalProps
};
