import React from "react";
import Row from "./Row";

const Table = ({ sales, onDel, onEdit, search }) => {
    return (
        <div className="stat-div">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Patient</th>
                        <th scope="col">Pillule</th>
                        <th scope="col">Date de Vente</th>
                        <th scope="col">Compteur</th>
                    </tr>
                </thead>
                <tbody>
                    {sales
                        ?.filter((sale) => {
                            return search.toLowerCase() === ""
                                ? sale
                                : sale.patient_name
                                      .toLowerCase()
                                      .includes(search);
                        })
                        .map((sale) => {
                            return (
                                <Row
                                    sale={sale}
                                    key={sale.id}
                                    onDel={() => onDel(sale.id)}
                                    onEdit={() => onEdit(sale.id)}
                                />
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
