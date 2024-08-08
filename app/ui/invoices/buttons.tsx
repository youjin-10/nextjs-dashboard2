"use client";

import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { createInvoice } from "@/app/lib/actions";

export function CreateInvoice() {
  const [showDiv, setshowDiv] = useState(false);

  console.log("CreateInvoice rendered");
  return (
    <>
      {/* <Link
        href="/dashboard/invoices/create"
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
        <span className="hidden md:block">Create Invoice</span>{" "}
        <PlusIcon className="h-5 md:ml-4" />
      </Link> */}
      <button
        onClick={() => {
          setshowDiv(true);
        }}>
        create invoice
      </button>
      {showDiv && (
        <div className="bg-yellow-100 p-10">
          <div>i am div</div> <div>hhhhh</div>
          <button
            onClick={async () => {
              // createInvoice()
              const formData = new FormData();
              formData.append(
                "customerId",
                "cc27c14a-0acf-4f4a-a6c9-d45682c144b9"
              );
              formData.append("amount", "87000");
              formData.append("status", "paid");

              setshowDiv(false);

              await createInvoice(formData);
            }}>
            let's create!!!
          </button>
        </div>
      )}
    </>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href="/dashboard/invoices"
      className="rounded-md border p-2 hover:bg-gray-100">
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  return (
    <>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </>
  );
}
