"use client";

import { formList } from "@/actions/employer/actions";
import { useState, useEffect } from "react";
import useSWR from "swr";
import Pagination from "../../lib/Pagination";
import { formInterface } from "@/types/employer";

const FormList = () => {
  const { data, error, isLoading } = useSWR("formList", formList);
  const PageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentTableData, setCurrentTableData] = useState<formInterface[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (data) {
      const filtered = data.filter((item: formInterface) =>
        [item.company, item.jobType, item.location, item.role]
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      setCurrentTableData(filtered.slice(firstPageIndex, lastPageIndex));
    }
  }, [data, currentPage, search]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load forms</div>;

  return (
    <div>
      <div className="w-full flex justify-center">
        <div>
          <input
            type="text"
            placeholder="Search.."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="bg-transparent placeholder:text-slate-400 text-sm border border-slate-500 rounded-md mt-2 mb-2 px-2 py-1 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
          />
          {search && (
            <span className="ml-2 cursor-pointer" onClick={() => setSearch("")}>
              X
            </span>
          )}
        </div>
      </div>

      {currentTableData.length > 0 ? (
        <div className="overflow-x-auto border-1 border-gray-400 rounded-lg m-2">
          <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-slate-700 text-left">
              <tr>
                <th className="px-6 py-3 text-sm font-semibold">
                  COMPANY NAME
                </th>
                <th className="px-6 py-3 text-sm font-semibold">JOB TYPE</th>
                <th className="px-6 py-3 text-sm font-semibold">LOCATION</th>
                <th className="px-6 py-3 text-sm font-semibold">ROLE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentTableData?.map((item: formInterface, index: number) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {item.company}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {item.jobType}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {item.jobType === "Remote" ? "N/A" : item.location}
                  </td>
                  <td className="px-6 py-2 text-sm text-gray-700">
                    {item.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h3 className="flex justify-center mt-12  text-gray-700 text-2xl">
            No search result found !
          </h3>
        </div>
      )}
      {data && (
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={
            data.filter((item: formInterface) =>
              [item.company, item.jobType, item.location, item.role]
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
            ).length
          }
          pageSize={PageSize}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default FormList;
