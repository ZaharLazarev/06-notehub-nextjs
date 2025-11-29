import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ page: number; query: string }>;
}

export default async function Notes({ params }: NotesProps) {
  const { page, query } = await params;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
