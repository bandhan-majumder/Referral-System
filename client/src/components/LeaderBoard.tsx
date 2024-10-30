import axios from "axios";
import { useEffect, useState } from "react";
import DatabaseFailure from "./DatabaseFailure";

interface Referrers {
  referralCode: string;
  referralCount: number;
  username: string;
}

function LeaderBoard() {
  const [topUsers, setTopUsers] = useState<Referrers[]>([]);
  const [dbFailureMsg, setDbFailureMsg]=useState("")

  useEffect(() => {
    fetchDetails();
  }, []);

  async function fetchDetails() {
    try {const response = await axios.get("/api/users/leaderboard");
    setTopUsers(response.data.topReferrers);}
    catch(error){
      setDbFailureMsg("Failed to connect with database")
      console.log(error)
    }
  }
  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-center text-4xl font-bold underline underline-offset-4">
        Leaderboard
      </h1>
      {!dbFailureMsg && <h1 className="text-3xl text-center py-10">Congrats! for winning <span className="font-semibold cursor-pointer">exclusive swags</span> 🎁🎉</h1>}
      {topUsers.length == 0 && (
        <div className="text-center font-bold text-4xl">{dbFailureMsg ? <DatabaseFailure /> : "loading.."}</div>
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
        <div className="text-center font-bold text-4xl">"loading..."</div>
      )}
    </div>
  );
}

export default LeaderBoard;
