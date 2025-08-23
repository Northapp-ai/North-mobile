export type TabType = "WHY" | "WHEN" | "WHO";

export type Person = {
  id: string;
  name: string;
  uri: string;
};

export interface ActionModalProps {
  visible: boolean;
  onClose: () => void;
}

export interface TabContentProps {
  activeTab: TabType;
  selectedDate: Date;
  selectedPersonId: string | null;
  people: Person[];
  goalImageUri?: string;
  getDateDisplayText: () => string;
  onPersonSelect: (personId: string) => void;
}

export interface ActionModalState {
  inputText: string;
  activeTab: TabType;
  selectedDate: Date;
  selectedPersonId: string | null;
}
