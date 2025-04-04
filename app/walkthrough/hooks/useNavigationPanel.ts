import type {
  default as PagerView,
  PageScrollStateChangedNativeEvent,
  PagerViewOnPageScrollEventData,
  PagerViewOnPageSelectedEventData,
} from "react-native-pager-view";
import { Animated } from "react-native";
import { useCallback, useMemo, useRef, useState } from "react";
import { CreatePage, createPage } from "../helpers/navigation.helper";

export type UseNavigationPanelProps = ReturnType<typeof useNavigationPanel>;

export interface EventLog {
  event: "scroll" | "select" | "statusChanged";
  text: string;
  timestamp: Date;
}

const getBasePages = (pages: number) =>
  new Array(pages).fill("").map((_v, index) => createPage(index));

export function useNavigationPanel(
  pagesAmount: number = 10,
  onPageSelectedCallback: (position: number) => void = () => {}
) {
  const ref = useRef<PagerView>(null);
  const [pages, setPages] = useState<CreatePage[]>(
    useMemo(() => getBasePages(pagesAmount), [pagesAmount])
  );
  const [activePage, setActivePage] = useState(0);

  const setPage = useCallback((page: number) => {
    ref.current?.setPage(page);
  }, []);

  return {
    ref,
    activePage,
    pages,
    setPage,
  };
}
