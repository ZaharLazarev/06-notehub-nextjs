import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesProps {
  searchParams: {
    page: number;
    query: string;
  };
}

export default async function Notes({ searchParams }: NotesProps) {
  const params = await searchParams;
  const page = params.page ?? 1;
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
