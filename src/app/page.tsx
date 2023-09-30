"use client";

import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { Header } from "@/components/Header";
import { ListOptions } from "@/components/ListOptions";
import { Error as ErrorComponent } from "@/components/Error";

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
  const [page, setPage] = useState(1);
  const [allOptions, setAllOptions] = useState<IOptionDB[]>([]);

  const { data, isLoading, isError, refetch, isRefetching } =
    useQuery<IFindOptionsResponse>("options", () => findOptions(search, page), {
      refetchOnWindowFocus: false,
    });

  useEffect(() => {
    refetch();
  }, [search, page]);

  useEffect(() => {
    if (data?.options) {
      setAllOptions((prev) => [...prev, ...data.options]);
    }
  }, [data]);

  useEffect(() => {
    if (isLoading) return;
    const intersectionObserver = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPage((prev) => prev + 1);
      }
    });

    intersectionObserver.observe(document.getElementById("end")!);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [isLoading]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setAllOptions([]);
    setPage(1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-secondary">
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    return <ErrorComponent />;
  }

  return (
    <>
      <main className="min-h-screen bg-secondary">
        <Header value={search} onChange={handleSearch} />

        {isRefetching && (
          <div className="top-16 z-10 w-full flex justify-center fixed">
            <CircularProgress size={22} />
          </div>
        )}

        <div className="p-5">
          {isError && <p>Error</p>}
          {allOptions && allOptions.length > 0 && (
            <ListOptions
              options={allOptions}
              totalOptions={data?.totalOptions!}
            />
          )}
        </div>

        <div id="end" />
      </main>
    </>
  );
}
