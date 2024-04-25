"use server";

import { luciaValidateRequest } from "@/lib/common/LuciaValidate";
import { PagePath } from "@/lib/constants/Path";
import { redirect } from "next/navigation";
import * as React from "react";

export default async function DashboardPage() {
  const { user } = await luciaValidateRequest();
  if (!user) redirect(PagePath.LOGIN);

  return <div className="flex flex-col gap-4">The Dashboard Page</div>;
}
