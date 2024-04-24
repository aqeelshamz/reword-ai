import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (!localStorage.getItem("token")) {
                redirect(`/login`);
            }
            else{
                redirect(`/admin/dashboard`);
            }
          }
    },[]);
}       