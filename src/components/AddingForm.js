import React, { useEffect, useState } from "react";
import axios from "axios";

const AddingForm = ({
    onSend,
    saleToEdit,
    editState,
    baseURL,
    endEdition,
    onSearch,
}) => {
    const [pils, setPils] = useState(() => {
        axios.get(`${baseURL}pils/`).then((response) => {
            setPils(response.data);
        });
    });
    const [newSale, setNewSale] = useState({
        patient_name: "",
        pils_name: "",
        sale_date: "",
    });

    useEffect(() => {
        saleToEdit && setNewSale(saleToEdit);
    }, [saleToEdit]);
    function handleChange(e) {
        const { name, value } = e.target;
        onSearch(e.target.value);
        setNewSale((prev) => {
            return { ...prev, [name]: value };
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        axios.post(`${baseURL}add-sale/`, newSale).then((response) => {
            if (response.status === 201) {
                onSend(response.data);
            }
            setNewSale({ patient_name: "", pils_name: "", sale_date: "" });
        });
    }

    function onEdition(e) {
        e.preventDefault();

        axios
            .put(`${baseURL}update/${saleToEdit.id}`, newSale)
            .then((response) => {
                if (response.status === 200) {
                    editState(response.data);
                }
                setNewSale({ patient_name: "", pils_name: "", sale_date: "" });

                endEdition(null);
            });
    }

    return (
        <div className="form-container">
            <form>
                <input
                    type="text"
                    className=" inp"
                    name="patient_name"
                    onChange={handleChange}
                    value={newSale?.patient_name}
                />
                <input
                    type="text"
                    className=" inp"
                    name="pils_name"
                    list="pils"
                    onChange={handleChange}
                    value={newSale?.pils_name}
                />
                <datalist id="pils">
                    {pils?.map((pil) => {
                        return <option value={pil.name} key={pil.id} />;
                    })}
                </datalist>
                <input
                    type="date"
                    className=" inp"
                    name="sale_date"
                    onChange={handleChange}
                    value={newSale?.sale_date}
                />
                {saleToEdit ? (
                    <button className="btn btn-warning " onClick={onEdition}>
                        Modifier
                    </button>
                ) : (
                    <button className="btn btn-primary " onClick={onSubmit}>
                        Ajouter
                    </button>
                )}
            </form>
        </div>
    );
};

export default AddingForm;
