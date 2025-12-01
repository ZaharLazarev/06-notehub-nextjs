import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface NotesProps {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}

export default async function Notes({ searchParams }: NotesProps) {
  const params = await searchParams;
  const page = Number(params.page ?? "1");
  const query = params.query ?? "";
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["notes", page, query],
    queryFn: () => fetchNotes(page, query),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient paramPage={page} paramQuery={query} />
    </HydrationBoundary>
  );
}
