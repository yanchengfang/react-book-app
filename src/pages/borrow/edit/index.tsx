import { getBorrowDetail } from "../../../api";
import { BorrowForm } from "../../../components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const BorrowBook: React.FC<any> = () => {
  const router = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    getBorrowDetail(router.id as string).then((res) => {
      setData(res.data);
    });
  }, [router.id]);

  return <BorrowForm title="借阅编辑" editData={data} />;
};

export default BorrowBook;
