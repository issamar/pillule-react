import { useEffect, useState } from "react";
import "./App.css";
import AddingForm from "./components/AddingForm";
import Table from "./components/Table";
import axios from "axios";
import Stats from "./components/Stats";

//const baseURL = "https://pillule-api-production.up.railway.app/api/";
const baseURL = "http://127.0.0.1:8000/api/";
function App() {
    const [sales, setSales] = useState();
    const [search, setSearch] = useState("");

    useEffect(() => {
        async function getData() {
            const response = await axios.get(`${baseURL}sales/`);
            setSales(response.data);
        }
        getData();
    }, []);

    const [saleToEdit, setSaleToEdit] = useState(null);

    function addSale(newSale) {
        setSales((prev) => {
            return [...prev, newSale];
        });

        setSearch("");
    }

    function deleteSale(saleToDel) {
        axios.delete(`${baseURL}del/${saleToDel}`).then((response) => {
            if (response.status === 204) {
                setSales((prev) => {
                    return prev.filter((sale) => sale.id !== saleToDel);
                });
            }
        });
    }

    function onEdit(saleToEdit) {
        axios.get(`${baseURL}sales/${saleToEdit}`).then((response) => {
            if (response.status === 200) {
                setSaleToEdit(response.data);
            }
        });
    }
    function editState(saleEdited) {
        const cloneSales = sales.map((obj) => {
            if (obj.id === saleEdited.id) {
                return (obj = saleEdited);
            }
            return obj;
        });

        setSales(cloneSales);
    }

    return (
        <div className="App">
            <h1> Gestions des Pillules</h1>
            <AddingForm
                onSend={addSale}
                saleToEdit={saleToEdit}
                editState={editState}
                baseURL={baseURL}
                endEdition={setSaleToEdit}
                onSearch={setSearch}
            />
            <Stats sales={sales} />
            <Table
                sales={sales}
                onDel={deleteSale}
                onEdit={onEdit}
                search={search}
            />
        </div>
    );
}

export default App;
