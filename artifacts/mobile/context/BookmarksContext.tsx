import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

const BOOKMARKS_KEY = "@bharatlaw_bookmarks";
const READING_LIST_KEY = "@bharatlaw_reading_list";

interface BookmarkItem {
  id: string;
  type: "judgment" | "act";
  title: string;
  citation?: string;
  court?: string;
  date?: string;
  savedAt: string;
}

interface BookmarksContextType {
  bookmarks: BookmarkItem[];
  readingList: BookmarkItem[];
  addBookmark: (item: BookmarkItem) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  addToReadingList: (item: BookmarkItem) => void;
  removeFromReadingList: (id: string) => void;
  isInReadingList: (id: string) => boolean;
}

const BookmarksContext = createContext<BookmarksContextType | null>(null);

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [readingList, setReadingList] = useState<BookmarkItem[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(BOOKMARKS_KEY).then((val) => {
      if (val) setBookmarks(JSON.parse(val));
    });
    AsyncStorage.getItem(READING_LIST_KEY).then((val) => {
      if (val) setReadingList(JSON.parse(val));
    });
  }, []);

  const addBookmark = useCallback((item: BookmarkItem) => {
    setBookmarks((prev) => {
      if (prev.find((b) => b.id === item.id)) return prev;
      const next = [{ ...item, savedAt: new Date().toISOString() }, ...prev];
      AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.filter((b) => b.id !== id);
      AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.some((b) => b.id === id),
    [bookmarks]
  );

  const addToReadingList = useCallback((item: BookmarkItem) => {
    setReadingList((prev) => {
      if (prev.find((b) => b.id === item.id)) return prev;
      const next = [{ ...item, savedAt: new Date().toISOString() }, ...prev];
      AsyncStorage.setItem(READING_LIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeFromReadingList = useCallback((id: string) => {
    setReadingList((prev) => {
      const next = prev.filter((b) => b.id !== id);
      AsyncStorage.setItem(READING_LIST_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isInReadingList = useCallback(
    (id: string) => readingList.some((b) => b.id === id),
    [readingList]
  );

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        readingList,
        addBookmark,
        removeBookmark,
        isBookmarked,
        addToReadingList,
        removeFromReadingList,
        isInReadingList,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const ctx = useContext(BookmarksContext);
  if (!ctx) throw new Error("useBookmarks must be used within BookmarksProvider");
  return ctx;
}
