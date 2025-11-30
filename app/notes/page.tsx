import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesProps {
  params: {
    page: number;
    query: string;
  };
}

export default async function Notes({ params }: NotesProps) {
  const page = params.page;
  const query = params.query ?? "";

  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}
