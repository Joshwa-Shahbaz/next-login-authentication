import useAuth from "@/utils/hooks/useAuth";
import React, { useEffect, useState } from "react";
import { firestore } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const Dashboard = () => {
  const { user } = useAuth({ redirectOn: "logout", redirectTo: "/login" });
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(firestore, "users", user.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserInfo(userData);
        console.log("Document data:", userData);
      } else {
        console.log("No such document!");
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  return user ? (
    <section className="h-[80vh]]">
      <div className="flex flex-col justify-center relative top-[50px] text-orange ">
        <h1 className="flex justify-center text-[25px] font-semibold">
          welcome{" "}
          {userInfo && <span className="mx-[5px]">{userInfo.fullName}</span>} to
          our offical page
        </h1>
      </div>
    </section>
  ) : null;
};

export default Dashboard;
