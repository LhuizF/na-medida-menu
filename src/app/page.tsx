"use client";
import { InputSearch } from "@/components/InputSearch";
import { ListOptions } from "@/components/ListOptions";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

const findOptions = async (search?: string, page?: number) => {
  const queryParams = new URLSearchParams();
  if (search) {
    queryParams.append("search", search);
  }

  if (page) {
    queryParams.append("page", page.toString());
  }

  const response = await fetch(`/api/options?${queryParams}`);

  const options = await response.json();

  return options;
};

export default function Home() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, refetch, isRefetching } =
    useQuery<IFindOptionsResponse>("options", () => findOptions(search), {
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <>
      <main className="min-h-screen bg-gray-300 px-5 py-3">
        <InputSearch value={search} onChange={setSearch} />
        <div className="pt-12">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error</p>}
          {isRefetching && <p>Refetching...</p>}
          {data?.options && data.options.length > 0 && (
            <ListOptions options={data.options} />
          )}
        </div>
      </main>
    </>
  );
}
