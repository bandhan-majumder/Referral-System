import axios from "axios";
import { useEffect, useState } from "react";

interface Referrers {
  referralCode: string;
  referralCount: number;
  username: string;
}

function LeaderBoard() {
  const [topUsers, setTopUsers] = useState<Referrers[]>([]);

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    const response = await axios.get("/api/users/leaderboard");
    setTopUsers(response.data.topReferrers);
  }
  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-center text-4xl font-bold underline underline-offset-4">
        Leaderboard
      </h1>
      <h1 className="text-3xl text-center py-10">Congrats! for winning <span className="font-semibold cursor-pointer">exclusive swags</span> 🎁🎉</h1>
      {topUsers.length == 0 && (
        <div className="text-center font-bold text-4xl">Loading...</div>
      )}
      {topUsers ? (
        <div className="flex flex-col items-center justify-center gap-5">
          {topUsers.map((_, index) => (
            <div className="w-[30vh]" id={index.toString()}>
              <div className="flex flex-row gap-3  text-xl">
                <h1>Username:</h1>
                <div className="text-xl font-extrabold text-green-900">
                  {topUsers[index].username}
                </div>
              </div>
              <h1 className="text-xl">
                ReferralCount: <span className="text-green-950">{topUsers[index].referralCount}</span>
              </h1>
              <h1 className="text-xl">
                ReferralCode:{" "}
                <span className="font-semibold">
                  {topUsers[index].referralCode}
                </span>
              </h1>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center font-bold text-4xl">Loading...</div>
      )}
    </div>
  );
}

export default LeaderBoard;
