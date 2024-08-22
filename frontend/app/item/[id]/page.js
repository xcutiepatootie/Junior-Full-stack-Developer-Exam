import ItemForm from "@/components/Forms/ItemForm";
import styles from "../../page.module.css";

export default function page({ params }) {
  console.log(params);
  /*  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://localhost:5000/api/items/${params.id}`;
        const response = await fetch(url, { method: "GET" });
        const data = await response.json();
        console.log(data);
        setItem(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.id]); */
  return (
    <div className={styles.main}>
      <h1 style={{ marginBottom: "1rem" }}>Update Item</h1>
      <div className={"flex-item"}>
        <ItemForm itemId={params.id} />
      </div>
    </div>
  );
}
