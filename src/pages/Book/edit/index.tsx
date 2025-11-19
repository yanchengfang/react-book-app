import { getBookDetail } from "../../../api";
import type { BookDetailResType, BookType } from "../../../types"
import { BookForm } from "../../../components/BookForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function BookEdit() {
  const [data, setData] = useState<BookType>();
  const routerParams = useParams();

  useEffect(() => {
    (async () => {
      const res = await getBookDetail(routerParams.id);
      const { data } = res as BookDetailResType
      setData(data);
    })();
  }, [routerParams]);

  return <BookForm title="图书编辑" editData={data} />;
}