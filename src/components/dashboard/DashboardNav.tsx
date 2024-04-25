"use server";

import LogOutButton from "../auth/LogOutButton";

export default async function DashboardNav() {
  return (
    <div className="flex items-end justify-between">
      <div className="text-2xl">Dashboard</div>
      <LogOutButton></LogOutButton>
    </div>
  );
}
