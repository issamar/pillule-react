import React from "react";

const ConfirmationBox = ({ open, onClose, onDelete, todel }) => {
    if (!open) return null;
    return (
        <>
            <div className="overlay" />
            <form className="confirmation-form">
                <h3>Vous etes sure de supprimé cette élément ?</h3>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        onDelete(todel);
                    }}
                >
                    Oui
                </button>
                <button onClick={onClose}>NON</button>
            </form>
        </>
    );
};

export default ConfirmationBox;
