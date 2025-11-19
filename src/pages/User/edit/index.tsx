import { getUserDetail } from "../../../api";
import { UserForm } from "../../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UserAdd: React.FC<null> = () => {
  const router = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const res = await getUserDetail(router.id as string);
      setData(res.data);
    })();
  }, [router.id]);

  return <UserForm title="用户编辑" editData={data} />;
};

export default UserAdd;
