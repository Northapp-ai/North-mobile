import { User } from "@/app/auth/models/types";

export type TabType = "WHY" | "WHEN" | "WHO";

export interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface WhoTabContentProps {
  people: User[];
  selectedPersonEmail: string | null;
  onPersonSelect: (personEmail: string) => void;
}

export interface ActionModalState {
  inputText: string;
  activeTab: TabType;
  selectedDate: Date;
  selectedPersonEmail: string | null;
}
