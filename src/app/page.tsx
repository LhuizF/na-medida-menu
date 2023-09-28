"use client";
import { InputSearch } from "@/components/InputSearch";
import { ListOptions } from "@/components/ListOptions";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { useSearchParams, useRouter } from "next/navigation";

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
      <div className="flex items-center justify-center w-screen h-screen bg-gray-300">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-gray-300 py-3 relative">
        <InputSearch value={search} onChange={handleSearch} />
        {isRefetching && (
          <div className="fixed top-16 z-10 w-full flex justify-center">
            <CircularProgress size={22} />
          </div>
        )}
        <div className="pt-14 px-5">
          {isError && <p>Error</p>}
          {allOptions && allOptions.length > 0 && (
            <ListOptions options={allOptions} />
          )}
        </div>
        <div id="end" />
      </main>
    </>
  );
}
