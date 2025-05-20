/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetMessageQuery } from "@/redux/apis/MessageApi";

const MessageCard = () => {
  const { data, isLoading } = useGetMessageQuery(undefined, {
    pollingInterval: 3000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  return (
    <div>
      {isLoading ? (
        <h1>Loading ...</h1>
      ) : (
        <>
          {data.data.map((m: any, idx: number) => {
            return (
              <>
                <div
                  key={idx}
                  className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 w-full max-w-md"
                >
                  {/* Header Section */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-full text-lg font-bold">
                      {m.name}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {m.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{m.email}</p>
                    </div>
                  </div>

                  {/* Message Content */}
                  <p className="text-gray-300 text-sm bg-gray-900 p-4 rounded-lg">
                    {m.message}
                  </p>
                </div>
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

export default MessageCard;
