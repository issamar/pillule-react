import { useEffect, useState } from "react";
import "./App.css";
import AddingForm from "./components/AddingForm";
import Table from "./components/Table";
import axios from "axios";
import Stats from "./components/Stats";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationBox from "./components/ConfirmationBox";

const baseURL = "https://pillule-api-production.up.railway.app/api/";
//const baseURL = "http://127.0.0.1:8000/api/";
function App() {
    const [sales, setSales] = useState();
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [toDel, setToDel] = useState(null);
    useEffect(() => {
        async function getData() {
            await toast
                .promise(axios.get(`${baseURL}sales/`), {
                    pending: "Chargement des données Attendez SVP",
                    success: "Chargement des données REUSSI",
                    error: "Chargement des données ECHOUE",
                })
                .then((response) => {
                    setSales(response.data);
                });
        }
        getData();
    }, []);

    const [saleToEdit, setSaleToEdit] = useState(null);

    const notify = (message) => {
        console.log(message);
        if (message.status === "succes") {
            toast.success("Operation Réussie ", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }

        if (message.status === "fail") {
            toast.error("Opération Echouée " + message.message, {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };

    function addSale(newSale) {
        setSales((prev) => {
            return [...prev, newSale];
        });

        setSearch("");
        notify({ status: "succes" });
    }

    function onDelete(del) {
        axios.delete(`${baseURL}del/${del}`).then((response) => {
            if (response.status === 204) {
                setSales((prev) => {
                    return prev.filter((sale) => sale.id !== del);
                });
                setIsOpen(false);
            }
            notify({ status: "succes" });
        });
    }
    function deleteSale(saleToDel) {
        setIsOpen(true);
        setToDel(saleToDel);
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
        notify({ status: "succes" });
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
                notify={notify}
            />
            <Stats sales={sales} />
            <Table
                sales={sales}
                onDel={deleteSale}
                onEdit={onEdit}
                search={search}
            />
            <ToastContainer />
            <ConfirmationBox
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onDelete={onDelete}
                todel={toDel}
            />
        </div>
    );
}

export default App;
